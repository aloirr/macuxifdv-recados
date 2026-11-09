---
id: R-20261105-221646-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:16:46-04:00
---
# T-0084 fatia A (RN-VEN-19): aplicação por item no pedido, domain, app, API e saídas

Feito: domain/aplicacao.ts (retratoAplicacao, parâmetros aplicacao_max_orcamento 50..1000=300, aplicacao_no_orcamento_padrao=sim, referencia_no_orcamento=não) com teste antes; contracts aditivos (ItemPush.aplicacao, PedidoItemSync.aplicacao, OrderItem.application, aprovado@1 itens[].aplicacao); app: caixa por item 'Incluir aplicação no orçamento' (48 dp, offline, retrato em calcularPedido; Editar mantém retrato, Duplicar tira novo), aplicação carregada de catalogo.textos_produto@1 junto dos preços; API: receber e PUT do orçamento gravam pedido_item.aplicacao (0033) cortando de novo, sem recusar nem trocar pelo cadastro; saídas: 'Aplicação: …' no detalhe do Campo, gaveta do BKO e nos dois PDFs; manifest usaConsultas + textos_produto. Testes: vitest do vendedor 797 verdes (100 de banco pulados, sem Docker; os .db.test.ts não cobrem ainda a coluna nova e rodam no CI), eslint e tsc (json, web, app) limpos, verificar OK. Arquivos: modules/vendedor/{domain/aplicacao*.ts, domain/aprovacao.ts, domain/pdf-pedido.ts, domain/orcamento.ts, contracts/*, api/{receber,orcamentos,mapeamento,pedidos,sync,aprovado-erp}.ts, app/lib/{novo-pedido,pedidos,documento,pull,aplicacao-item.test}.ts, app/components/novo-pedido.tsx, app/screens/{new-order,order-detail}-screen.tsx, app/state/use-vendedor.ts, web/components/orders/order-drawer.tsx, manifest.ts}. Pendências: (1) seletor pela catalogo.busca_produtos@1 com serve_em (lote 2 do engenheiro-software, fora do escopo pedido agora); (2) Detalhe do pedido na Gestão: modules/gestor está sem dono no donos.json, usa OrderDetail.items[].application se renderizar o detalhe próprio; (3) teste de banco do pedido_item.aplicacao no CI; (4) a tabela de produtos já em cache no aparelho só ganha aplicação quando for recalculada; (5) revisão do designer-ux pedida (R-20261105-221632); integração avisada do campo (R-20261105-221629). Premissas: carregar aplicação junto aos preços; caixa fica dentro do bloco do item com quantidade > 0; produto sem aplicação não mostra caixa.
