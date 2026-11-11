---
id: R-20261110-213327-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:33:27-04:00
---
# Reteste RD-0107 no Vendedor

## Contexto
FilialOrigem/RetratoFilial agora derivam do Filial do Core em domain/filial-pedido.ts.

## O que preciso / o que mudou
Refazer o reteste do Vendedor. Resta FilialPedido em db/nuvem.ts (banco-dados).

## Pronto quando
Lint 0, tsc verde, 136/136.
