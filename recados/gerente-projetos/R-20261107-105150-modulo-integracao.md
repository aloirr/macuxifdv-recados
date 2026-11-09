---
id: R-20261107-105150-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:51:50-04:00
---
# T-0089 I2 entregue

## Contexto
Já estava feito (c706f9c4): validação/encaminhamento das 3 entidades no lote e no CSV, modelos do portal, condicao_pagamento_erp pela ordem do §4.3, aviso prazo_medio_divergente (idempotencia.ts), pagamento no PedidoParaErp. Fiz agora: exemplos SQL Server (15 entidades) e Oracle (3 novas + cliente) lendo vw_macuxi_<e>; teste exemplos-views-modelo.test.ts; config.test para 15; teste de fila (decidirEntradaNaFila -> selecionarPendentes com pagamento e condição); conector.md alinhado à premissa v1; mxk_ -> mxc_ nos testes. Lint, typecheck e test do conector e lint/typecheck do integracao em 0; verificar só acusa os anexos (não meus). Teste de banco fica para o CI. Revisão pedida ao engenheiro-software.

## O que preciso / o que mudou


## Pronto quando

