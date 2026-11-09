---
id: R-20261109-104206-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:42:06-04:00
---
# T-0141 C: Hub com EnderecoEntregaErp.origem (aditivo v1)

Contexto: T-0141 item C, devolução do endereço editado ao ERP.
O que fiz: contracts/pedido.ts com EnderecoEntregaErp.origem (erp|editado, nullish, v1 mantido); exemplo e openapi-hub-v1.json regerados; guia-api-hub.md com a regra external_id nulo = usar os textos (vale no Conector 1.3.x); domain/endereco-editado.test.ts com 7 testes RN-VEN-17 (origem, repasse na fila, exigeConector 1.3.0, payload antigo idêntico). Lint, typecheck e testes do @macuxi/integracao verdes.
Pendências: doc 06 (linha Pedidos aprovados) é do gerente; EnderecoEntregaEvento do Vendedor precisa de origem para chegar ponta a ponta; coleção Postman não regerada.
