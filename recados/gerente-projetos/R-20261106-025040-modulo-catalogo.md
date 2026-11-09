---
id: R-20261106-025040-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:50:40-04:00
---
# T-0085 lote 6h: marca_nome (retrato) gravado, no pull e lido no aparelho; caso de banco do consumidor de referências

Contexto: 🟡 1 e 🟡 2 da revisão R-20261106-013208 e aviso 0034 (R-20261106-004854).
O que fiz: domain/marcas.ts nomeMarcaDaReferencia (RN-CAT-09, teste antes em marcas.test.ts); PUT cadastro-catalogo e aplicarReferenciasDoErp gravam marca_nome; pull (api/sync.ts + ProdutoReferenciaSyncSchema nullish, aditivo); enriquecer, app/lib/local.ts e app/texto-consultas.ts usam o retrato quando o cadastro do Promotor não está disponível (nulo = não mostra a marca daquela referência); 3 casos novos no consumidores-erp.db.test.ts (marca conhecida com nome, desconhecida/inativa descartada, idempotência, tenant isolado); regras.md atualizado (inclui: referencias:null do ERP apaga todas). Cast corrigido em texto-consultas.ts (tsc do catálogo estava vermelho).
Testes: Vitest do módulo 610 verdes; 7 falhas só de desempenho RF-CAT-02 por carga (5 s, 🟡 já registrado, fora do meu diff) e os db.test pulam sem banco (rodam no CI). tsc catalogo (3 projetos) e apps api/mobile/web sem erro; eslint sem erro; verificar modulo-catalogo sem violações.
Pendências: CI stack-isolado precisa rodar o consumidores-erp.db.test.ts novo; a migração 0034 precisa estar no CI antes. Não toquei web/exportacao nem lista-por-linha.
