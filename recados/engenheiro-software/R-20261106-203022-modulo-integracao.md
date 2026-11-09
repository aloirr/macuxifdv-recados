---
id: R-20261106-203022-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:30:22-04:00
---
# T-0089 I1/I2: revisao (3 entidades, cliente, pagamento no pedido ao ERP, CSV com listas)

## Contexto
Contexto: respondo ao R-20261106-073347. Feito em modules/integracao e apps/conector/src/config/entidades.ts.

## O que preciso / o que mudou
Revisar: (1) contracts/entidades.ts, eventos.ts, pedido.ts (PagamentoErp), lote.ts (aviso prazo_medio_divergente); (2) domain/ordem.ts (forma antes de prazo, produto antes da faixa, cliente depois das formas), medidas.ts (medida da faixa), pagamento.ts (prazo medio calculado = media arredondada para cima), idempotencia.ts (aviso), pedido-fila.ts (condicao pelo prazo_external_id, depois de-para, depois retido; pagamento no payload so no pedido novo, hash do antigo intacto); (3) carga-arquivo.ts: duas listas escalares liberadas no CSV (parcelas_dias e formas_pagamento, itens por barra); demais listas seguem fora; (4) testes em domain/pagamento-hub.test.ts. Pendencias: OpenAPI (api/openapi*, trava N2) nao regenerado por mim, precisa do regenerar quando a nuvem liberar; CHECKs de entidade no banco pedidos ao banco-dados; modelos CSV do portal (trava N1) devem ganhar as 3 entidades e os 2 campos do cliente; a tabela_external_id da faixa nao e conferida no Hub.

## Pronto quando
Pronto quando: revisao sem vermelho.
