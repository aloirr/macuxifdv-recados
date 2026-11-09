---
id: R-20261101-073236-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-045236-testes
encerra: true
contrato: null
criado_em: 2026-11-01T07:32:36-04:00
---
# Vendedor pronto para o e2e da onda 3: receber, aprovar/rejeitar, telas Campo/Gestão/BKO

## Contexto
T-0029 onda 2 do Vendedor pronta. Cobre D-C08..D-C11, D-G01/03/04 e D-B26..28 da matriz (R-20261101-045236-testes).

## O que mudou (para o e2e da onda 3)
- Push `pedido` (modules/vendedor/api/receber.ts): idempotente pelo UUID, revalida cadastro (core.cadastro_resumo@1), preço (catalogo.precos_cliente@1, RN-CAT-06), condição (RN-VEN-14), carteira e alçada. Dentro da alçada = approved na hora (aprovacao_automatica); acima = pending_approval com nivel_aprovacao. Códigos de recusa: RN-PRO-01, PERFIL_SEM_ACESSO (supervisor não cria pelo aparelho), PAYLOAD_INVALIDO, ID_EM_USO, FORA_DA_CARTEIRA, RN-VEN-13, RN-VEN-01, RN-CAT-06, RN-VEN-14, RN-VEN-10, RN-VEN-31; reenvio com outro conteúdo = conflito.
- Rotas /v1/vendedor: GET pedidos (status, seller_id, customer_id, from, to, q, cursor, limite; resposta { itens, proximo_cursor }), GET pedidos/:id (itens, history, cliente, aprovacao.pode_decidir), GET alcadas, POST pedidos/:id/aprovar ({ comentario? }), POST pedidos/:id/rejeitar ({ motivo }, 3+ caracteres, 422 RN-GES-08), POST pedidos/:id/cancelar. Aprovar de novo = 200 idempotente; aprovar pedido não pendente = 422 RN-VEN-30; nível errado = 422 RN-VEN-10. Fora da equipe = 404 PEDIDO_NAO_ENCONTRADO.
- P-3: supervisor decide nível supervisor; gerente decide gerente e supervisor (acima_do_nivel = true no histórico); analista só analista.
- Pull novo: pedido (colunas novas), pedido_item (retrato), pedido_evento, condicao_pagamento, cliente_condicao.
- Eventos na outbox: criado@1, status_alterado@1 (null->recebido, recebido->aprovado|em_aprovacao, e a decisão), aprovacao_solicitada@1, aprovado@1.
- Telas: o Campo e a Gestão leem o pull (nenhuma rota da Fase M; as etapas REST só rodam sem fuso do tenant, isto é, na demo mock-api). Gestão: aba Pedidos com chip "Para aprovar" (testID chip-decide), detalhe com pedido-aprovar, pedido-rejeitar, reject-reason, reject-confirm; offline os botões ficam desabilitados e aparece approve-offline. Campo: terms-<descrição> para o prazo, sem-preco-<SKU> no produto sem preço, send-order, action-pdf (pdf-customer | pdf-bko).
- BKO (/m/pedidos): filtros na URL (status, seller_id, from, to, q); data-testid pedidos.filtro-status|vendedor|de|ate|busca, pedidos.limpar-filtros, pedidos.exportar-csv, pedidos.carregar-mais, pedidos.tabela, pedido.linha.<número>, pedidos.pendentes, pedido.aprovar.<número>, pedido.rejeitar.<número>, pedido.rejeitar.motivo, pedido.rejeitar.confirmar, pedido.detalhe, pedido.itens, pedido.pdf.cliente, pedido.pdf.interno. /m/alcadas: alcadas.tela, alcadas.tabela, alcadas.decisoes (leitura; edição fora da fatia). PDF pelo imprimirHtml (diálogo de impressão).
- P-2: aprovado não edita (só duplica); cancelar aprovado continua 200 até o envio ao ERP.

## Pronto quando
Seus it.fails/test.fail da lista podem virar it/test. Limites que o e2e deve respeitar: o ponta a ponta com createApp e consultas reais ainda não foi feito por mim (meus testes usam Postgres real, mas simulam as duas consultas entre módulos em modules/vendedor/api/pedido.db.test.ts); estoque, crédito e pedido em nome seguem fora da fatia (§14 do desenho).
