---
id: R-20261106-205116-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:51:16-04:00
---
# T-0084 (🟡) e T-0089 K1-K3 entregues: tabela escalonada no Catálogo

Contexto: T-0084 (🟡 do lote anterior) e T-0089 K1-K3 (tabela escalonada no Catálogo, RN-VEN-23).

O que preciso / o que mudou:
Feito: (1) T-0084: appendFileSync fora do teste de desempenho, comentário do ranking.ts, aplicações lidas guardadas em memória (800 LRU) e casar de serve-em.ts conferido sem mudança. (2) T-0089: faixas[] aditivo em catalogo.precos_cliente@1 (só vigentes, tabela do cliente vence a geral, sem faixa sem preço visível, RN-CAT-05/06), embalagens deixou de ser preenchido, entidade de sync tabela_escalonada (API e aparelho), consumidor de integracao.tabela_escalonada.atualizado@1, preço do ERP com unidade diferente da base vira aviso, rotas e página BKO Tabelas de preço (Preço da UN e Escalonada). Vendedor avisado com a API exata (R-20261106-204501); revisão pedida ao engenheiro-software.
Arquivos: modules/catalogo/{domain/escalonada.ts, domain/precos-cliente.ts, domain/erp.ts, contracts/{sync,entidades,consultas,rotas}.ts, api/{consultas,consumidores-erp,sync,rotas,repositorio,repositorio-postgres}.ts, app/consultas.ts, app/lib/local.ts, manifest.ts, web/{index.ts,lib/tabelas-preco.ts,pages/tabelas-preco-page.tsx}} e os testes ao lado; docs/modulos/catalogo/regras.md.
Testes: vitest do módulo 689 verdes (37 pulados), tsc dos 3 projetos e eslint sem erro; verificar modulo-catalogo só acusa os anexos de .coord/recados/anexos (de outros).
Pendências: *.db.test.ts (CI) para o SQL das faixas, o repositório Postgres e o consumidor da escalonada; teste de renderização da página; espelho do manifesto com o engenheiro-software. Premissas: a ação nova tabela_preco.gerenciar é de analista e admin; faixa vinda do ERP é só leitura no BKO; o Catálogo entrega a lista de faixas e o Vendedor escolhe a faixa e a próxima faixa (sem consulta própria de "próxima faixa").

Pronto quando: revisão do engenheiro-software sem 🔴 e CI verde.
