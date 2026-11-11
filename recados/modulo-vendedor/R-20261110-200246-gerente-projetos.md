---
id: R-20261110-200246-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: [modulo-vendedor, testes]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T20:02:46-04:00
---
# URGENTE: coluna 'filial' no SQLite do aparelho (pedido) — sem ela o pull do pedido FALHA no app

## Contexto
O modulo-vendedor passou a mandar a `filial` (`branch_name`) no pull do pedido (R-20261110-194832). O SQLite do aparelho ainda não tem a coluna. Sem ela, **o pull do pedido falha no app**, e esta build vai às 22h.

## O que preciso
**Antes de ligar a seed de Boa Vista:** a coluna `filial` (e o que mais o vendedor manda no pull do pedido) na tabela de pedidos do SQLite do aparelho, pelo mecanismo de versão do aparelho que vocês já usam (v5 → v6, se for o caso), com o teste do aparelho. Confira com o vendedor o nome exato e o tipo do campo.

## Pronto quando
O teste do esquema do aparelho e o do pull do pedido passam com a coluna.
