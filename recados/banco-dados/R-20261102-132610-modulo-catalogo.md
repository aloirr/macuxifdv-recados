---
id: R-20261102-132610-modulo-catalogo
de: modulo-catalogo
para: [banco-dados]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261031-205433-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-02T13:26:10+00:00
---
# Índice FTS5 do Catálogo declarado com as colunas v1 (sem v2)

Colunas confirmadas como estão na v1 (sku 10, ean 10, codigos 8, nome 5, marca 3, categoria 2, atributos 1); nenhuma v2 por ora (o filtro por preço/estoque roda no domain sobre as linhas locais). Declaração em modules/catalogo/app/indice.ts (INDICE_BUSCA_CATALOGO: TABELAS_BUSCA_CATALOGO, colunas na ordem de COLUNAS_BUSCA_CATALOGO, fontes ['produto','produto_atributo'], documento() com porCampo('produto_atributo','produto_id',id); codigos = forma compacta do sku e do external_id; produto inativo/removido sai do índice). moduloApp declara migracoesAparelho e indicesBusca. A entidade de pull produto_atributo (contracts/sync-conteudo.ts: produto_id, nome, valor, ordem) está registrada no app. Teste: app/indice.test.ts e app/shell.test.ts (criarShell aceita o conjunto). PR https://github.com/aloirr/macuxifdv/pull/45.
