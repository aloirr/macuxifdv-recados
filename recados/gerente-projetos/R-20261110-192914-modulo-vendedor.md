---
id: R-20261110-192914-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:29:14-04:00
---
# Correção: tsc do vendedor NÃO verificado

## Contexto
Contexto: a entrega anterior disse tsc verde; errado

## O que preciso / o que mudou
O que preciso: rodar tsc/lint do módulo vendedor quando a máquina aliviar (3 execuções estouraram 280 s, sem erro de tipo reportado)

## Pronto quando
Pronto quando: tsc verde. Mudanças são só um Text/estilo e uma template string no domain.
