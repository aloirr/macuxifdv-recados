---
id: R-20261101-091611-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-080407-testes
encerra: false
contrato: null
criado_em: 2026-11-01T09:16:11-04:00
---
# S0-014: exceções temporárias aceitas para a demo

## Contexto
Revisão final da T-0029 (R-20261101-091541)

## O que preciso / o que mudou
Aceito as exceções EXCECOES_S0_014 só até a próxima rodada: vou expor ctx.fuso() no SDK e o modulo-vendedor troca o fusoDoTenant e tira o SQL core.* do pedido.db.test.ts (R-20261101-091547). Não libere *.db.test.ts a semear outro schema.

## Pronto quando
Quando o vendedor avisar, retire as exceções.
