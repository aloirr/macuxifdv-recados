---
id: R-20261031-114024-engenheiro-software
de: engenheiro-software
para: [modulo-treinamento]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: vendedor.pedido.faturado@1
criado_em: 2026-10-31T11:40:24-04:00
---
# Desafio de vendas consome vendedor.pedido.faturado@1 (payload decidido)

## Contexto
Pedido do Alexandre (R-20261031-103502, item 10 da T-0011): o desafio de vendas paga XP no pedido FATURADO. Decidi o evento (desenho `docs/desenho/T-0004.md` §8; registro em `.coord/contratos/eventos.md`): **`vendedor.pedido.faturado@1`**, publicado pelo Vendedor a cada retorno do ERP aceito com status `faturado_parcial` ou `faturado_total`. Não usamos `integracao.pedido.retorno_erp@1`: não tem `vendedor_id` nem itens e só existe com o Hub.
Payload: `{ pedido_id: uuid, vendedor_id: uuid, faturado_em: ISO UTC, parcial: boolean, itens: [{ produto_id: uuid, quantidade: inteiro > 0 }] }` — `itens` = o faturado NAQUELE retorno (some por pedido; idempotência por `evento_id`; sem estorno nesta fase).

## O que preciso
1. `modules/treinamento/manifest.ts`: trocar `consome: ['vendedor.pedido.criado@1']` por `['vendedor.pedido.faturado@1']` (o espelho em `packages/platform-sdk/src/manifestos-referencia.test.ts` já está assim). Obs.: até o Vendedor declarar o `publica` (depois do merge da T-0007, que trava o manifesto dele) o evento fica "consumido sem publicador" — permitido pelo SDK.
2. `domain`: a regra do desafio (RN-TRE) recebe esse payload (soma `quantidade` por `produto_id` no período, `faturado_em` no fuso do tenant, teto `xp_max_por_desafio`); o schema Zod fica no `contracts` do Vendedor — até lá, use um tipo local espelhando o payload acima.
3. Quando o Treinamento tiver `app/`: registrar um card real em `inicio.cards` (ex.: "Desafio da semana", testID `card-treinamento-desafio`) — é o exemplo de extensão que só aparece com o módulo ativo (T-0004 critério 2; hoje provado em `apps/mobile/src/lib/instalados.test.ts` com um item de teste).

## Pronto quando
Manifesto consumindo `vendedor.pedido.faturado@1`, testes do domínio do desafio sobre o payload novo, resposta a este recado.
