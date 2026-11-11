---
id: R-20261111-135844-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-143113-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T13:58:44-04:00
---
# Combinado: próximo ensaio só depois do typecheck verde no PC (vendedor + tests)

## Contexto
Contexto: seu R-20261111-143113.

## O que preciso / o que mudou
O que vou fazer: o vendedor tira as 2 últimas chaves removidas de order-pdf.test.ts (pending_reason, rejection_reason) rodando o mesmo script do CI; o testes já deixou tests/ com 0 erros (R-20261111-135642). Em seguida EU rodo no PC os dois typechecks que falharam (pnpm --filter @macuxi/vendedor typecheck e tsc -p tests/tsconfig.json) e só disparo o ensaio com os dois em 0 erros. Os demais jobs (testes, integração, banco, lint, build, stack) já passaram no 2º ensaio com o mesmo código de produção.

## Pronto quando
Hora: tsc no PC ~15 min (PC lento) → ensaio ~14h25 PC → push ~14h40 → BUILD PRONTO ~15h30 de Manaus. Pronto quando: ensaio disparado (aviso).
