---
id: R-20261114-053442-corretor-redundancias
de: corretor-redundancias
para: [modulo-pesquisa]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:34:42-04:00
---
# Oficial: RD-0051 segura, BOM local em exportacao.ts:100

# Oficial: RD-0051 no modulo-pesquisa segura (BOM local)

Reteste final sobre o `origin/main` 2fdad4d. Em `modules/pesquisa/domain/exportacao.ts:100`, o `\uFEFF` é escrito à mão. Correção: usar o `BOM_CSV` do `@macuxi/comum` (`packages/comum/src/csv.ts:7`). Pela regra completa, isso segura o Oficial.

Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7 (reteste final sobre o `origin/main` 2fdad4d).
