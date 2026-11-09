---
id: R-20261102-233158-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:31:58+00:00
---
# T-0061 entregue (nuvem): novo pedido de distribuidora em 3 abas, domain de preço, API, detalhe/PDF e BKO de transportadoras

Contexto: T-0061 na frente nuvem (branch nuvem/T-0061-pedido-3-abas, sem commit/push; o gerente faz). Escopo só modules/vendedor e docs/modulos/vendedor (mais recados e diário).

O que fiz (1 a 5):
1. Domain de preço, testes antes: domain/preco-pedido.ts (+ .test.ts, 46 casos citando RN-VEN-02/03/10/11/15/16/17 e RN-CORE-19): desconto OU acréscimo por item e por pedido, meia para cima por item, CX = UN x fator, desconto efetivo sem frete, caso 30% no item e 5% efetivo sem aprovação (alçada olha só o efetivo; acréscimo nunca aprova), CIF/FOB sem valor, FOB com transportadora cadastrada XOR digitada (nome >= 2, CNPJ válido), endereço de entrega, rotuloMedida, preço mínimo e desconto máximo do item (RN-VEN-11). domain/revalidar-novo-pedido.test.ts cobre a revalidação do servidor.
2. App Campo: new-order-screen.tsx em 3 abas (Itens, Condições, Entrega e resumo) com rodapé fixo de total e alçada; peças locais em app/components/novo-pedido.tsx; lógica pura testada em app/lib/novo-pedido.ts (+ testes) e em app/lib/pedidos.ts. Offline: lê produto_unidade, cliente_endereco, transportadora e tabela_preco das linhas locais; escreve na outbox. Alvos de toque de 48 dp; item em UN ou CX em 2 toques.
3. API: receber.ts grava unidade vendida, fator, acréscimo/desconto do item e do pedido, desconto efetivo, frete CIF/FOB (padrão do tenant frete.modalidade_padrao quando ausente), transportadora (retrato; lista ou digitada) e endereço de entrega (retrato), sempre revalidando pelo domain e idempotente (hash inclui os campos novos). Recusas novas: unidade_invalida, endereco_invalido, transportadora_obrigatoria, transportadora_invalida, desconto_e_acrescimo, preco_abaixo_minimo. vendedor.pedido.aprovado@1 aditivo (api/aprovado-erp.ts, nos dois caminhos de aprovação): quantidade em unidade base + unidade/fator/quantidade_venda/descontos/acréscimos, frete no formato do doc 06 (sem valor) e endereco_entrega com principal. OrderDetail com unit_label, factor, base_quantity, surcharge_pct, effective_discount_pct, freight, delivery_address; pull de pedido/pedido_item com as colunas novas; entidade de sync nova transportadora.
4. Detalhe: Campo e Gestão usam a mesma tela (order-detail-screen.tsx) com medida, desconto/acréscimo, desconto efetivo, frete, transportadora e endereço; BKO na gaveta do pedido (order-drawer.tsx); PDFs (domain/pdf-pedido.ts) com coluna Medida, "Frete: CIF – por conta da empresa" / "Frete: FOB – por conta do cliente · transportadora (CNPJ ...)", endereço, desconto por item e efetivo na versão interna (versão cliente segue sem %).
5. BKO: página Transportadoras (web/pages/transportadoras-page.tsx, menu Cadastros): lista com busca/situação na URL, CSV, cadastrar/editar/inativar (admin, analista, gerente), digitadas pelos vendedores para cadastrar (item 3 da fila de corte, feito) e padrão do frete do tenant (CIF) em leitura. API: GET/POST /transportadoras, PUT|PATCH /transportadoras/:id, GET /transportadoras/digitadas, GET /frete/parametros; ações transportadora.ver e transportadora.gerenciar no manifesto; multi-tenant por RLS, auditado, CNPJ com dígito verificador e único por tenant.

Testes: vendedor 470/470 (com Postgres nativo 16, MACUXI_PG_EXIGIR=1), novo api/novo-pedido.db.test.ts (22) cobre UN/CX, efetivo x alçada, frete, transportadora, endereço, evento ao ERP, detalhe, pull, CRUD multi-tenant, padrão do frete e promotor recusado (RN-PRO-01); api/leitura.test.ts cobre perfis e licença das rotas novas. Raiz: pnpm lint 0 erros, pnpm typecheck 19/19, pnpm test: tudo verde exceto 2 itens que NÃO são do Vendedor e são do ambiente local sem Docker: @macuxi/db conformidade "imagem tem pgvector" (meu Postgres nativo não tem pgvector) e, numa das duas rodadas, api/test/banco.test.ts (transação longa) que falhou sob carga e passa isolado. tests/ (418+ testes) verde. verificar modulo-vendedor sem violações.

Cortado / não feito: (1) transportadora vinda do ERP (o external_id já é respeitado, falta a ingestão do Hub); (2) preço próprio da CX (hoje CX = UN x fator; o domain já aceita o preço próprio); (4) chip "campanha" na nova tela. Edição do padrão do frete pelo BKO: NÃO feita, porque gravar plataforma.parametro é só do Core (teste S0-014); a página mostra o padrão em leitura. Trava RN-VEN-11 na API/aparelho: domain pronto, mas falta preco_venda_cents/desconto_maximo_pct em core.cadastro_resumo@1 e no ProdutoSync. Árvore/trilha do Catálogo (T-0052) e o slot produto.acoes ficam com o Catálogo; o seletor é a busca local.

Recados enviados: modulo-core (preco_venda_cents/desconto_maximo_pct; rota do Core para editar o padrão do frete), modulo-catalogo (tabela_preco_nome em catalogo.precos_cliente@1 para o price_table_name do BKO/PDF), engenheiro-apps (aviso: componentes locais candidatos a packages/ui).

Pendências fora desta tarefa que continuam abertas na caixa: T-0065 (pedido_numero nos eventos, timers), T-0052/T-0055 (slots produto.acoes e pedido.criar_em_nome), T-0026 (bugs de campo).

Premissa: a regra 7 foi mantida como está no código (promotor sem criar/editar/cancelar/excluir/aprovar, sem página de pedido no app e sem as ações novas); a leitura do pedido pelo promotor (pedido.ver, escopo carteira) já existia por decisão O-3 e não foi alterada.

Pronto quando: o gerente fizer o commit da rodada na branch e rodar os checks da raiz com Docker (pgvector).
