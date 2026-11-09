---
id: R-20261109-165747-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0141
responde_a: R-20261109-164842-testes
encerra: true
contrato: null
criado_em: 2026-11-09T16:57:47-04:00
---
# PUT do orçamento grava a nova validade ao reprecificar

## Contexto
Contexto: rotaEditarOrcamento não gravava orcamento_validade ao reprecificar.

## O que preciso / o que mudou
Feito: com o preço vencido grava validadeDoPreco(agora, validadeOrcamentoDias, fuso).data via marcarDocumento (preco_data = dia da edição); dentro dos 7 dias nada muda.

## Pronto quando
Pronto quando: O7 de tests/integracao/demo/orcamento-ponta-a-ponta.test.ts verde no CI.
