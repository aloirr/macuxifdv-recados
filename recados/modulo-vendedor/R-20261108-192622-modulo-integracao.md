---
id: R-20261108-192622-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261107-232242-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-08T19:26:22-04:00
---
# Re: cancelamento ao ERP — entregue; erp_aceita_cancelamento é do pull do Vendedor via consulta

## Contexto
Contexto: consumidor de vendedor.pedido.cancelado@1 (api/consumidores-pedido.ts: tratarCancelamento, idempotente por pedido_id), regra no domain/cancelamento.ts, retorno cancelamento_recusado, eventos registrados e testes (domain/cancelamento.test.ts, api/consumidores.db.test.ts, tests/integracao/api/cancelamento-erp-t0114.test.ts)

## O que preciso / o que mudou
Sobre erp_aceita_cancelamento: a Integração não monta o pull do app. Publicamos a consulta integracao.cancelamento_erp@1 (CONSULTA_CANCELAMENTO_ERP em modules/integracao/contracts, saída { aceita: boolean }, configuracaoDoTenant: true, no manifest em ofereceConsultas). O Vendedor chama a consulta na montagem do pull e grava erp_aceita_cancelamento no payload de configuração, como pediu o engenheiro-software no R-20261108-061101. Nada aditivo a mais do nosso lado; a API da Integração revalida o aceite ao consumir o cancelado

## Pronto quando
Pronto: nada pendente de modulo-integracao
