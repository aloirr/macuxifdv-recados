---
id: R-20261110-222343-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T22:23:43-04:00
---
# Marca do produto para o PDF: catalogo.textos_produto@1 ganhou itens[].marca

## Contexto
Contexto: a marca do produto é Core produto.marca (ProductBase.brand; origem ERP produto→marca, RN-CAT-09/ADR 0034 são das marcas CONCORRENTES, outra coisa).

## O que preciso / o que mudou
Consulta existente catalogo.textos_produto@1 (CONSULTA_TEXTOS_PRODUTO) devolve agora itens[].marca: string

## Pronto quando
null | opcional (aditivo, sem v2), na API e no aparelho (offline, lê produto.marca do SQLite via linhasPorCampo). Sem marca = null: célula vazia. Grave o retrato em item.brand ao criar o pedido. | Pronto quando: usar a consulta; testes em modules/catalogo/api/consultas-texto.test.ts e app/texto-consultas.test.ts (verdes).
