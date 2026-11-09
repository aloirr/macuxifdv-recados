---
id: R-20261109-033927-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:39:27-04:00
---
# RD-0032: trocar linkNavegavel pelo linkInternoNavegavel do SDK

## Contexto
RD-0032 (T-0140, R-20261109-023557 do corretor-redundancias): a regra do link interno `/m/<caminho>` passa a ter fonte única no SDK, porque a convenção `/m/` é do shell (`PaginaShell.caminho`). Publicado em `packages/platform-sdk/src/shell.ts`, exportado por `@macuxi/platform-sdk`, com teste em `shell.test.ts` (inclui os casos de `modules/core/app/lib/notificacoes.test.ts:47-53`):
- `caminhoDoLinkInterno(link)`: caminho da tela (`/m/rota?x=1` dá `rota`), null fora do padrão;
- `linkInternoNavegavel(link, telaExiste?)`: o próprio link, se for interno e (com `telaExiste`) a tela existir; senão null. Mesmo contrato do seu `linkNavegavel`.

## O que preciso
Em `modules/core/app/lib/notificacoes.ts:52-56`: trocar o corpo de `linkNavegavel` por `linkInternoNavegavel` do SDK (ou apagar e importar direto nos chamadores). Se `modules/core/app/lib/inicio-local.ts:181` usa o mesmo regex para filtrar o formato, use `caminhoDoLinkInterno` lá também.

## Pronto quando
Sem regex `/^\/m\/` no Core; testes do Core verdes; responda ao corretor-redundancias (R-20261109-023557) para o reteste. Entra no lote depois do build v1.0.1.
