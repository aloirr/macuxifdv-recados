---
id: R-20261105-005045-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:50:45-04:00
---
# T-0008 P7: tela oculta de diagnóstico (20 mil SKUs, 500 clientes, p95) pronta; falta expo-sqlite no APK

## Contexto
T-0008, critérios 1 e 2 (P4/P7): preparar a medição no aparelho de referência (Android 10+, 3 GB) para ser rodada no APK de preview pelo dono do produto. Só apps/mobile/** alterado; sem pnpm install, commit, push nem build EAS.

## O que foi feito
- **Tela oculta de diagnóstico** `apps/mobile/src/app/diagnostico-carga.tsx` (rota `/diagnostico-carga`): só nos perfis `desenvolvimento` e `preview` (`EXPO_PUBLIC_PERFIL_BUILD` do eas.json). Em `producao` (ou bundle de release sem a variável) a rota redireciona para o Início e o toque na versão não faz nada.
  - Banco **separado e temporário** `macuxi-diagnostico-carga.db` (nunca o do usuário): apagado antes de começar, ao terminar e ao sair da tela (sair no meio cancela no próximo ponto seguro).
  - Adaptador `criarArmazenamentoSqlite` e índice de busca do platform-sdk; migrações e índice do Catálogo pelas exportações públicas (`shellDaVariante(...).migracoesAparelho / indicesBusca`, vindos do `moduloApp` de `@macuxi/catalogo/app`).
  - Gera 20.000 SKUs + 40.000 atributos + 500 clientes sintéticos no formato do pull (schemas do Core e do Catálogo), em páginas de 1.000 (lotes de 500 do adaptador); mede gravação por entidade, total e o rebuild do índice.
  - "Sem travar": medidor de quadros por `requestAnimationFrame` (thread JS) com contador ao vivo na tela; critério 1 = nenhum quadro > 100 ms.
  - 200 buscas de produto (6 tipos: prefixo de 2 letras, duas palavras, sinônimos, SKU com hífen, código compacto, EAN; FTS5 + leitura dos 50 primeiros) e 100 de cliente (lista + filtro em memória, desenho T-0016 §8); p50/p95/máx e p95 por tipo; critério 2 = os dois p95 < 300 ms.
  - Resultado em texto selecionável + botão "Copiar ou compartilhar" (folha do Android, que tem "Copiar"). Texto com aparelho, Android/API, RAM, versão do SQLite e FTS5, hora no fuso do tenant; sem dado pessoal.
- **Gesto**: 7 toques seguidos (até 3 s entre eles) na linha "Macuxi Campo · versão 1.0.0", no fim do Perfil (`apps/mobile/src/app/profile.tsx`).
- **Driver expo-sqlite** `apps/mobile/src/services/sqlite-expo.ts` (contrato `DriverSqlite`; transação exclusiva com o `tx` da outra conexão), carregado como dependência OPCIONAL.
- **app.config.ts**: plugin `['expo-sqlite', { enableFTS: true }]` entra sozinho quando o pacote estiver instalado.
- **Regra pura** `apps/mobile/src/lib/diagnostico-carga.ts` + 14 testes em `diagnostico-carga.test.ts` (perfis, 7 toques, dados válidos nos schemas, consultas, filtro de cliente, percentis, medidor de quadros, formatação pt-BR, veredito, texto do relatório e uma execução pequena de ponta a ponta no node:sqlite, inclusive cancelamento).
- **🟡 Y1 da vibração** (R-20261104-234713): Android < API 30 vai direto em Virtual_Key (escolha pela versão); API 30+ usa Confirm e cai para Virtual_Key só se rejeitar. `lib/vibracao.ts`, `services/vibracao.ts`, 7 testes. Respondido e encerrado ao designer-ux (R-20261105-004932).

## BLOQUEIO para a medição de manhã
O **expo-sqlite não está instalado** (nem no node_modules nem no lock), e o APK de preview atual não tem o módulo nativo. Sem ele a tela abre e mostra "Este APK não tem o SQLite do aparelho (expo-sqlite)". Pedido ao engenheiro-software: R-20261105-004914 (`npx expo install expo-sqlite` → ~57.0.4, lock só +expo-sqlite). Depois disso: bundle das 2 variantes (eu) e **1 build `campo-preview`** autorizado pelo dono do produto (basta o Campo para a medição).

## Passo a passo para a medição (APK de preview com expo-sqlite)
1. Instale o APK novo do **Macuxi Campo (preview)** no aparelho de referência (Android 10+, 3 GB). Feche os outros apps.
2. Entre com qualquer usuário de teste e abra **Perfil** (avatar no alto do Início).
3. Role até o fim e toque **7 vezes seguidas** na linha "Macuxi Campo · versão 1.0.0" (no máximo 3 s entre toques). Abre "Diagnóstico de carga".
4. Toque em **Rodar medição** e deixe a tela aberta (alguns minutos; não bloqueie o aparelho). O contador "Quadros … · maior … ms" deve continuar mudando; se congelar, é travamento.
5. No fim aparece o **Resultado** com "Critério 1 … OK/NÃO ATENDE" e "Critério 2 … OK/NÃO ATENDE". Toque em **Copiar ou compartilhar** → **Copiar** e cole o texto num recado (ou mande pelo WhatsApp).
6. Opcional: rode 2 ou 3 vezes ("Rodar de novo") e mande todas; o banco de teste é recriado a cada vez e apagado ao sair (os dados do usuário não são tocados).

## Testes
eslint e tsc do apps/mobile limpos; vitest 23 arquivos / 194 testes verdes; `bundle:android` verde nas variantes campo e gestao (1.971 módulos, com o expo-sqlite ausente tratado como opcional).

## Premissas
- Critério 1 medido como quadros da thread JS > 100 ms (o expo-sqlite grava em thread nativa; o custo JS é montar o JSON das linhas).
- Mesmas consultas e gerador do `db/testes/aparelho-sqlite.test.ts` (banco-dados), para comparar Node × aparelho.
- A versão visível no fim do Perfil aparece em todos os builds; o toque só funciona em desenvolvimento/preview.
- Pendências na minha caixa não tratadas nesta rodada: R-20261103-235330 (base T-0072), revisões R-20261104-042956 e R-20261104-202158 (sem 🔴).
