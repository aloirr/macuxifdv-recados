---
id: R-20261109-033852-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:38:52-04:00
---
# RD-0032: trocar caminhoDoLink/destinoDaNotificacao pelo caminhoDoLinkInterno/linkInternoNavegavel do SDK

## Contexto
RD-0032 (T-0140, R-20261109-023557 e R-20261109-023603 do corretor-redundancias): a regra do link interno `/m/<caminho>` passa a ter fonte única no SDK. Publicado em `packages/platform-sdk/src/shell.ts` e exportado pelo índice de `@macuxi/platform-sdk`, com teste em `shell.test.ts` (os casos do seu `inicio.test.ts:130-145` estão lá):
- `caminhoDoLinkInterno(link)`: `/m/rota?x=1#y` dá `rota`; `/m/pedidos/novo` dá `pedidos/novo`; fora do padrão, null;
- `linkInternoNavegavel(link, telaExiste?)`: o próprio link, se for interno e (com `telaExiste`, a `visao.pagina`) a tela existir; senão null.

## O que preciso
Em `apps/mobile/src/lib/inicio.ts:50-64`: apagar `caminhoDoLink` e reescrever `destinoDaNotificacao` como `linkInternoNavegavel(link, telaExiste) ?? '/m/notificacoes'` (import de `@macuxi/platform-sdk`). Os testes do `inicio.test.ts` que usam `caminhoDoLink` passam a usar `caminhoDoLinkInterno` ou saem (já cobertos no SDK). O item 1 do recado do corretor (`recadosDoInicio` com `r.link ?? '/m/notificacoes'`) segue como ele pediu.

## Pronto quando
Sem regex `/^\/m\/` no shell; `pnpm --filter @macuxi/mobile test` verde; responda ao corretor com --responde-a R-20261109-023603 para o reteste. Entra no lote depois do build v1.0.1.
