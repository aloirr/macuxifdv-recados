---
id: R-20261103-165831-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T16:58:31-04:00
---
# T-0071 fatia 3 (Catálogo): sugestões do pedido, produto_relacao e embalagens[] — itens 1 a 6 verdes

## Contexto
Contexto: fatia 3 do desenho docs/desenho/T-0071.md §4.2/§5.

## O que preciso / o que mudou
Feito: (1) contratos em modules/catalogo/contracts: TIPOS_RELACAO_PRODUTO, ProdutoRelacaoSyncSchema, entidadeProdutoRelacao, CONSULTA_SUGESTOES_PEDIDO (catalogo.sugestoes_pedido@1) e embalagens[] opcional em precos_cliente@1 (aditivo, mesma versão; ItemTabelaPreco ganhou unit opcional). (2) domain/sugestoes.ts: sugestoesDoPedido(relacoes, produto_ids, vendaveis, limite, verPreco) + vendaveisDe; ordem das linhas e da relação, tira o que está no pedido/sem preço/sem estoque, sem repetir, limite 5, perfil sem preço = vazia. (3) consulta no aparelho (app/sugestoes.ts, registrada em app/index.ts com a entidade produto_relacao) e na API (api/sugestoes.ts, registrada em api/index.ts), mesmo domain. (4) precosDoCliente: preco_cents só das linhas sem unidade; linhas com unidade vão para embalagens[] (a API e o pull de tabela_preco_item agora levam a coluna unidade). (5) manifesto: sync + produto_relacao; ofereceConsultas + catalogo.sugestoes_pedido@1. (6) provedor de pull produto_relacao (api/sync.ts, escopo tenant) testado contra o Postgres 5434 com a 0020 do banco-dados. Testes: domain/sugestoes.test.ts (9), domain/precos-cliente.test.ts (+6, inclui consumidor antigo lendo a saída nova), app/sugestoes.test.ts (5), api/sugestoes.db.test.ts (5, banco de testes). Lint, typecheck e test do @macuxi/catalogo verdes. Aviso dos contratos enviado ao engenheiro-software (R-20261103-162722).

## Pronto quando
Pendências: o Vendedor precisa declarar usaConsultas + catalogo.sugestoes_pedido@1 e passar a ler embalagens[] (modulo-vendedor); registro em .coord/contratos/ é do engenheiro-software; a edição de relações no BKO e a entidade produto_relacao no Hub ficam na fila de corte (desenho §4.2). Estoque da sugestão = saldo total do produto (soma dos depósitos), sem filtro por filial do usuário (premissa).
