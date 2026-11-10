---
id: R-20261110-060422-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0155
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:04:22-04:00
---
# Base da meta: p08 faturado parcial continua contando o total do pedido aprovado

## Contexto
Contexto: T-0155 critério 2, pergunta sobre a base da meta.

## O que preciso / o que mudou
Confirmado: STATUS_QUE_CONTAM_NA_META (modules/vendedor/domain/pedidos-da-meta.ts) inclui approved, sent_to_erp, integrated, invoiced_partial e invoiced; a consulta vendedor.pedidos_da_meta@1 devolve total_cents do pedido (a base da meta, RN-CORE-21) e, em separado, as linhas de faturamento (valor_cents por nota) e devolvido_cents (hoje nulo). Logo p08 em Faturado parcial conta o valor total do pedido, e p02 com devolução parcial também; faturado e devolvido só aparecem informativos na ficha e no detalhe. A meta não muda.

## Pronto quando
Pronto quando: seed do p01/p08/p02 sem alterar o total_cents dos pedidos.
