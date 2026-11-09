---
id: R-20261101-044857-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:48:57-04:00
---
# T-0029 onda 1 (Vendedor): contracts e domain prontos

Contexto | T-0029 onda 1 (só contracts e domain; sem banco, API e telas). Premissas P-1 a P-4 e P-6 aplicadas. | Entrega | contracts: PedidoPush (campos novos opcionais, max 200 itens), AprovarPedidoRequest/RejeitarPedidoRequest (motivo de 3+ caracteres é regra do domínio, 422 RN-GES-08, como no desenho §3.3), OrderDetail com cliente e aprovacao (opcionais), Order.branch_id/branch_name nuláveis (única mudança de tipo; typecheck do módulo ok), OrderListQuery com q/cursor/limite, NivelAprovacao/MotivoAprovacao/STATUS_CONTRATO, eventos criado/status_alterado/aprovacao_solicitada/aprovado @1 (sem dado pessoal), linhas do pull com colunas novas opcionais (pedido, pedido_item) e novos schemas pedido_evento, condicao_pagamento, cliente_condicao. domain/aprovacao.ts: statusDoContrato, nivelDaAlcada, politicaDosParametros, textoPendencia, dataDoPreco (7 dias, P-4), resultadoDoRecebimento, revalidarPedido (promotor 403, perfil, carteira, RN-CAT-06, alçada, total do servidor), quemDecide (P-3), decidirAprovacao (idempotente), montarPedidoAprovado. order.ts: validateOrder aceita credit null; received→approved e approved→cancelled; approved editável/cancelável. domain/pdf-pedido.ts (gerador movido da Fase M, sem dependência de UI; app/lib/order-pdf.ts reexporta) + pdfDoPedido(detalhe). Testes: 127 verdes no módulo (Fase M intactos), lint e typecheck verdes, fronteiras 0 erros, verificar sem violação. Aviso enviado ao banco-dados (R-20261101-044128). | Pendências | Onda 2: receber, rotas, provedores, telas, páginas do BKO e manifesto (perfis/apps.gestao/usaConsultas dependem de E1). Cadastro (RN-VEN-13/01) e condição (RN-VEN-14) ficam para o receber, que depende das consultas. A formatação de data do PDF é local ao domínio até o E5 (comum).
