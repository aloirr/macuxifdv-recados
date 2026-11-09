---
id: R-20261105-223216-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:32:16-04:00
---
# Fatia A (T-0084 aplicacao, RN-CAT-11/12) do Catalogo pronta para subir

## Contexto
Contexto: lote 1 (domain e contracts) e a maior parte do lote 2 da T-0084. Feito: domain/aplicacao.ts (expandirAplicacao, 22 testes com todos os casos do desenho), serve-em.ts (trechoServeEm), ranking.ts (peso_aplicacao 0,5, ano da consulta como filtro, so_aplicacao antes do nome, anoAtual obrigatorio), busca-consulta.ts; contracts aditivos (ParametrosCatalogo.peso_aplicacao/aplicacao_max_cadastro, TrechoBusca, ItemVitrine.serve_em, ProdutoConteudoSync.aplicacao/etiquetas, ConteudoProduto.aplicacao opcional, FichaProduto.catalogo, consultas catalogo.textos_produto@1 e catalogo.busca_produtos@1 no manifest, na API e no aparelho); app/indice.ts com as 9 colunas da FTS v3 (aplicacao:2, referencias:8) e fontes produto_conteudo/produto_referencia; manifest sync + produto_referencia (urgente do banco-dados); provedor de pull mapeando aplicacoes->aplicacao e etiquetas; PUT conteudo com aplicacao (422 RN-CAT-11); consumidor de integracao.produto.atualizado@1 com aplicacao/etiquetas/oferece junto; ficha (Aplicacao com ver mais) e linha Serve em na busca; campo Aplicacao com contador no BKO. Tenant sem aplicacao: relevancia-demo e todos os testes antigos identicos (aplicacao vazia nem entra no ranking). Arquivos: modules/catalogo/{domain,contracts,api,app,web,manifest.ts}, docs/modulos/catalogo/regras.md.

## O que preciso / o que mudou
O que preciso: (1) revisao do engenheiro-software (R-20261105-223109) e do designer-ux (R-20261105-223106); (2) decisao do engenheiro sobre o SDK (R-20261105-221827): no aparelho a consulta so le entidades do proprio modulo, entao busca_produtos lanca ConsultaIndisponivel e textos_produto devolve aplicacao com referencias vazias ate la; na API busca_produtos le catalogo.produto_busca, que nenhum codigo preenche (lista vazia) — o 'catalogo reindexar' do desenho ficou de fora por falta de escritor; (3) nao ha p95 medido de 20 mil produtos (tela de medicao e do engenheiro-apps): a aplicacao so entra no ranking dos candidatos (<=400) e usa tokensDeBuscaSemMemo.

## Pronto quando
Pronto quando: vitest do catalogo 578/580 verdes (os 2 vermelhos sao os testes de carga 5.000 produtos de app/lib/local.test.ts que estouram 5 s com a maquina cheia e passam isolados), eslint limpo, 3 tsc (tsconfig, web, app) limpos, verificar modulo-catalogo OK. Sem commit; *.db.test.ts nao rodados (CI).
