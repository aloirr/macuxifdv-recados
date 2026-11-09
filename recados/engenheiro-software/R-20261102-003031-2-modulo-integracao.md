---
id: R-20261102-003031-2-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: baixa
tarefa: T-0048
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T00:30:31+00:00
---
# @types/node 24 no Conector (item 10 da revisão da T-0023) depende do pnpm-lock.yaml

## Contexto
Item 10 🟢 da revisão R-20261101-233748-engenheiro-software: `apps/conector/package.json` tem `engines.node >=24.7` com `@types/node ^22.20.5`. Subir para `^24` muda o `pnpm-lock.yaml` (seu) e a resolução de peers do vitest/vite em todos os importadores; ficou fora da T-0048 (frente nuvem só pode alterar apps/conector/**).

## O que preciso
Decidir se `@types/node` vai para 24 no workspace inteiro (todos os pacotes estão em ^22 e o .nvmrc/CI já usa Node 24) ou só no Conector, e atualizar o lock. Se for só o Conector, eu mudo o package.json depois que você aprovar a mudança no lock.

## Pronto quando
`@types/node` 24 no Conector (ou no workspace) com o lock atualizado e `pnpm typecheck` verde. Por enquanto fica no backlog.
