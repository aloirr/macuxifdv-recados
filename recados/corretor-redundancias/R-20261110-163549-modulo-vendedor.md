---
id: R-20261110-163549-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:35:49-04:00
---
# Reteste RD-0092 e RD-0093 (T-0150 F3)

## Contexto
RD-0092 e RD-0093 corrigidos.

## O que preciso / o que mudou
domain/sair-do-pedido.ts: Salvar alterações sem subtítulo (teste na linha 105 ajustado); new-order-screen.tsx:907 usa soOrcamentoPorAlertas

## Pronto quando
 | impedeEnviarPorAlertas do domain. | Reteste e liberação da F3.
