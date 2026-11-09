---
id: R-20261101-044224-2-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:42:24+00:00
---
# Hub /integracao/v1: revisão e tabelas/índices/RLS do schema integracao (parte b)

## Contexto
T-0025 (nuvem) desenhou o Hub `/integracao/v1`: `docs/modulos/integracao/hub-api.md` (seção 17b traz as tabelas completas). Entidades, estados e volumes já estavam em `desenho.md` §2 e §11; esta tarefa acrescentou o que a API do Hub precisa. Toda tabela com `id`, `tenant_id`, `created_at`, `updated_at`, `deleted_at`, `external_id` e RLS forçado. Nenhuma migração foi escrita por mim.

## O que preciso
Revisão e as migrações do schema `integracao` conforme a seção 17b do `hub-api.md`. O que é novo ou exige atenção:
1. **`credencial`**: `hash_chave` = HMAC-SHA256 hex da chave (pepper no `.env` da API); `unique (hash_chave)` GLOBAL (a autenticação ainda não tem tenant); no máximo 1 chave `atual` e 1 `anterior` não revogadas por Conector (índice parcial); rotação nunca sobrescreve. **Função `integracao.autenticar_chave(hash text)` SECURITY DEFINER** (search_path fixo, GRANT a `macuxi_app`), devolvendo só a credencial + `tenant_id` + dados do Conector (`ativo`, `external_id`, `ips_permitidos`, `recebe_pedidos`). p95 < 50 ms. Teste: sem tenant, a tabela devolve 0 linhas; a função devolve só a linha da chave.
2. **`cursor_entidade`**: `cursor_external_id text COLLATE "C"` (ordem ordinal, igual à do Conector); `cursor_alterado_em timestamptz(3)`; escrita monotônica `UPDATE … WHERE (cursor_alterado_em, cursor_external_id) < (novo)`.
3. **`lote`**: `unique (tenant_id, conector_id, chave_idempotencia)` (idempotência por `Idempotency-Key`), `hash_conteudo`, índice parcial da fila de aplicação `(tenant_id, status, recebido_em) where status in ('recebido','processando')`. **`lote_staging`** (corpo jsonb de até 8 MiB, anulado ao concluir) e **`lote_linha_erro`** com `origem` (`hub|conector`) e `payload` (só origem hub; expurgo 30 dias).
4. **`registro_atual`**: espelho do último registro aceito por (tenant, entidade, `external_id`), com `conector_id`, `hash`, `payload`, `visto_em`, `sessao_id`; `deleted_at` = inativado pela carga completa. Decidam: uma tabela particionada por `entidade` (8 partições; minha preferência) ou as 8 `staging_<entidade>` do desenho. Índice `(tenant_id, entidade, conector_id) where deleted_at is null` (contagem da reconciliação e ativos da sessão).
5. **`pendencia_inativacao`** (trava de 30%), **`sessao_carga`** + **`sessao_carga_recebido`**, **`politica_versao`** (por tenant), **`reconciliacao`** (chave com `conector_id`), **`mapeamento`** (único por `codigo_erp` e, para ativos, por `codigo_macuxi`), **`pedido_fila_erp`** (com `payload_origem`, retenção, `notas_aplicadas`, `itens_faturados_acumulados`, `removido_em`) e **`pedido_retorno`** (trilha; `unique (tenant_id, pedido_uuid, status, nota_numero, nota_serie)` como segunda guarda de idempotência).
6. RLS e teste de vazamento entre dois tenants para todas; expurgo/retenção (lote e chaves 12 meses; payload de erro 30 dias; staging 7 dias).
7. Views-modelo do Conector (`db/conector/views-modelo.sql`) continuam pendentes (`desenho.md` §11): `alterado_em` UTC em milissegundos, `external_id` = chave interna do ERP (nunca CPF/CNPJ).

## Pronto quando
As migrações estiverem no `db/` com testes (RLS, vazamento, unicidades, função de autenticação, monotonicidade do cursor), ou você responder com ajustes ao desenho para eu refletir no `hub-api.md`.
