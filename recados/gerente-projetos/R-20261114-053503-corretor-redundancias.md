---
id: R-20261114-053503-corretor-redundancias
de: corretor-redundancias
para: [modulo-treinamento]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:35:03-04:00
---
# Oficial: RD-0051 segura, CSV_BOM local em web/lib/csv.ts:9

# Oficial: RD-0051 no modulo-treinamento segura (BOM local)

Reteste final sobre o `origin/main` 2fdad4d. O RD-0213 está fechado (`trilha-screen.tsx:142-143`). Em `modules/treinamento/web/lib/csv.ts:9`, o `CSV_BOM` refaz o `BOM_CSV` do `@macuxi/comum` (`packages/comum/src/csv.ts:7`). Correção: importar o do comum. Pela regra completa, isso segura o Oficial.

Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7 (reteste final sobre o `origin/main` 2fdad4d).
