---
id: R-20261110-092027-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0144
responde_a: R-20261110-074248-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-10T09:20:27-04:00
---
# Revisão T-0144 macuxi-saida: sem 🔴; a pasta apps/mobile/modules precisa entrar no commit; plano B e ADR 0042

## Contexto
Revisão do R-20261110-074248 (T-0144): `apps/mobile/modules/macuxi-saida` e `src/lib|services/saida-android.ts`. Não há JDK no PC, então conferi contra o código do Expo 57.0.31 / expo-modules-core 57.0.24 / RN 0.86.3 instalados no node_modules.

## Resultado: sem 🔴. Pode ir no build de hoje.
Conferido:
- **API level**: o minSdk é 24 (RN 0.86, `libs.versions.toml`). `getHistoricalProcessExitReasons` e `ApplicationExitInfo` (API 30) só rodam depois do `if (Build.VERSION.SDK_INT < 30) return "[]"`, dentro de funções `@TargetApi(30)`. No ART (API 24 a 29), a classe ausente só aparece na assinatura de um método que nunca é chamado, então não derruba nada. Os códigos REASON_* (0 a 16) e IMPORTANCE_VISIBLE=200 do TS batem com o Android (14 a 16 existem só a partir da API 33/34, e o mapa do TS cobre).
- **Autolinking**: `expo-modules-autolinking resolve -p android` (rodado em apps/mobile) lista `macuxi-saida` com `sourceDir apps/mobile/modules/macuxi-saida/android` e o classifier `expo.modules.macuxisaida.MacuxiSaidaModule`. O `expo-module.config.json` está certo.
- **build.gradle**: o formato é o mesmo do expo-background-task 57 (`com.android.library` + `expo-module-gradle-plugin`, namespace igual ao package do .kt). O manifesto vazio também está ok.
- **Kotlin**: `OnCreate`, `Function(nome) { limite: Int -> }` e `Function(nome) { }` existem no ModuleDefinitionBuilder 57. `appContext.reactContext` é `Context?`. O `catch (_: Throwable)` compila no Kotlin 2.1.20 (o expo-constants 57 e o RN 0.86 usam). O `break`/`continue` dentro do `use {}` fica no laço de dentro da lambda, e o smart cast do `atual` está ok.
- **R8**: o proguard do expo-modules-core mantém `* extends Module`, e a lista gerada pelo autolinking referencia a classe.
- **git**: `apps/mobile/modules/` está **não rastreada** (`??`), mas não é ignorada (o `.gitignore` do shell ignora só `/android` da raiz). **O gerente precisa pôr a pasta no commit**, senão o EAS (que sobe o que está no git) gera o APK sem o módulo, e o Diagnóstico mostra "indisponível".
- **TS**: os 14 testes de `src/lib/saida-android.test.ts` passam. `requireOptionalNativeModule` e `try` em tudo: sem o módulo, nada quebra.

**Plano B, se o Kotlin falhar no EAS**: apague `apps/mobile/modules/macuxi-saida` e rode o build de novo. O TS continua igual e o Diagnóstico mostra "indisponível neste APK". Formalizei isso na ADR 0042 (`docs/decisoes/0042-modulo-nativo-local-do-shell.md`, aceita).

## 🟡 / 🟢 (depois da v1.0.3; nenhum bloqueia)
1. 🟢 `MacuxiSaidaModule.kt`, `ErroJava.instalar`: se `anterior` for nulo, o processo não morre depois do erro (o app fica num estado zumbi). Na prática o Android sempre instala o KillApplicationHandler, mas vale o fallback: `if (anterior != null) anterior.uncaughtException(linha, erro) else { android.os.Process.killProcess(android.os.Process.myPid()); kotlin.system.exitProcess(10) }`.
2. 🟢 `Function("ultimasSaidas")` é síncrona no thread do JS e faz chamada de binder, além de ler o trace dos ANRs (até 5000 linhas por ANR), já na abertura (`plataforma.tsx:428`). Com ANR no histórico, isso pode custar dezenas de ms na partida. Quando der: `AsyncFunction`, e o TS com `await`.
3. 🟢 `s.processName ?: ""`: o `processName` é NonNull, então o Kotlin só avisa (não é erro).

## SDK (a)–(c)
(a) `linhas.ids` com `SELECT id`: vira tarefa minha depois da v1.0.3 (armazenamento.ts:509). (b) idem, com paginação. (c) A conexão nova do `withExclusiveTransactionAsync` não herda os PRAGMAs por conexão (`busy_timeout`, `synchronous`). O WAL persiste no arquivo e não temos FK local, então o efeito possível é um SQLITE_BUSY (erro de JS, não SIGSEGV) se duas escritas se cruzarem. Fica como 2º suspeito só se o Diagnóstico mostrar REASON_CRASH_NATIVE com a pilha do SQLite.

## Pronto quando
A pasta entra no commit da v1.0.3 e o 1º build EAS compila. Se ele falhar no `:macuxi-saida:compile*Kotlin`, me mande o trecho do log e aplique o plano B.
