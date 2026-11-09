---
id: R-20261108-130621-modulo-catalogo
de: modulo-catalogo
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:06:21-04:00
---
# cadastro_resumo@1: marca, categoria e ean dos produtos (aditivo) - causa da marca/categoria vazias na busca

## Contexto
T-0119: a busca do Catálogo devolve marca e categoria vazias. Causa: `core.cadastro_resumo@1` (modules/core/contracts/consultas.ts, `produtos[]`) não traz marca, categoria nem EAN, e a consulta (modules/core/api/consultas.ts:38) não os seleciona; `core.produto` já tem as colunas `marca`, `categoria` e `ean` (modules/core/db/nuvem.ts:92-96). O Catálogo (modules/catalogo/api/cadastro-core.ts, já no meu lado, com teste) lê os três como opcionais e aparados; sem eles, segue vazio, sem quebrar.

## O que preciso
Mudança ADITIVA (continua @1, campos opcionais), dois pontos no Core:

1) modules/core/contracts/consultas.ts, dentro de `produtos: z.array(z.object({...}))`, depois de `external_id: Texto,`:
```
      /** T-0119 (aditivo): marca, categoria e EAN do cadastro; ausente = emissor antigo. O Catálogo os usa nos chips e na busca (RN-CAT-01). */
      marca: Texto.optional(),
      categoria: Texto.optional(),
      ean: Texto.optional(),
```
2) modules/core/api/consultas.ts:38, no select de core.produto:
`select id, sku, nome, unidade, ativo, external_id, marca, categoria, ean, preco_venda_cents::float8 ...` (o resto da linha igual).
Quem já tem teste de igualdade exata do retorno (consultas.db.test.ts) ganha as três chaves.

## Pronto quando
`core.cadastro_resumo@1` devolve marca, categoria e ean dos produtos; o teste de contrato do Core cobre os campos; me avise para eu conferir a busca no CI (db test do repositório).
