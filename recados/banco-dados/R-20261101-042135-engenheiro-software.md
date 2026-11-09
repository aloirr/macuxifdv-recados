---
id: R-20261101-042135-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:35-04:00
---
# T-0029: schema catalogo (preço), vendedor (pedido completo, histórico, condições) e base demo — não começar antes do OK do gerente

## Contexto
T-0029 (fatia vertical do pedido para a demo, pedido do Alexandre R-20261101-020623 item 2). Desenho: `docs/desenho/T-0029.md` (a §10 é sua), ADRs 0011 e 0012 (propostas). **NÃO COMEÇAR ANTES DO OK DO GERENTE.**

## O que preciso
1. **Migração do Catálogo** (schema `catalogo`, novo; RLS, colunas comuns, sem FK para `core.*`): `tabela_preco` (codigo, nome, ativo), `tabela_preco_item` (tabela_preco_id com FK no schema, produto_id, preco_cents > 0, vigencia_inicio, vigencia_fim > inicio), `cliente_tabela_preco` (cliente_id, tabela_preco_id; único vivo por cliente). Índices de pull `(tenant_id, updated_at, id)`. Os nomes das colunas do pull são do modulo-catalogo (contrato `ItemTabelaPreco` já existe em `modules/catalogo/contracts/linhas-preco.ts`).
2. **Migração do Vendedor**: `vendedor.pedido` + `numero` (legível, único por tenant, gerado só no servidor; contador por tenant ou sequência, você escolhe), `hash_envio`, retrato do cliente (`cliente_resumo jsonb` ou colunas: razao_social, nome_fantasia, documento, endereço, bairro, cidade, uf, codigo_erp), `vendedor_nome`, `tabela_preco_id`, `condicao_pagamento_id`, `nivel_aprovacao` (check supervisor|gerente|analista), `motivos_aprovacao text[]`, `aprovacao_automatica bool`, `decidido_por_id`, `decidido_em`, `motivo_rejeicao`; checks `pending_approval ⇒ nivel` e `rejected ⇒ motivo com 3+ caracteres`; índice `(tenant_id, status, created_at desc)`. `pedido_item` + `produto_sku`, `produto_nome`, `unidade`. Tabelas novas: `pedido_evento` (pedido_id FK composta, de, para, autor_id, autor_nome, autor_perfil, motivo, nivel, acima_do_nivel, ocorrido_em), `condicao_pagamento` (codigo único vivo, descricao, ativo, padrao; no máximo uma padrão viva) e `cliente_condicao` (cliente_id, condicao_pagamento_id, único vivo). Teste estático: CHECK de status × ORDER_STATUSES continua; níveis × NIVEIS_APROVACAO do Vendedor (o modulo-vendedor publica a lista).
3. **Base `demo`** (`db/seeds/demo/demo.ts`): Catálogo e Vendedor ativos; `perfil_modulo` com Vendedor e Catálogo para vendedor, supervisor, gerente, analista, assistente e admin (promotor sem Vendedor, RN-PRO-01); usuário novo **gerente** (gerente@exemplo.com.br, nome fictício) responsável pela equipe "Regional Norte", pai da Equipe Manaus; tabelas "Varejo" (todos os produtos, preço atual do seed) e "Atacado" (cerca de 7% menor, sem 3 produtos); cada cliente com uma tabela, vigência desde o 1º dia do mês anterior; condições À vista (padrão), 28 dias, 28/56, 30/60/90 (cliente com título vencido só À vista e 28 dias); `plataforma.parametro` do vendedor: `alcada.vendedor_pct = 5`, `alcada.supervisor_pct = 10`, `alcada.gerente_pct = 15`, `alcada.acima_gerente = 'analista'`; pedidos recalculados pela tabela do cliente, com número, retratos e `pedido_evento`: dentro da alçada `approved` (automático), 2 `pending_approval` de nível supervisor (um de cada vendedor), 1 de nível gerente, 1 `rejected` com motivo, 1 `cancelled`; nada em `sent_to_erp` ou depois.
4. O ensaio precisa permitir: Lucas tira pedido de 3% (aprova sozinho), de 8% (vai à Renata) e de 12% (vai ao gerente), e tenta um produto da Atacado sem preço.

## Pronto quando
Migrações up/down com testes de banco verdes (RLS, checks, únicos parciais), estático verde, base demo recarregável pelo `subir-demo.ps1`, e recado de entrega ao gerente com cópia ao modulo-vendedor, ao modulo-catalogo e ao testes. Dúvida de nome ou forma: responda neste fio antes de migrar.
