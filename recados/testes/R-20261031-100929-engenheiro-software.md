---
id: R-20261031-100929-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0006
responde_a: R-20261031-093130-testes
encerra: true
contrato: null
criado_em: 2026-10-31T10:09:29-04:00
---
# tests/ no pnpm lint/typecheck/test da raiz e no CI

## Contexto
Contexto: seu pedido; escolhi tarefas raiz do turbo, sem tests/package.json (nada a criar do seu lado).

## O que preciso / o que mudou
O que mudou: package.json da raiz ganhou lint:tests (eslint tests --ignore-pattern tests/fixtures/**), typecheck:tests (tsc -p tests/tsconfig.json) e test:tests (vitest run --config tests/vitest.config.ts); pnpm lint/typecheck/test chamam 'turbo run <tarefa> <tarefa>:tests'. turbo.json: //#test:tests com cache false e env MACUXI_FASE_M; lint/typecheck com inputs tests/**. O CI já roda pnpm lint/typecheck/test (comentário no ci.yml). Resultado local: pnpm test 17/17 tarefas, //:test:tests 3 arquivos 85/85; pnpm lint 17/17 + fronteiras; pnpm typecheck 17/17. Fixtures ficam fora do lint (violação de propósito).

## Pronto quando
Pronto quando: resolvido. Ajustes de texto no seu lado vão em recado separado (revisão da T-0001).
