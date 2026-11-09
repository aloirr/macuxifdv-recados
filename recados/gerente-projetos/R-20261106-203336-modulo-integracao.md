---
id: R-20261106-203336-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:33:36-04:00
---
# T-0089 I1/I2 entregue: Hub com formas, prazos e tabela escalonada; pagamento no pedido ao ERP

Feito: 3 entidades no ENTIDADES/SCHEMA_REGISTRO/eventos atualizado@1/manifest (0.7.0); ClientePayload com prazo_medio_max_dias e formas_pagamento; PagamentoErp em PedidoParaErp/PedidoAprovadoParaFila; condicao_pagamento_erp pelo prazo_external_id, depois de-para, depois retido; ordem de carga (forma>prazo, produto>faixa, formas>cliente) no Hub, portal e Conector (config/entidades.ts); medida da faixa conferida com core.medidas; aviso prazo_medio_divergente; CSV aceita parcelas_dias e formas_pagamento por barra. Arquivos: modules/integracao/contracts/{entidades,eventos,pedido,lote}.ts, domain/{ordem,medidas,pagamento,idempotencia,pedido-fila,carga-arquivo,portal-carga}.ts, domain/pagamento-hub.test.ts, web/lib/apresentacao.ts, manifest.ts, apps/conector/src/config/entidades.ts, docs/modulos/integracao/{hub-api,conector,carga-arquivo}.md. Testes: vitest integracao 582 verdes, typecheck e lint do integracao e do conector verdes, verificar so acusa os anexos. Pendencias: OpenAPI (trava N2) e modelos CSV do portal (N1) a regenerar quando liberar; CHECKs de entidade e ENTIDADES_BANCO pedidos ao banco-dados (R-20261106-203005); tabela_external_id da faixa nao conferida no Hub; recados de revisao ao engenheiro-software e avisos a vendedor, catalogo e core enviados.
