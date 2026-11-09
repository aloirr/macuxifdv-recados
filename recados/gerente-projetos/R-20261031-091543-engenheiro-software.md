---
id: R-20261031-091543-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0005
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:15:43-04:00
---
# Entrega: CI (T-0005), compose e outbox (T-0002), revisão T-0010, premissa T-0003

## Contexto
Rodada do engenheiro-software: T-0005 (CI), T-0002 (lado da plataforma), T-0010 (revisão) e T-0003 (premissa). Pedidos encerrados: R-20261031-073127 (banco-dados), R-20261031-113436-2 (alexandre) e R-20261031-124424 (gerente).

## O que fiz
- **T-0005**, .github/workflows/ci.yml:
  - checkout com fetch-depth 0;
  - `node --test scripts/coord-verificar.test.mjs` em todo push e PR;
  - `verificar --base origin/$BASE_REF` só no PR (agente via GITHUB_HEAD_REF);
  - lint, typecheck, test e `pnpm --filter web build`;
  - service `pgvector/pgvector:pg16` com `MACUXI_PG_EXIGIR=1`;
  - `permissions: contents: read`.
- **Achado importante:** o turbo 2, em modo estrito, filtrava `MACUXI_PG_*`. Com isso os testes de banco pulavam no CI mesmo com EXIGIR=1. Corrigi em turbo.json: `test.env`, mais `@macuxi/db#test` sem cache e com repasse de DOCKER_*.
- **T-0002:**
  - docker-compose.yml da raiz só com `name: macuxi` + `include: db/docker-compose.yml`: mesmo contêiner e volume, nunca dois Postgres;
  - atalhos `pnpm db:subir`, `db:derrubar` e `db:migrar`;
  - docs/desenho/T-0002.md com a decisão do compose, o contrato de conexão da API e a PROPOSTA do despacho da outbox: papel `macuxi_worker` sem BYPASSRLS, com política própria em plataforma.evento e grants por coluna; handlers com macuxi_app + comTenant. SECURITY DEFINER fica como plano B.
- **T-0010:**
  - ambiente.ts já estava no main desde 0a3d612;
  - promotor com 143 testes verdes;
  - espelho com `admin` em manifestos-referencia.test.ts e .coord/contratos/modulos.md;
  - revisão sem 🔴, com 2 🟡 e 5 🟢 (R-20261031-090505 ao modulo-promotor).
- **T-0003:** concordo com a premissa. Há 1 🟡: `moduloEstaAtivo` e `clienteNoEscopo` do core duplicam o SDK (R-20261031-090549, ao modulo-core com cópia para você).
- **Extra:** apps/mock-api com testTimeout de 30 s. Um teste estourava os 5 s sob a carga do `pnpm test` paralelo.

## Testes e pendências
- Raiz: `pnpm lint` 0, `pnpm typecheck` 0 e `pnpm test` 0 (16/16 tarefas; db 74 com Postgres real; promotor 143; SDK 78; mock-api 18).
- Simulações locais: `next build` verde; testes do coord 21 verdes e 1 pulado; o verificar de PR simulado acusa os arquivos alheios (saída 1).
- `verificar engenheiro-software` OK.
- Pendente: o run real no GitHub, no primeiro push/PR, com um PR de teste vermelho/verde.
- Pendente: `tests/` do agente testes ainda não está no workspace nem no `pnpm test`; aguardo o pedido dele.
- Pendente: ADR do despacho da outbox, quando o pg-boss entrar.
- Commit: arquivos meus nesta rodada: .github/workflows/ci.yml, turbo.json, package.json, docker-compose.yml, apps/mock-api/package.json, packages/platform-sdk/src/manifestos-referencia.test.ts, .coord/contratos/modulos.md e docs/desenho/T-0002.md.

## Pronto quando
Commit da rodada pelo gerente e primeiro run do CI verde no main.
