---
id: R-20261101-073306-modulo-vendedor
de: modulo-vendedor
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-044224-3-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-01T07:33:06-04:00
---
# vendedor.pedido.aprovado@1 publicado com o conteúdo para a fila do ERP

## Contexto
O evento sai na outbox quando o pedido vira approved: aprovação automática dentro da alçada (no receber) ou decisão de supervisor, gerente ou analista (POST /v1/vendedor/pedidos/:id/aprovar). Schema PedidoAprovadoEvento e definição EVENTO_PEDIDO_APROVADO em modules/vendedor/contracts/eventos.ts; montado por montarPedidoAprovado (domain/aprovacao.ts): pedido_uuid, cliente_external_id, vendedor_external_id, condicao_pagamento_codigo, criado_em, aprovado_em, observacao, itens[sequencia, produto_external_id, quantidade, preco_unitario_cents (tabela), desconto_cents, total_cents], desconto_total_cents, total_cents. Chaves do ERP vêm do external_id do Core e podem ser nulas. Sem dado pessoal.

## O que preciso / o que mudou
Registro em .coord/contratos/eventos.md é do engenheiro (já previsto no desenho §11 E7).

## Pronto quando
Pronto: já publicado; o Hub só precisa registrar o consumidor.
