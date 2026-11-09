---
id: R-20261103-162548-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T16:25:48-04:00
---
# T-0071 fatia 2: domain e contratos (preço v2, orçamento, sugestões) verdes

# Contexto
T-0071 fatia 2 (domain + contratos), entrega parcial verde. Domain e contratos do Vendedor, testes escritos antes do código.

# O que foi feito
- domain/preco-pedido.ts v2: AjusteItem/AjustePedido (% ou R$), precoUnitarioFinal, equivalenteDoAjuste, precoDoItem (total = final x quantidade), ajusteDoPedidoCents, ratear (maior resto, empate pela menor sequência), totaisDoPedido (+ descontos_cents, desconto_efetivo_exibicao_pct), pctExibicao, limiteDoAjusteDoItem. Compatível com os chamadores atuais: sem `ajuste`, valem desconto_pct/acrescimo_pct. descontoEfetivoAlcadaPct continua nominal (BigInt), agora também com R$ no item e no pedido.
- domain/orcamento.ts: validadeDoOrcamento(momento, dias, fuso) -> {data, ate} por data civil (caso Manaus 2026-11-10 / 2026-11-11T04:00Z), situacaoDoOrcamento com >=, acoesDoOrcamento pela tabela do §1.2 (+pode_editar, pode_pdf; vencido não cancela), SituacaoCliente/motivoSoOrcamento, verificarTipoParaCliente (boolean ou situação; incompleto/bloqueado só orçamento), opcoesDoSalvar, reconferirOrcamento + MudancaNaConversao, pedidoDoOrcamento completo (medida, ajustes, frete, endereço, condição, observação, visita; sem preço) e duplicarDocumento.
- domain/sugestoes.ts: sugestoesEmbalagemMaior, trocarParaEmbalagem, sugestoesClientesParecidos, mesclarSugestoes.
- contracts: ItemPush (desconto/acrescimo_unitario_cents), PedidoPush (desconto/acrescimo_valor_cents, ajuste_em), EditarOrcamentoRequest, OrderListQuery.tipo/situacao, Order/OrderItem opcionais, PedidoSyncSchema/PedidoItemSyncSchema opcionais, recusas RN-VEN-18, ajuste_invalido, ORCAMENTO_ALTERADO. Tudo opcional; o provedor de pull não precisou mudar.
- api/receber.ts: único ajuste, para a nova assinatura de validadeDoOrcamento (momento do aparelho, fuso do tenant; grava `ate`).

# Testes
Novos: preco-pedido-v2, orcamento-v2, sugestoes (inclui o caso §3.2: 39830/1467/384/37979, exibido 4,6%, nivel null; R$ 3,84; 4% -> supervisor; preço alterado; R$ acima do teto). Atualizados citando RN-VEN-02/18: preco-pedido.test (94 -> 93), orcamento.test (>=, vencido não cancela, nova assinatura). Vitest domain+contracts+manifest: 315 verdes. tsc sem erros. Lint rodado nos arquivos tocados.

# Pendências (próxima rodada, depois da 0020)
Fatia 5: repositório SQL da pré-venda (1.4 a), colunas de orçamento e R$ no pull (1.4 b), receber com R$ e embalagens[] (1.4 e, f), rotas PUT/cancelar/lista com tipo (1.4 g), validade_data gravada, PDF do orçamento. verificarConversao ainda devolve RN-VEN-32 (migrar para RN-VEN-18 com a rota). Não rodei testes db (5434) nem toquei no 5432.
