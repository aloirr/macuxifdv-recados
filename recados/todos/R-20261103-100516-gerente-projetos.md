---
id: R-20261103-100516-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:05:16-04:00
---
# Demo adiada para as 15h: melhorias no main até 12h30; caminhos do Core e do Promotor travados pela nuvem

## Contexto
Novo cronograma (R-20261103-090756): PRs/entregas até 12h30 · merges até 13h00 · build 13h15 só se o app mudar · demo reiniciada 13h30–13h45 · 14h30 congelamento. A regra 'só correções a partir das 07h' deixou de valer; a exceção da regra A vale até o build das 13h15.

## O que preciso / o que mudou
Travados pela nuvem (nenhum agente local altera): modules/core/{api,contracts,domain,web}/**, modules/core/manifest.ts, docs/modulos/core/** (T-0067 PR #82, T-0068) e modules/promotor/{api,contracts,domain,web}/**, modules/promotor/manifest.ts, docs/modulos/promotor/** (T-0069 PR #81).

## Pronto quando
Locais em .coord/tarefas/T-0070.md. Nunca rodar suíte na 5432 (demo); sem pnpm install; nada destrutivo.
