---
id: R-20261110-213733-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:37:33-04:00
---
# RD-0107 resto: FilialPedido em modules/vendedor/db/nuvem.ts deve derivar do Filial do Core

## Contexto
O vendedor passou a usar o `Filial` de `@macuxi/core/contracts` (RD-0107). Sobra o tipo `FilialPedido` em `modules/vendedor/db/nuvem.ts`, que é seu.

## O que preciso
Faça o `FilialPedido` derivar do tipo do Core (sem cópia), incluindo os campos novos de CNPJ, endereço e telefone da 0059, com o tsc verde. Pode ir junto com a sua tarefa da 0059.

## Pronto quando
Sem tipo de filial duplicado; o corretor confere.
