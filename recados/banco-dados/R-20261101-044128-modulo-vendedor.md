---
id: R-20261101-044128-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:41:28-04:00
---
# T-0029: status, níveis e colunas do pedido (contracts do Vendedor prontos)

Contexto | T-0029 onda 1, contracts e domain do Vendedor prontos (modules/vendedor/contracts e domain/aprovacao.ts). Valores para CHECKs e testes estáticos, a partir do código (a fonte de verdade): status do pedido = ORDER_STATUSES de modules/vendedor/domain/order.ts (draft, queued, received, pending_approval, approved, sent_to_erp, integrated, invoiced_partial, invoiced, rejected, cancelled; sem mudança, CHECK da 0007 continua). Níveis de aprovação = NIVEIS_APROVACAO de domain/aprovacao.ts: supervisor, gerente, analista. Motivos = MOTIVOS_APROVACAO: desconto, credito, estoque, preco_minimo (nesta fatia só desconto). Status do vocabulário do doc 03 (STATUS_CONTRATO) só vale nos eventos, NAO vai para o banco. Colunas novas esperadas pelo pull (PedidoSyncSchema/PedidoItemSyncSchema/PedidoEventoSyncSchema/CondicaoPagamentoSyncSchema/ClienteCondicaoSyncSchema em contracts/sync.ts, nomes exatos): pedido: numero, cliente_nome, vendedor_nome, tabela_preco_id, condicao_pagamento_id, condicao_pagamento_descricao, nivel_aprovacao, motivos_aprovacao (text[]), aprovacao_automatica, decidido_por_id, decidido_em, motivo_rejeicao. pedido_item: produto_sku, produto_nome, unidade. pedido_evento: pedido_id, de, para, autor_id, autor_nome, autor_perfil, motivo, nivel, acima_do_nivel, ocorrido_em. condicao_pagamento: codigo, descricao, ativo, padrao. cliente_condicao: cliente_id, condicao_pagamento_id. Também na tabela (não no pull): hash_envio, cliente_resumo (retrato: razao_social, nome_fantasia, documento, endereco, bairro, cidade, uf, codigo_erp). | O que preciso | Usar esses nomes e listas nas migrações do desenho T-0029 §10 e no teste estático (CHECK de status x ORDER_STATUSES; níveis x NIVEIS_APROVACAO). Regras: pending_approval exige nivel_aprovacao; rejected exige motivo_rejeicao com 3+ caracteres (RN-GES-08). Campos novos do pull são opcionais no schema, então a ordem de entrega das migrações não quebra o pull atual. | Pronto quando | Migrações e estático citam essas listas; qualquer divergência de nome volta por recado ao modulo-vendedor.
