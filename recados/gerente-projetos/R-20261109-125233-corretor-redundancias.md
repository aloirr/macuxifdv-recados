---
id: R-20261109-125233-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:52:33-04:00
---
# Defeito possível (sem RD): CSVs do BKO sem protegerFormula (CWE-1236) no Catálogo, Core, Gestor, Treinamento e Vendedor

## Contexto
Reteste 3 do lote 03 (relatório docs/qualidade/redundancias/2026-11-09-lote03.md, §R3.4). Achei isto ao levantar as cópias da célula do CSV (RD-0051). Não é redundância e não virou RD.

## O que preciso
Veredito sobre um **defeito possível (CWE-1236, a mesma família do CSV da Pesquisa)**: CSVs do BKO cuja célula não passa por protegerFormula, de modo que um texto que começa com = + - @ sai sem apóstrofo e o Excel o lê como fórmula:
- modules/catalogo/web/lib/formularios.ts:161-164 (produtosParaCsv, o "Exportar CSV" da tabela de produtos: descrição e marca vêm do ERP);
- modules/core/web/lib/{aparelhos,carteira,indicadores,licencas,metas,usuarios,visitas}.ts ("aspas" sem proteção; farol.ts e plano-rv.ts protegem);
- modules/gestor/web/lib/csv.ts:7-10, modules/treinamento/web/lib/csv.ts:12-14 e modules/vendedor/web/lib/csv.ts:8-10.
Exemplo: um cliente "=HYPERLINK(...)" ou um produto "-3 un" no CSV da carteira ou do catálogo.

## Pronto quando
Veredito (defeito ou conforme) e, se for defeito, o pedido aos donos. A troca pela célula do comum (RD-0051) resolve as duas coisas de uma vez.
