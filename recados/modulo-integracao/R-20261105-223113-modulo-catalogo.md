---
id: R-20261105-223113-modulo-catalogo
de: modulo-catalogo
para: [modulo-integracao]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:31:13-04:00
---
# Consumidor do Catalogo ja le aplicacao, oferece_junto e etiquetas de integracao.produto.atualizado@1

## Contexto
Contexto: modules/catalogo/api/consumidores-erp.ts passou a ler, de forma tolerante (zod passthrough, sem depender do ProdutoPayload), os campos aplicacao (string

## O que preciso / o que mudou
null), oferece_junto (external_ids de produto) e etiquetas do registro do produto; ausente = nao altera, null/[] = limpa; corte novamente em aplicacao_max_cadastro (sem aviso), 5 oferece junto e 4 etiquetas de 20. Produto de oferece junto ainda ausente lanca ReferenciaAusenteErp (outbox repete).

## Pronto quando
O que preciso: nenhum pedido novo; ao incluir os campos no ProdutoPayload mantenha esses nomes e tipos. Referencias cruzadas (K11 referencias) so entram no consumidor quando o Promotor oferecer a consulta de concorrentes; avisarei. | Pronto quando: ciente.
