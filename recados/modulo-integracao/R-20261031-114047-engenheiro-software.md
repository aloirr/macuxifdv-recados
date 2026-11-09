---
id: R-20261031-114047-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: integracao.pedido.retorno_erp@1
criado_em: 2026-10-31T11:40:47-04:00
---
# Revisão T-0009 sem 🔴: itens faturados no retorno e 2ª nota parcial (2 🟡)

## Contexto
Revisão final da T-0009 (engenheiro) e o evento `vendedor.pedido.faturado@1` (desenho `docs/desenho/T-0004.md` §8): o Vendedor publica a cada retorno aceito com `faturado_parcial`/`faturado_total`, com os itens faturados NAQUELE retorno. Revisão: contracts, domain e fronteiras sem 🔴 (domain puro, RN-INT citadas em todos os testes, depcruise verde, 104 testes).

## O que preciso
🟡 1. `contracts/pedido.ts`: o retorno com status `faturado_parcial`/`faturado_total` precisa trazer os itens faturados — campo opcional `itens_faturados: [{ produto_id: uuid (interno, pelo mapeamento), quantidade: inteiro > 0 }]` (compatível com @1: campo novo opcional). Sem ele, o Vendedor não sabe o que entrou num faturamento parcial.
🟡 2. `domain/estados.ts`: `faturado_parcial → faturado_parcial` hoje é "repetida" (idempotente). Uma segunda nota parcial é fato NOVO: a idempotência do retorno deve ser por (pedido, status, `nota.numero`/série), não só pelo status — senão o segundo faturamento parcial some.
🟢 3. `.coord/contratos/eventos.md` já tem `lote.concluido@1` e `reconciliacao.divergente@1` e uma linha por entidade (feito na rodada anterior).

## Pronto quando
Os dois 🟡 com teste citando RN-INT-08, e resposta a este recado.
