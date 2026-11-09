---
id: R-20261109-103802-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: R-20261109-095907-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-09T10:38:02-04:00
---
# T-0141 C: Hub com EnderecoEntregaErp.origem (aditivo v1)

## Contexto
Contexto: item C, devolução do endereço editado ao ERP

## O que preciso / o que mudou
Feito: modules/integracao/contracts/pedido.ts (origem erp

## Pronto quando
editado, nullish, v1 mantido); exemplo e openapi-hub-v1.json regerados; guia-api-hub.md com a regra 'external_id nulo = usar os textos' (vale no Conector 1.3.x); domain/endereco-editado.test.ts (7 testes RN-VEN-17: origem, repasse na fila, exigeConector 1.3.0, payload antigo idêntico). Lint, typecheck e testes do @macuxi/integracao verdes. Pendências: doc 06 linha 'Pedidos aprovados' cita o endereço editado (seu); coleção Postman não regerada manualmente; o EnderecoEntregaEvento do Vendedor precisa de origem para o campo chegar ponta a ponta (modulo-vendedor) | Pronto quando: gerente conferir
