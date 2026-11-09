---
id: R-20261105-130317-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:03:17-04:00
---
# Revisão lote L, histórico por aba: UNSTABLE_router aceito (ADR 0026); 🟡 E1 tirar __unsafe_action__ e janela de 1 s, 🟡 E2 testes de guarda antes do push

## Contexto
Revisão final do lote L (T-0071/T-0072), histórico das telas de módulo por aba no shell. Revisei contra origin/main (9e5e931) estes arquivos: `apps/mobile/src/lib/historico-telas.ts` (+ test), `(tabs)/_layout.tsx`, `m/[...caminho].tsx`, `components/tab-bar.tsx`, `(tabs)/mais.tsx`, `state/plataforma.tsx`, `lib/transicao-modulo.ts` e a parte nova que entrou durante a revisão (`state/historico-do-shell.ts`, `lib/abas.ts` `abaAcesa`). tsc do apps/mobile ficou verde e os 24 casos de historico-telas/transicao-modulo passaram.

**Decisão sobre as APIs instáveis (ADR 0026, docs/decisoes/0026-historico-por-aba-no-roteador-do-tabs.md):**
- `UNSTABLE_router`: **aceito.** Fica num ponto só do shell e é puro (o GO_BACK "a seco" do canGoBack só lê). O typecheck quebra se a prop sair do tipo. O expo-router 57 traz o react-navigation dentro do pacote, e o TabRouter tem um TODO no REPLACE, então essa parte vai mudar. Daí os testes de guarda abaixo.
- `__unsafe_action__` com a janela de 1 s: **não aceito como está** (🟡 E1). O evento é interno e pode parar de ser emitido sem quebrar o build. A janela de tempo também falha em aparelho lento: num Android fraco com o sync rodando, a tela pode levar mais de 1 s para abrir depois de "Salvar como orçamento", e aí o editor volta no voltar.

## O que preciso / o que mudou
🟡 **E1. Trocar o `__unsafe_action__` e a janela de 1 s por um parâmetro interno.** `comHistoricoDoShell` já transforma o REPLACE de módulo em JUMP_TO (historico-telas.ts, ramo `ehSubstituicaoDeModulo`). Ali mesmo, ponha `params.__macuxi_substituir = '1'`. Os `__*` já ficam fora de `chaveDosParams`. `preverTelaAberta`/`registrarTelaAberta` leem o parâmetro em vez de `substituicaoEm`/`Date.now()`, e `entradaDaRota` o tira dos `params` guardados (para que voltar a essa tela não conte como nova substituição). Saem o listener do `_layout.tsx`, `marcarSubstituicao` e `VALIDADE_SINAL_MS`. Vantagem extra: `voltarDaTelaAberta`, que roda no render, deixa de ler relógio e estado global fora do snapshot do `useSyncExternalStore`. Hoje o rótulo do voltar pode mudar entre dois renders da mesma tela.

🟡 **E2. Testes de guarda, que são a condição do aceite e entram antes do push do lote L.** Em Node/Vitest, no `historico-telas.test.ts` ou num `expo-router-instavel.test.ts`:
 (a) já existe e fica: os cenários sobre o TabRouter vendorizado e o canário "sem o roteador do shell".
 (b) novo: `expo-router/build/react-navigation/core/useNavigationBuilder.js` ainda aceita `UNSTABLE_router` e junta `{ ...original, ...overrides }`. Pode ser lendo o fonte ou montando um navegador mínimo, se carregar no Node.
 (c) novo: a ação que o `router.replace('/m/pedido?id=…')` gera a partir de uma tela `/m/novo-pedido` chega ao Tabs como `REPLACE` com `payload.name === 'm/[...caminho]'`. Use `findDivergentState`/`getPayloadFromStateRoute` de `expo-router/build/global-state/stateUtils` se carregarem no Node; senão, uma amostra da ação gravada no aparelho, com a versão do expo-router no nome. Hoje o simulador monta a ação à mão (`acaoPara`), então não pega mudança de forma.
 (d) só se o E1 não for feito: `BaseNavigationContainer.js` ainda emite `__unsafe_action__` com `data: { action, noop`.

🟢 **E3.** O `expo-router` já está em `~57.0.0`. Qualquer subida de minor/major passa pela ADR 0026: testes de guarda e o roteiro do voltar no aparelho (Pedidos → pedido → voltar → Início → sai; Salvar como orçamento → voltar não reabre o editor; Início → cartão → voltar = Início; aba tocada duas vezes = raiz).

🟢 **E4.** Os arquivos mudaram enquanto eu revisava (abaAcesa, historico-do-shell). Revisei a versão das 13h. Quando fechar, mande a lista final no recado de resposta e eu confiro só o delta.

Sem 🔴 no shell. Uma pendência do seu package.json vai ao gerente: `@types/node` no `apps/mobile/package.json` sem o `pnpm-lock.yaml`. O CI roda `pnpm install --frozen-lockfile` e falha (🔴 R2 no recado ao gerente). Você não precisa fazer nada, só não tire a linha.

## Pronto quando
E1 e E2 no código, com `pnpm --filter mobile test` e o typecheck verdes, e uma resposta a este recado com o resumo e a lista final dos arquivos.
