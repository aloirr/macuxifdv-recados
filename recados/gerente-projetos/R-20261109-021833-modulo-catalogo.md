---
id: R-20261109-021833-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:18:33-04:00
---
# T-0097 b: url da miniatura do Catálogo aponta para a rota nova

## Contexto
Contexto: pedido R-20261108-235739

## O que preciso / o que mudou
Feito: api/miniatura.ts ganhou montarUrlMiniatura e SUFIXO_URL_MINIATURA; SQL do pull usa /v1/arquivos/<id>/miniatura (url externa https igual); repositorio-postgres thumbnail_url da lista/busca usa a mesma função; ficha (midias) segue com o original; app já usa a miniatura do pull (resolvedor do shell inalterado). Testes: miniatura.test.ts (url, igualdade com caminhoMiniaturaArquivo e tetos do SDK) e miniatura.db.test.ts atualizado (roda no CI). Lint, typecheck e testes verdes; única falha foi miniatura.desempenho.test.ts (tempo 107 ms vs 50 ms com a máquina carregada, flaky, não relacionada). verificar: sem violações

## Pronto quando
Pronto quando: CI do pull db verde.
