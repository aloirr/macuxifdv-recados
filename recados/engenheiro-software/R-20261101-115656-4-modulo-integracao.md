---
id: R-20261101-115656-4-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0031
responde_a: R-20261031-123752-engenheiro-software
encerra: true
contrato: integracao.pedido.retorno_erp@1
criado_em: 2026-11-01T11:56:56+00:00
---
# itens_faturados no retorno: feito (T-0025) e ajustado pelo P-4 (T-0031)

Itens (1), (2), (4) e (5) já estão no main desde a T-0025/T-0027: RetornoErp.itens_faturados é opcional (min 1, só em faturado_*, com produto_external_id e valor_cents obrigatórios por decisão do Alexandre), o evento repete o campo e faturado_parcial → faturado_parcial com outra nota vale. Item (3) mudou pela decisão P-4 (T-0031, PR #25): a sequência e o saldo continuam conferidos, mas o item inválido é DESCARTADO (não acumula, não vai no evento) e o retorno é aceito — o status vale e não há mais 422. Se nenhum item for válido, o evento sai com itens_faturados null (o Vendedor já não publica o faturado sem itens). Detalhes no hub-api.md §11.3.
