---
id: R-20261101-154937-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [modulo-integracao]
tipo: pedido
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:49:37-04:00
---
# Schema integracao para o Hub: spec do R-013336 renumerada (0010/0011) + entidades por Conector, ids inválidos por sessão, external_id 200, auditoria e erros de retorno

## Contexto
T-0032 (Hub /integracao/v1 — rotas e banco). Desenho em docs/desenho/T-0032.md §8 e ADR 0013 (docs/decisoes/0013-rotas-de-conector-chave-por-conector.md). As rotas do Hub e do BKO só começam depois da sua migração. Base: a SUA especificação do R-20261101-013336 (schema integracao, tabelas, função integracao.autenticar_chave, expurgos, testes, dicionário), os pedidos da T-0027 (R-20261101-112205, PR #24) e da T-0031 (R-20261101-115656 e R-20261101-150202, PR #25). As tabelas e campos de negócio estão em docs/modulos/integracao/hub-api.md §17b.

## O que preciso
1. **Numeração**: a spec "0008/0009" vira **0010_integracao** e **0011_plataforma_outbox_retencao** (ou os próximos números livres; a 0009 é a do Vendedor). Mesmo conteúdo da spec, com os itens abaixo NA MESMA migração do schema integracao.
2. **Entidades por Conector (P-6/P-7, RN-INT-13)**: `conector.entidades text[] not null default` as 8 entidades; check não vazio, sem repetição e só valores de `ENTIDADES` (modules/integracao/contracts/entidades.ts). Guarda final do P-7: `unique (tenant_id) where recebe_pedidos and ativo and deleted_at is null`. (A regra "uma entidade por Conector ativo" fica na API com `pg_advisory_xact_lock` por tenant; não precisa de constraint de array.)
3. **`integracao.autenticar_chave(hash)`** devolve também `entidades` e `recebe_pedidos` do Conector (o `validarEnvelope` usa `entidadesDoConector` sem outra consulta). Continua: no máximo 1 linha, sem o hash, SECURITY DEFINER, search_path fixo, grant só ao macuxi_app.
4. **Ids inválidos por sessão de carga (RN-INT-06, 🔴 da T-0027)**: `sessao_carga_recebido (sessao_id, external_id)` guarda os `invalidos` de `idsDaSessaoNoLote` (erros do Hub e linhas inválidas do Conector com id) — unique `(tenant_id, sessao_id, external_id)`; `sessao_carga.linhas_sem_identificacao int not null default 0` e `invalidas_omitidas int not null default 0`.
5. **external_id até 200** (check `char_length(x) between 1 and 200`): `registro_atual.external_id`, `lote_linha_erro.external_id` (nulo permitido), `sessao_carga_recebido.external_id`, `cursor_entidade.cursor_external_id`, `pedido_retorno_erro.produto_external_id`.
6. **`integracao.inativacao_auditoria`** (P-3): colunas do hub-api §17b (`pendencia_id`, `sessao_id`, `lote_id`, `entidade`, `conector_id`, `acao` confirmar|recusar, `decidida_por uuid`, `perfil` admin|analista, `decidida_em`, `quantidade`, `total_ativos`, `percentual numeric(5,2)`, `motivo` ≤ 300) **+ `inativadas int null`** (quantos foram de fato inativados na confirmação; nulo na recusa). **Append-only**: grant só `select, insert` ao macuxi_app (sem update/delete). Índices `(tenant_id, decidida_em desc)` e `(tenant_id, pendencia_id)`. FK composta para pendencia_inativacao.
7. **`integracao.pedido_retorno_erro`** (P-4): colunas do hub-api §17b (`pedido_uuid`, `status`, `numero_erp`, `nota_numero`, `nota_serie`, `ocorrido_em`, `indice`, `sequencia`, `produto_external_id`, `quantidade`, `codigo`, `codigos text[]`, `campo`, `motivo`, `conector_id`, `resolvido_em`) **+ `pedido_retorno_id uuid null`** (FK composta para pedido_retorno; gravado na mesma transação). Índices `(tenant_id, created_at desc)` (alerta de 24 h e lista do monitor) e `(tenant_id, pedido_uuid)`. Check de `codigo` e de cada item de `codigos` em ('sequencia_inexistente','produto_divergente','quantidade_acima_do_saldo').
8. **`pendencia_inativacao`**: `decidida_por uuid null`, **`decidida_por_perfil text null check in ('admin','analista')`** (coluna nova da T-0031), `motivo_decisao text null check (char_length <= 300)`.
9. Todas as tabelas novas em `TABELAS_FORA_DO_SYNC` (db/src/excecoes.ts), RLS forçado, colunas padrão (regra 5), dicionário em docs/banco/integracao.md, Drizzle em modules/integracao/db/nuvem.ts.
10. **Testes em db/testes** (os da sua spec) + append-only da auditoria (update/delete negados ao macuxi_app), check de 200 caracteres, unique parcial do P-7 e `autenticar_chave` devolvendo `entidades`.

## Pronto quando
Migrações aplicam do zero e sobre a base atual (up/down), RLS forçado e vazamento entre 2 tenants testados, `pnpm --filter @macuxi/db test` verde, dicionário escrito, e recado de entrega a mim e ao modulo-integracao com os nomes finais das migrações (é o gatilho para as rotas).
