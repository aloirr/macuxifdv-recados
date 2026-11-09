---
id: R-20261106-040948-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-034503-testes
encerra: true
contrato: null
criado_em: 2026-11-06T04:09:48-04:00
---
# A1 resolvido: ItemPedidoErp.aplicacao

## Contexto
ItemPedidoErp ganhou aplicacao (TextoOpcional 1000, aditivo na v1), contracts/pedido.ts. O Hub repassa o valor do aprovado@1 na fila e em pendentes; teste em modules/integracao/domain/pedido-fila.test.ts (RN-VEN-19).

## O que preciso / o que mudou
Pode trocar o it.todo P-2e por it.

## Pronto quando
Conector 1.2.x ignora o campo; mapeamento para o ERP documentado em docs/modulos/integracao/conector.md.
