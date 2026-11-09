---
id: R-20261102-132023-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0054
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:20:23+00:00
---
# Migração do faturamento e da devolução do pedido (pedido_faturamento, pedido_devolucao e colunas de resumo) + seed da demo

## Contexto
T-0054 (nuvem, Sprint 5): o Vendedor consome `integracao.pedido.retorno_erp@1` (status, faturado@1) e `integracao.nota.atualizado@1` (devolução). Código pronto e provado em Postgres real com uma DDL PROPOSTA aplicada só no banco efêmero do teste (`modules/vendedor/api/teste/ddl-proposta.ts`, constante `DDL_PROPOSTA`). Em produção está desligado (`FATURAMENTO_LIGADO = false` em `modules/vendedor/api/retorno-erp.ts`) até a migração chegar ao `main`. Especificação: `docs/modulos/vendedor/retorno-erp.md` §"Migração pedida" (desenho T-0011 §3).

## O que preciso
Migração (sugiro junto da 0013, que já tem "Vendedor: pré-venda, devolução"), com o mesmo formato da `DDL_PROPOSTA`:
1. `vendedor.pedido`: `faturado_cents bigint not null default 0 (>= 0)`, `devolvido_cents bigint not null default 0 (>= 0)`, `notas_faturamento int not null default 0 (>= 0)`, `ultima_nota_numero text`, `faturado_em timestamptz`.
2. `vendedor.pedido_item`: `quantidade_faturada int not null default 0 (>= 0)`.
3. `vendedor.pedido_faturamento`: `pedido_id` (FK composta para pedido), `evento_origem_id uuid not null` com `unique (tenant_id, evento_origem_id)`, `status_retorno` (`faturado_parcial`|`faturado_total`), `parcial bool`, `nota_numero`, `nota_serie`, `nota_emitida_em`, `nota_total_cents (>= 0, anulável)`, `faturado_em not null`, `itens jsonb not null default '[]'` (array `[{sequencia, produto_id, quantidade, valor_cents}]`), colunas comuns, FK de tenant, índice `(tenant_id, pedido_id, faturado_em)`, gatilho de `updated_at`, RLS e `grant select, insert` ao macuxi_app. Só servidor (fora do sync: entra em TABELAS_FORA_DO_SYNC).
4. `vendedor.pedido_devolucao`: `pedido_id` (FK composta), `external_id text not null` (a nota do ERP) com único parcial `(tenant_id, external_id) where deleted_at is null`, `nota_numero not null`, `nota_serie`, `emitida_em not null`, `total_cents bigint not null (>= 0)`, colunas comuns, FK de tenant, índice `(tenant_id, pedido_id)`, gatilho, RLS e `grant select, insert, update` (o soft delete é por update). Só servidor (fora do sync).
5. Seed da demo: um pedido `invoiced_partial` e um `invoiced` com linhas em `pedido_faturamento` e o resumo preenchido (e um com devolução parcial), para o roteiro "pedido → ERP → faturado visível no app".
Volume: uma linha por nota do pedido (em geral 1 ou 2); devolução é rara.

## Pronto quando
Migração no `main` com up/down e o teste de conformidade verde. Ao chegar, o Vendedor muda `FATURAMENTO_LIGADO` para `true`, apaga `api/teste/ddl-proposta.ts` e o `retorno-erp.db.test.ts` passa a validar a migração real (6 casos: RLS de dois tenants, idempotência por `evento_origem_id`, saldo, devolução e pull).
