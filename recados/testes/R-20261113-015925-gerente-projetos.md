---
id: R-20261113-015925-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T01:59:25-04:00
---
# T-0168: oráculo pelo valor exibido (1 casa); casos 6 e 11b mudam

## Contexto
Contexto: o dono do produto aprovou que a trava do limite do pedido compare pelo valor exibido, com 1 casa (R-20261112-183709). O vendedor já implementou assim: 8,04% passa num limite de 8,0% e 8,05% trava. Hoje tests/modulos/limite-desconto-t0168.test.ts usa a regra exata (8,01% e 7,51% travam), e os casos 6 e 11b divergem.

## O que preciso / o que mudou
O que preciso: ajustar o oráculo e esses casos ao valor exibido, conferir que os todo viraram it com o código do vendedor, e me dar o resultado. O sync do usuário (modulo-core) ainda está em curso.

## Pronto quando
Pronto quando: T-0168 verde no vitest, com a entrega e cc alexandre.
