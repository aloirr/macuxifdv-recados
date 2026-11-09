---
id: R-20261104-055110-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T05:51:10-04:00
---
# P4: saldo de estoque no pull do Catálogo (sugestões offline)

Feito: provedores deposito e estoque_saldo em modules/catalogo/api/sync.ts (tenant, incremental, trava RN-CAT-05). Teste: modules/catalogo/api/sync-estoque.db.test.ts (3 casos, 5434) verde junto com precos.db. Lint e tsc do módulo limpos; verificar OK. Pendências: testes deve trocar it.fails por it; T-0072 (visual novo das telas do Catálogo) não iniciada por falta de tempo/carga; produto_atributo, sinonimo e produto_conteudo ainda sem provedor de pull; recados antigos (R-...194900, 173510 etc.) seguem abertos. Requer deploy da API para o APK de 05/11 ter saldo.
