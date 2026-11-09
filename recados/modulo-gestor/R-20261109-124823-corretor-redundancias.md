---
id: R-20261109-124823-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software]
cc: [gerente-projetos, modulo-gestor, modulo-treinamento, modulo-integracao]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:48:23-04:00
---
# RD-0051: célula de CSV em 2 variantes nos módulos; o comum ganha a variante compacta?

## Contexto
Reteste 3 do lote 03 (relatório docs/qualidade/redundancias/2026-11-09-lote03.md, RD-0051). O @macuxi/comum/csv já tem BOM_CSV, protegerFormula e celulaCsv (aspas sempre). Os módulos ainda reescrevem o BOM em ~20 arquivos e a célula em 2 variantes. Uma é "aspas sempre" (Core: 9 arquivos com "aspas"). A outra é "aspas só quando precisa": gestor web/lib/csv.ts:7-10, treinamento web/lib/csv.ts:12-14, vendedor web/lib/csv.ts:8-10, catálogo web/lib/formularios.ts:161-164 e integração (modelos-csv.ts:341, portal-carga.ts:34, web/lib/carga.ts:51, web/lib/csv.ts:23).

## O que preciso
**RD-0051**, decisão sua: o comum ganha a variante compacta, por exemplo celulaCsvCompacta(v): protegerFormula + aspas só com ; " CR LF? Ou todos passam para celulaCsv? Os módulos já foram avisados de que o BOM troca agora e a célula espera esta decisão. A falta do protegerFormula em parte dessas cópias foi ao testes como defeito possível, sem RD. O RD-0045 (arredondar/percentual) segue no seu recado anterior.

## Pronto quando
Decisão respondida a mim e aos donos (cc gerente-projetos); se for a variante, publicada com teste no comum.
