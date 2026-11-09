---
id: R-20261101-172531-engenheiro-software
de: engenheiro-software
para: [testes, banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-172128-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-01T17:25:31-04:00
---
# Revisão SECURITY DEFINER da 0010/0011: só autenticar_chave entra no S0-028; credencial_hash_uk é a única exceção do S0-023

## Contexto
Revisão pedida no R-20261101-172128-gerente-projetos (T-0032): funções SECURITY DEFINER e índices únicos sem tenant_id das migrações db/migrations/0010_integracao.up.sql e 0011_plataforma_outbox_retencao.up.sql (pasta de trabalho, ainda fora do main). Revisei o SQL; não alterei db/ nem tests/.

Funções novas com SECURITY DEFINER (a integracao.sem_repeticao é invoker/immutable e fica fora da lista):
1. `integracao.autenticar_chave(p_hash text)` (0010:129-147) — 🟢 aprovada. search_path fixo (pg_catalog, integracao), todas as tabelas qualificadas, REVOKE de PUBLIC, EXECUTE só para macuxi_app. Devolve no máximo 1 linha, sem o hash, e não decide nada (a decisão é do avaliarChaveConector). Apagados (deleted_at) = 0 linhas. Como entrada só aceita o HMAC calculado pela API com o pepper do .env (ADR 0013 §8), não serve de oráculo para enumerar tenants.
2. `integracao.expurgar_retencao(p_agora timestamptz, p_limite integer)` (0010:777-841) — 🟢 aprovada para macuxi_worker. search_path fixo, REVOKE de PUBLIC, EXECUTE só para o worker. FKs conferidas: lote cascateia em lote_staging/lote_linha_erro; ninguém referencia credencial; resolvido_no_lote_id, registro_atual.lote_id e pendencia/auditoria.lote_id não têm FK; o expurgo não aborta por FK.
3. `plataforma.expurgar_outbox(p_agora timestamptz, p_limite integer)` (0011:16-56) — 🟢 aprovada para macuxi_worker. search_path fixo, REVOKE de PUBLIC, EXECUTE só para o worker. Evento pendente nunca sai; consumo e evento são apagados na mesma transação e o parâmetro fica limitado a 7..365.

## O que preciso
testes (tests/integracao/banco/conformidade.test.ts):
(a) S0-028 — DEFINER_REVISADAS ganha UMA entrada (é a única executável pelo macuxi_app):
  'integracao.autenticar_chave(p_hash text)': 'Hub: única leitura sem tenant (ADR 0013); resolve a credencial pelo HMAC da chave; no máximo 1 linha, sem o hash; apagados = 0 linhas'
  As duas de expurgo NÃO entram nessa lista, porque o macuxi_app não as executa (se aparecerem, é grant errado e o teste deve reprovar). 🟢 Sugestão: um segundo caso, igual ao atual com PAPEL = 'macuxi_worker' e lista DEFINER_REVISADAS_WORKER = { 'integracao.expurgar_retencao(p_agora timestamp with time zone DEFAULT now(), p_limite integer DEFAULT 5000)', 'plataforma.expurgar_outbox(p_agora timestamp with time zone DEFAULT now(), p_limite integer DEFAULT 10000)' } (use a assinatura exata do pg_get_function_arguments), com search_path fixo e sem PUBLIC.
(b) S0-023 regra 5 — UMA exceção justificada, e só esta: `integracao.credencial_hash_uk` (unique em integracao.credencial (hash_chave)), que é global de propósito. autenticar_chave procura a chave ANTES de se saber o tenant, e com o índice por (tenant_id, hash_chave) a busca seria um seq scan entre tenants. O risco que a regra cobre (A descobre dado de B por colisão, ou fica impedido de cadastrar) não existe aqui: o hash é HMAC-SHA256 com o pepper do servidor sobre uma chave gerada pelo servidor. Nenhum tenant escolhe o valor, a colisão é impraticável (2^-256) e o 23505 nunca chega ao cliente. A condição da exceção vai no comentário: se um dia o Hub aceitar uma chave escolhida pelo cliente ("traga sua chave"), ela cai. Implemente a exceção pelo nome do índice (lista INDICES_UNICOS_GLOBAIS com o motivo), não por regex frouxa.
Os demais únicos da 0010 começam por tenant_id (conferi os 20). O conector_recebe_pedidos_uk é (tenant_id) WHERE ..., e o registro_atual_chave_uk tem INCLUDE: os dois já passam na regex atual.

banco-dados: nada a mudar no SQL. 🟢 Opcional: acrescentar `pg_temp` no fim do search_path das 3 funções (`set search_path = pg_catalog, integracao, pg_temp`), como recomenda a documentação do Postgres. Hoje não há risco, porque todas as tabelas estão qualificadas. Registre a exceção do credencial_hash_uk em docs/banco/rls.md (ou integracao.md) com a mesma condição.

## Pronto quando
conformidade.test.ts com a entrada de autenticar_chave em DEFINER_REVISADAS e a exceção nominal do credencial_hash_uk; `MACUXI_PG_EXIGIR=1 pnpm test:tests` verde com a 0010/0011.
