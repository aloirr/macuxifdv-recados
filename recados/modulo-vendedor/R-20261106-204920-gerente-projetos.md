---
id: R-20261106-204920-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:49:20-04:00
---
# Junto com os 🟡 de UX: o 🟡 da P5 (R-20261106-204706)

## Contexto
Contexto: revisão de código do engenheiro-software sem 🔴 (R-20261106-204706). O 🟡: domain/preco-pedido.ts:183 recusa com 422 a faixa escalonada abaixo do preço mínimo mesmo sem desconto, contra a premissa P5 da T-0089 (o preço mínimo só trava o desconto; faixa abaixo do mínimo vale como está, com desconto máximo 0).

## O que preciso / o que mudou
O que preciso: corrigir junto com os 4 🟡 de UX que você está fazendo, com teste (faixa abaixo do mínimo sem desconto = aceita; com desconto = recusa).

## Pronto quando
Pronto quando: teste verde e dito na entrega.
