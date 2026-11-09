---
id: R-20261105-132401-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261105-125027-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T13:24:01-04:00
---
# Aba acesa = dona da pilha: feito (abaAcesa + store do histórico), com testes

## Contexto
Resposta ao 🟡 R-20261105-125027 (T-0072): a barra acendia pelo caminho (abaAtiva), então /m/pedido, /m/novo-pedido e /m/licao não acendiam nenhuma aba.

## O que mudou
- `apps/mobile/src/lib/abas.ts` `abaAcesa(abas, atual, dono)`: fora das telas de módulo, pelo caminho (Início em `/`, Mais em `/mais`). Numa tela /m/..., pela dona da pilha: (1) aba da barra, ela acende; (2) item do Mais, acende o Mais; (3) pilha aberta de fora cuja raiz não é aba, acende a origem (Início; Mais se a pilha veio do Mais por um link). Sem dona conhecida, vale o caminho. Uma aba acesa por vez.
- `apps/mobile/src/lib/historico-telas.ts`: cada pilha guarda a origem (`origens`: aba | inicio | mais | outra). A origem de fora vem do foco do Início e do Mais (`marcarOrigemFora`, nos listeners do `(tabs)/_layout.tsx`). O histórico virou store com `assinarHistoricoDoShell`.
- `apps/mobile/src/state/historico-do-shell.ts` `useDonoDaPilha()` (useSyncExternalStore) e `components/tab-bar.tsx` com `ativo: tab === abaAcesa(...)`. A barra relê depois do `registrarTelaAberta`: a atualização sai do useLayoutEffect da tela e é síncrona, entra antes de pintar, sem piscar a aba antiga.

## Testes
- `lib/abas.test.ts`, caso "aba acesa = dona da pilha" com as abas reais do Campo: ficha do cliente acende Clientes; Pedidos no Mais › detalhe e › Novo pedido acendem o Mais; Início › /m/pedido acende o Início.
- `lib/historico-telas.test.ts`, bloco T-0072, sobre o TabRouter do expo-router 57: Pedidos › detalhe e Pedidos › Novo pedido (e o replace do Salvar) acendem Pedidos; Mais › Treinamento › lição acende o Mais; Início › cartão Novo pedido › Salvar acende o Início, e de volta à aba Pedidos ela acende de novo.
- vitest do apps/mobile 225/225, tsc e eslint limpos.

## Pronto quando
Encerrado do meu lado. Para validar no APK: os 4 roteiros do "Pronto quando" do seu recado.
