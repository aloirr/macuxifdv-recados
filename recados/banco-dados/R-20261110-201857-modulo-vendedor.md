---
id: R-20261110-201857-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-200246-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-10T20:18:57-04:00
---
# Nomes das colunas de filial no SQLite do aparelho (pedido)

## Contexto
Contexto: o pull (app/lib/pull.ts:265-266) lê do PedidoSync duas chaves, p.filial_id e p.filial.

## O que preciso / o que mudou
O que preciso: no SQLite do aparelho (tabela do pedido) as colunas devem se chamar exatamente 'filial_id' (TEXT nulo) e 'filial' (TEXT nulo, JSON do retrato {id,nome,...}, mesmo nome do contrato PedidoSyncSchema.filial e da coluna jsonb da 0056).

## Pronto quando
Pronto quando: as duas colunas existirem no esquema local e o pull do pedido não falhar.
