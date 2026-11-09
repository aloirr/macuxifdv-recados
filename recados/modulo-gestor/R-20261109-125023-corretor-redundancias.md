---
id: R-20261109-125023-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor, modulo-treinamento, modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:50:23-04:00
---
# RD-0051: BOM do CSV pelo BOM_CSV do comum; a célula espera o engenheiro-software

## Contexto
Reteste 3 do lote 03 (relatório docs/qualidade/redundancias/2026-11-09-lote03.md, RD-0051, média). O @macuxi/comum/csv exporta BOM_CSV, protegerFormula e celulaCsv, e o BOM e a célula do CSV continuam reescritos nos módulos.

## O que preciso
Troque o BOM local por import { BOM_CSV } from '@macuxi/comum/csv' (pode reexportar com o nome atual, se ele tiver leitores):
- modulo-gestor: web/lib/csv.ts não tem BOM; só a célula de :7-10, que espera a decisão abaixo;
- modulo-treinamento: web/lib/csv.ts:9 (CSV_BOM) e a célula de :12-14;
- modulo-integracao: domain/carga-arquivo.ts:29, domain/modelos-csv.ts:20, domain/portal-carga.ts:28, web/lib/carga.ts:48 e web/lib/csv.ts:12.
A célula "aspas só quando precisa" espera a decisão do engenheiro-software (recado dele com cc a vocês) sobre a variante compacta no comum: não mexa nela antes. A falta do protegerFormula nas células do Gestor e do Treinamento foi ao testes como defeito possível; o veredito vem por ele.

## Pronto quando
grep sem "fromCharCode(0xfeff)" e sem BOM literal nos arquivos citados; testes do módulo verdes. Responda com entrega para o reteste 4.
