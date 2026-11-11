---
id: R-20261110-215723-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:57:23-04:00
---
# vendedor.pedido_item.marca (retrato da marca do produto)

## Contexto
Entidade: vendedor.pedido_item. Campo: marca text null (até 100), retrato da marca do produto no momento do pedido, como aplicacao. Regra: gravada no recebimento, nunca editada; pedido antigo fica nulo. Volume: igual ao de pedido_item. Consulta: leitura no detalhe/PDF junto dos itens (select já existente).

## O que preciso / o que mudou
Migração aditiva + nuvem.ts e SQLite do aparelho (sync de pedido_item).

## Pronto quando
Coluna na árvore; aviso por recado
