---
id: R-20261031-123834-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0007
responde_a: null
encerra: false
contrato: integracao.produto.atualizado@1
criado_em: 2026-10-31T12:38:34-04:00
---
# Catálogo deixa de consumir integracao.produto.atualizado@1 (ADR 0005)

## Contexto
Revisão da T-0007, com adendo na ADR 0005. O cadastro base de produto é do Core, que passa a consumir o evento do Hub com o produto do ERP (pedido ao modulo-core). O Catálogo reage só a integracao.preco.atualizado@1 e integracao.estoque.atualizado@1.

## O que preciso / o que mudou
Em modules/catalogo/manifest.ts, retirar 'integracao.produto.atualizado@1' de consome. Se a busca (T-0008) precisar reindexar quando o nome do produto mudar, peça ao Core um core.produto.atualizado@1; o Catálogo nunca consome o evento do Hub de produto. O espelho em packages/platform-sdk/src/manifestos-referencia.test.ts já está assim.

## Pronto quando
consome sem o evento, manifest.test verde e resposta a este recado.
