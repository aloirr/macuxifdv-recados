---
id: R-20261106-212703-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-203022-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-06T21:27:03-04:00
---
# Revisão T-0089 I1/I2: sem 🔴, pode subir; 🟡 ORDEM_CARGA do Conector com tabela_escalonada depois de preco

Contexto: revisão do R-20261106-203022 (T-0089 I1/I2), feita no diff local de modules/integracao e apps/conector/src/config/entidades.ts, contra o desenho docs/desenho/T-0089.md §4.2 e §4.3. Sem 🔴: pode subir no lote.

O que preciso:
Conferido e aprovado:
- ENTIDADES, SCHEMA_REGISTRO, EVENTOS_ATUALIZADO e CAMPO_SOMA_CONTROLE com as 3 entidades: aditivo no v1. Os eventos integracao.forma_pagamento|prazo_pagamento|tabela_escalonada.atualizado@1 estão no manifesto 0.7.0 e no espelho.
- ClientePayload com prazo_medio_max_dias e formas_pagamento nullish (ausente = não altera): o contrato antigo continua válido.
- PagamentoErp em CamposPedidoAmpliado. O PedidoParaErp não é strict, então o Conector 1.2.x descarta o `pagamento`. A ordem do condicao_pagamento_erp em pedido-fila.ts:76-90 é prazo_external_id, depois de-para, depois retido, como no §4.3. O pedido antigo (sem `pagamento`) segue com o mesmo payload e o mesmo hash.
- A medida da faixa é sigla de 1 a 4 letras, em maiúsculas por preprocess, e é conferida em medidas.ts. A faixa referencia o produto em ordem.ts. O prazo vem depois da forma e o cliente depois das formas. Prazo médio calculado = média arredondada para cima (P2). Prazo médio divergente vira aviso, sem recusar a linha.
- CSV: as duas listas escalares separadas por barra entram só por lista explícita (LISTAS_EM_CELULA). As outras listas continuam fora.
- Drizzle: o padrão de conector.entidades é ENTIDADES_ORIGINAIS, igual ao SQL. O Conector antigo nunca manda as entidades novas (não as conhece). O Conector novo só sincroniza o que está configurado. O aviso novo prazo_medio_divergente (enum em AvisoLinha) só aparece em linha de prazo_pagamento, que o Conector 1.2.x não envia: compatível.

🟡 1. apps/conector/src/config/entidades.ts:9: a ORDEM_CARGA põe tabela_escalonada antes de `preco`. A tabela de preço nasce no consumidor do preço do Catálogo (tabelaId em modules/catalogo/api/consumidores-erp.ts). Na primeira carga, a faixa com tabela_external_id cai em referencia_ausente e fica dependendo da repetição da outbox, que tem limite. Ponha tabela_escalonada depois de `preco`, como o ORDEM_PORTAL já faz (portal-carga.ts:11). Em domain/ordem.ts, use DEPENDENCIAS.tabela_escalonada = ['produto', 'preco'], só para ordenar (a referência continua só ao produto). Acrescente um caso no teste de ordem.
🟡 2. Pendências que você já citou viram tarefa no próximo lote: OpenAPI regenerado (trava N2); modelos CSV do portal com as 3 entidades e os 2 campos do cliente (trava N1); views do Conector (B2, banco-dados).
🟢 3. tabela_external_id da faixa não conferida no Hub: aceito. O Catálogo repete com referencia_ausente. Se a 🟡 1 for feita, o caso fica raro.

Pronto quando: a 🟡 1 corrigida com teste (pode ser no próximo lote) e o recado respondido com --encerra.
