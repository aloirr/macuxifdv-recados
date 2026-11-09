---
id: R-20261105-132440-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-130317-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T13:24:40-04:00
---
# E1 feito (PARAM_SUBSTITUIR no JUMP_TO, sem __unsafe_action__ nem relógio) e E2 (expo-router-instavel.test.ts); lista final

## Contexto
Resposta à revisão do lote L, R-20261105-130317 (T-0071/T-0072, ADR 0026). Fiz o E1 e o E2. O E3 fica registrado no cabeçalho do teste de guarda.

## O que mudou
**E1. Saem o `__unsafe_action__` e a janela de 1 s.** No `comHistoricoDoShell`, o REPLACE de tela de módulo para tela de módulo vira JUMP_TO com `params.__macuxi_substituir = '1'` (`PARAM_SUBSTITUIR`). `preverTelaAberta` e `registrarTelaAberta` leem `abriuSubstituindo(params)`. `entradaDaRota` tira o parâmetro dos `params` guardados, então voltar à tela não conta como nova substituição. Saíram `marcarSubstituicao`, `VALIDADE_SINAL_MS`, `substituicaoEm`, o listener e o `useNavigationContainerRef` do `(tabs)/_layout.tsx`. A origem de fora (`origemFora`) também entrou no retrato do histórico. Com isso, `preverTelaAberta` e `voltarDaTelaAberta`, que rodam no render, ficaram puras sobre o snapshot do `useSyncExternalStore` e os params, sem relógio e sem estado global fora do snapshot.

Teste novo: "o replace vem marcado nos parâmetros da tela (sem relógio)". O parâmetro não entra na chave nem fica na pilha; navegar depois do replace empilha; voltar à tela do replace e navegar empilha de novo.

**E2. Testes de guarda em `apps/mobile/src/lib/expo-router-instavel.test.ts`:**
- (a) Continua em historico-telas.test.ts.
- (b) Lê o fonte de `useNavigationBuilder.js`: `UNSTABLE_router` desestruturado de `options` e `{ ...original, ...overrides }`.
- (c) Usa `findDivergentState` e `getPayloadFromStateRoute`, que carregam no Node, sobre o estado raiz → (tabs) (TabRouter, `type 'tab'`) → /m/novo-pedido e o estado de /m/pedido?id=u1. Confere: alvo = Tabs, `screen === 'm/[...caminho]'`. No fonte de `getNavigationAction.js`: só 'expo-tab' e 'drawer' viram JUMP_TO, e a ação é `{ type, target: navigationState.key, payload: { name: rootPayload.screen, params } }`. No `router.js`: `event: 'REPLACE'`. Por fim, o roteador do shell transforma essa ação em JUMP_TO com o parâmetro e mantém o histórico das abas.
- (d) Não se aplica, porque o E1 foi feito.
- Mais um canário: major do expo-router = 57.

O estado pedido em (c) foi montado à mão (o `getStateFromPath` do expo-router precisa do store), com o formato da rota pega-tudo (`caminho: ['pedido']`). Se preferir, gravo uma amostra no aparelho na próxima build.

## Lista final de arquivos (delta desde a sua revisão das 13h)
- apps/mobile/src/lib/historico-telas.ts (E1; origem no retrato; `voltarDaTelaAberta` puro)
- apps/mobile/src/lib/historico-telas.test.ts (sem relógio; caso novo do E1; bloco T-0072 de aba acesa e rótulo)
- apps/mobile/src/lib/expo-router-instavel.test.ts (novo, E2)
- apps/mobile/src/app/(tabs)/_layout.tsx (sem `__unsafe_action__`; foco do Início e do Mais → `marcarOrigemFora`)
- apps/mobile/src/lib/abas.ts (`abaAcesa`) e lib/abas.test.ts
- apps/mobile/src/state/historico-do-shell.ts (novo: `useHistoricoDoShell`, `useDonoDaPilha`, `useVoltarDoShell`)
- apps/mobile/src/components/tab-bar.tsx (aba acesa pela dona da pilha)

## Verificação
vitest do apps/mobile 225/225, tsc e eslint limpos, bundle Android campo e gestao (resultado na entrega ao gerente). `@types/node` continua no package.json, sem mexer.

## Pronto quando
E1 e E2 no código, com testes e typecheck verdes. Encerro do meu lado; confira o delta.
