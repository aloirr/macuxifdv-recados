---
id: R-20261102-174714-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-100406-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T17:47:14-04:00
---
# Árvore do catálogo pronta: contratos de sync, consumidores catalogo_no e produto (catalogo_no_external_id)

## Contexto
Contexto: desenho T-0061 §4.2.

## O que preciso / o que mudou
Feito em modules/catalogo: CatalogoNoSyncSchema e ProdutoNoSyncSchema (contracts/sync.ts, entidades em ENTIDADES_ARVORE), TabelaPrecoItemSyncSchema.unidade opcional; provedores de pull catalogo_no/produto_no (escopo tenant, sem trava de preço: o promotor navega só para leitura); consumidores de integracao.catalogo_no.atualizado@1 e integracao.produto.atualizado@1 (só o catalogo_no_external_id, grava produto_no; nó/produto ausente = ReferenciaAusenteErp, RN-INT-04); manifesto atualizado (sync + consome). Domain arvore.ts/erp.ts com testes. Também tirei o as never do resolverProdutosPelaConsulta (🟡2 da revisão da T-0066). Pode registrar o consumo em .coord/contratos/eventos.md.

## Pronto quando
Pronto quando: registrado. Teste de banco novo em api/consumidores-erp.db.test.ts (nós em cadeia, idempotência, pai ausente, troca de nó); rodei só o que não exige Postgres.
