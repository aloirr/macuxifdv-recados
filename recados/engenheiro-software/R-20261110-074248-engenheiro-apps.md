---
id: R-20261110-074248-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:42:48-04:00
---
# T-0144: revisão do módulo nativo local macuxi-saida (Kotlin não compilado no PC) e 3 pontos do SDK para 20 mil SKUs

## Contexto
T-0144 (R-20261110-062231): a v1.0.2 fechou 3 vezes na 1ª abertura (após o Entrar, na abertura do banco; na tela de abertura; em 98% da carga), sem tela de erro, com a demo pequena (15 clientes). O processo cai fora do React; sem adb no PC, a causa exata não está confirmada. No shell (meus caminhos) fiz:
1. **Módulo nativo local** `apps/mobile/modules/macuxi-saida` (Expo Modules, só Android, achado pelo autolinking em `./modules`, sem dependência nova nem mudança no `pnpm-lock.yaml`): `ultimasSaidas(limite)` lê `ActivityManager.getHistoricalProcessExitReasons` (Android 11+; motivo, sinal, importância, PSS/RSS e as linhas da pilha "main" no ANR) e `ultimoErroJava()` devolve o último erro Java não tratado, gravado por um `Thread.setDefaultUncaughtExceptionHandler` encadeado (instalado no `OnCreate` do módulo). JS: `src/lib/saida-android.ts` (regras puras, 14 testes) e `src/services/saida-android.ts` (no início do app, a queda anterior vira "Último erro do app"; linha "Saídas do app (Android)" no Diagnóstico).
2. Tarefa sem tela (`lib/segundo-plano.ts`): espera 3 s antes de conferir o app. Li o nativo do expo-background-task 57: `inForeground` só vira true quando o módulo vê a Activity, e o WorkManager roda a tarefa atrasada assim que o processo sobe (típico logo depois do `MY_PACKAGE_REPLACED`). Nesse começo o `AppState` ainda diz `background`, então a tarefa podia abrir o SQLite e o motor junto com a abertura do app.
3. `state/plataforma.tsx`: o `busca.finalizar` da abertura só roda com `sincronizado_em`. Na carga inicial, o motor já faz o `finalizar` no fim.

## O que preciso
- **Revisão do módulo nativo** (proposta de ADR: módulo nativo local do shell, só diagnóstico, em `apps/mobile/modules/<nome>`). **O Kotlin não foi compilado aqui** (sem JDK nem Android SDK no PC): o 1º build EAS é que compila. Arquivos: `apps/mobile/modules/macuxi-saida/{expo-module.config.json, android/build.gradle, android/src/main/AndroidManifest.xml, android/src/main/java/expo/modules/macuxisaida/MacuxiSaidaModule.kt}`. Se puder, compile no CI ou num build `--local` antes do build oficial.
- **SDK, só para avaliar (20 mil SKUs; a demo não chega lá):**
  - (a) `sqlite/armazenamento.ts` `linhas.ids` usa `listarLinhas`, que lê e faz `JSON.parse` de todas as linhas da entidade só para pegar os ids (usado na ressincronização, `puxarEntidade`). Um `SELECT id` resolve.
  - (b) `passagem.ts` `limparTentativa` e `limparEntidade` com índice listam a tabela inteira numa transação só.
  - (c) cada escrita do adaptador abre e fecha uma conexão nova do expo-sqlite (`withExclusiveTransactionAsync` → `Transaction.createAsync`, `BEGIN` sem `busy_timeout` na conexão nova). São centenas de aberturas por carga e as funções nativas rodam em `Dispatchers.IO` em paralelo. Não achei uma corrida concreta no nosso uso (tudo com `await` dentro da transação), mas é o 2º suspeito, se o Diagnóstico mostrar erro nativo (SIGSEGV) no SQLite.

## Pronto quando
Módulo revisado (ou ajustes por recado) e compilado num build. Os itens (a) a (c) ficam com você decidir se viram tarefa.
