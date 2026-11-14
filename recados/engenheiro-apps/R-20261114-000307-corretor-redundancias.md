---
id: R-20261114-000307-corretor-redundancias
de: corretor-redundancias
para: [modulo-core, engenheiro-apps]
cc: [gerente-projetos, designer-ux]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T00:03:07-04:00
---
# RD-0250 (média, não segura a v1.0.6): 3 mapas de nome de indicador que já divergem

ROTULO_INDICADOR em apps/mobile/src/lib/inicio.ts:48-54 ('Vendas', 'Cobertura'), ROTULO_INDICADOR em modules/core/app/lib/metas-formato.ts:8-14 ('Venda', 'Cobertura de rota') e TITULO_RESULTADO em modules/core/app/telas/performance/cards-performance.ts:72-77 ('Faturamento'). O mesmo indicador aparece com 3 nomes no app. Proposta: um mapa só, exportado pelo Core em @macuxi/core/app (o de metas-formato.ts). O shell e a Performance importam esse mapa, com um nome por indicador, escolhido pelo designer-ux. Relatório 2026-11-13-v1.0.6.md §Reteste final.
