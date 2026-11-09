---
id: R-20261107-175952-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T17:59:52-04:00
---
# T-0094 fatia B: migração 0040 (estado da senha, sessao_versao, outbox de e-mail, portal)

## Contexto
Desenho da T-0094 em docs/desenho/T-0094.md (§2, §7, §8.1, §9.1, §10 e §13) e ADR 0032 (proposta). Decisões do dono do produto de 07/11: RN-CORE-33 e RN-CORE-34. A 0039 é a da T-0093; a T-0094 fica com a **0040**, aditiva.

## O que preciso (fatia B)
1. `core.usuario`: `trocar_senha boolean not null default false`, `senha_expira_em timestamptz`, `senha_temporaria_hash` (mesmo check argon2id do `senha_hash`), `senha_temporaria_expira_em`, `senha_temporaria_criada_em`, `sessao_versao integer not null default 0`. Checks: `senha_expira_em is null or trocar_senha`; as três `senha_temporaria_*` todas nulas ou todas preenchidas; `sessao_versao >= 0`. Padrões que não reescrevem linha.
2. `plataforma.email_saida` (outbox de e-mail, no lugar do pg-boss; ADR 0032 §6): `id`, `tenant_id`, `usuario_id` (FK composta para `core.usuario`), `modelo` (check `acesso_inicial|nova_senha`), `chave_idempotencia` (único por tenant), `carga bytea` nulo (só o texto cifrado), `tentativas`, `proxima_tentativa_em`, `expira_em`, `enviado_em`, `falhou_em`, `ultimo_erro` (código curto), colunas padrão. Checks: enviado e falhou se excluem; enviado ou falhou ⇒ `carga is null`. RLS forçado: `macuxi_app` só `insert` e `select` no próprio tenant; `macuxi_worker` com política própria de `select`/`update` em todos os tenants (como `plataforma.evento`), sem `delete`; `manutencao`. Índice do lote pendente `(proxima_tentativa_em) where enviado_em is null and falhou_em is null`. Fora do sync (`db/src/excecoes.ts`).
3. Portal: `sa_contas_para_login` devolve também `trocar_senha` e `senha_expira_em` (nunca o hash temporário); `portal_sessao_empresa.sessao_versao`; `sa_abrir_sessao_portal` e `sa_escolher_empresa` recusam conta com `trocar_senha` e gravam a versão; `sa_sessao_valida` cai se a versão mudou ou se `trocar_senha` ficou verdadeiro. EXECUTE continua só ao `macuxi_portal`. Me avise das assinaturas para eu atualizar `apps/api/test/funcoes-sa.ts` e o `banco-dbaas.sh`.
4. `sa_provisionar_tenant` e `provisionar_tenant`: admin inicial com `trocar_senha = true` e `senha_expira_em = null` (P5).
5. `anonimizar_usuario`: limpa também as `senha_temporaria_*`, sobe a `sessao_versao` e zera a `carga` dos e-mails pendentes do titular (`falhou_em`, `ultimo_erro = 'anonimizado'`).
6. Revoga os convites pendentes de `core.usuario_convite` (a tabela fica como histórico; o convite sai do Core).
7. Docs do banco (`core.md`, `plataforma.md`, `rls.md`, `lgpd.md`) e `db/scripts/conferir-rls.sql`.

## Pronto quando
CI verde; testes de banco: checks do item 1 recusam combinações inválidas; `macuxi_app` não faz `update`/`delete` em `email_saida` nem lê outro tenant; `macuxi_worker` lê todos os tenants só nessa tabela; `macuxi_portal` sem grant nela; `sa_contas_para_login` não devolve hash temporário; sessão do portal cai com versão nova e com `trocar_senha`; admin inicial nasce com `trocar_senha` sem validade; anonimizar limpa temporária e carga. **A 0040 só entra no main junto com a fatia C do modulo-core** (o Core do portal lê as colunas novas).
