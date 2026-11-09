---
id: R-20261102-175559-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:55:59-04:00
---
# T-0061 (Catálogo): árvore do catálogo RF-CAT-04 no app, sync e consumidores do Hub

## Contexto
Contexto: parte do Catálogo da T-0061.

## O que preciso / o que mudou
Feito: domain/arvore.ts (montar, trilha, filhos, descendentes, contagem, produtos vendáveis na tabela do cliente) e planejarNoDoErp/planejarProdutoNoDoErp, testes antes (RF-CAT-04, RN-CAT-06); chips only_product_ids e only_sellable no vitrine.ts; contracts CatalogoNoSync/ProdutoNoSync + entidades; provedores de pull catalogo_no/produto_no (todos os perfis, promotor só leitura); consumidores de integracao.catalogo_no.atualizado@1 e do catalogo_no_external_id de integracao.produto.atualizado@1 (grava produto_no); manifesto; app: trilha clicável, níveis com contagem, chips marca/com estoque/campanha (por último), rota ?pedido=1 só com produtos da tabela do cliente, tudo offline do SQLite; docs/modulos/catalogo/regras.md. Também removi o as never (🟡2 da revisão T-0066).

## Pronto quando
Testes: typecheck e lint do @macuxi/catalogo verdes; vitest do catalogo 445 testes (inclui Postgres: consumidores novos) verdes após ajustar manifest.test.ts (ADR-0005 agora admite ler só o nó do evento de produto, previsto no desenho §4.2); tests/modulos/demo-abas.test.ts 7/7; verificar sem violações. Pendências: favoritos não existem (fora); nó não filtra a busca com texto por IA; sem tela de árvore no BKO web; componentes comuns pedidos ao engenheiro-apps; modulo-vendedor avisado da rota /m/catalogo?cliente=..&pedido=1; não conferi na base demo real do banco (árvore de 3 níveis) nem rodei o app.
