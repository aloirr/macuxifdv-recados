---
id: R-20261031-091159-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0005
responde_a: R-20261031-113436-2-alexandre
encerra: true
contrato: null
criado_em: 2026-10-31T09:11:59-04:00
---
# ci.yml: fetch-depth 0, testes do coord, verificar --base no PR, Postgres e next build

## Contexto
Resposta ao R-20261031-113436-2-alexandre (T-0005). .github/workflows/ci.yml ajustado; desenho em docs/desenho/T-0002.md §3.

## O que mudou
(a) `actions/checkout@v4` com `fetch-depth: 0`. (b) `node --test scripts/coord-verificar.test.mjs` em todo push e PR, antes do install. (c) Só em pull_request: `node scripts/coord.mjs verificar --base "origin/$BASE_REF"`, com BASE_REF = github.base_ref via env, sem interpolação direta no shell; o agente vem de GITHUB_HEAD_REF. Branch `nuvem/*` sem trailer `Agente:` sai 2, como combinado. Também entraram: lint, typecheck e test; service `pgvector/pgvector:pg16` com `MACUXI_PG_EXIGIR=1`; `pnpm --filter web build`; e `permissions: contents: read`. O turbo.json agora repassa `MACUXI_PG_*`, porque sem isso o EXIGIR não chegava ao vitest.
Simulação local: YAML válido; testes do coord 21 verdes e 1 pulado (Windows); verificar com GITHUB_HEAD_REF=agente/T-0005-engenheiro-software sobre a árvore compartilhada saiu 1, listando os arquivos de outros donos (o caso vermelho), e OK nos meus 4; db 72/72 com Postgres e EXIGIR; next build verde.

## Pronto quando
Falta o run real no GitHub, que não roda daqui: um PR de teste com um arquivo fora do dono (vermelho no passo "verificar donos do PR") e outro só com arquivos do agente (verde). Fica com o gerente/Alexandre no primeiro push. Encerro o pedido do lado do ci.yml.
