---
id: R-20261031-113939-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0004
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:39:39-04:00
---
# Migração 0003: macuxi_worker (ADR 0007), evento_consumo, colunas do envelope e carteira_usuario_sync_ix

## Contexto
T-0004 (pendências 1 e 2 da T-0002 §6). Decisões: ADR 0007 (`docs/decisoes/0007-despacho-da-outbox-com-macuxi-worker.md`, aprova a sua concordância R-20261031-093034 com a proposta do desenho T-0002 §5) e desenho `docs/desenho/T-0004.md` §4–6. A API já grava eventos em `plataforma.evento` na transação do fato (`tx.publicar`, `apps/api/src/outbox.ts`) e lê licenças por `comTenant` (`apps/api/src/licencas.ts`).

## O que preciso
Migração `0003_plataforma_worker` (up/down), com testes em `db/testes/`:
1. Papel `macuxi_worker` NOLOGIN NOSUPERUSER **NOBYPASSRLS** NOCREATEDB NOCREATEROLE NOREPLICATION (LOGIN e senha pelo executor, como o `macuxi_app`; `garantirPapelWorker` no `@macuxi/db` e `MACUXI_PG_WORKER_SENHA` no `.env.example`; URL `urlWorker(cfg)`).
2. `grant usage on schema plataforma`; `grant select (id, tenant_id, nome, modulo, agregado_id, payload, ocorrido_em, publicado_em, tentativas, usuario_id, request_id)` e `grant update (publicado_em, tentativas, ultimo_erro)` em `plataforma.evento`; políticas `despacho_outbox` (select, `using (true)`) e `despacho_outbox_marcar` (update, `using (true) with check (true)`) **só para `macuxi_worker`**. Nenhum grant em `core.*`, schemas de módulo ou outras tabelas da plataforma.
3. `plataforma.evento`: colunas `usuario_id uuid null` e `request_id text null` (o envelope do SDK já tem; a API passa a gravar quando existirem).
4. `plataforma.evento_consumo` (consumo idempotente por consumidor): `id, tenant_id, consumidor text, evento_id uuid, processado_em timestamptz` + campos comuns; único `(tenant_id, consumidor, evento_id)`; RLS por tenant para `macuxi_app` (o handler roda com `comTenant`).
5. Índice `core.carteira_usuario_sync_ix on core.carteira (tenant_id, usuario_id, updated_at, id)` **sem** `where deleted_at is null` (o pull precisa dos removidos; Q6 de `docs/banco/desempenho-sync.md`).
6. Testes: worker lê eventos de A e B; não lê `core.*` nem `plataforma.usuario_modulo` (42501); só atualiza as 3 colunas; não tem BYPASSRLS; `macuxi_app` sem contexto continua com 0 linhas em `plataforma.evento`; `evento_consumo` sem vazamento entre tenants.
pg-boss (schema `pgboss`) NÃO entra agora: vem com o primeiro consumidor real (ADR 0007 item 5).

## Pronto quando
Migração aplicada no Docker e no CI, testes de banco verdes, recado de resposta com os nomes finais (papel, função `garantirPapelWorker`, variável de ambiente). Aí eu ligo `usuario_id`/`request_id` no `gravarEvento` e escrevo o despachante.
