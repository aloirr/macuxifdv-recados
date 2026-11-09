---
id: R-20261106-002308-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:23:08-04:00
---
# T-0087 P: migração 0034 do super-admin (tabelas sem tenant, RLS sem política, funções SECURITY DEFINER, auditoria append-only, provisionar_tenant sem admin e com parâmetros)

## Contexto
T-0087, fatia P (portal `config.macuxifdv.com.br`, no ar até 12h de 06/11). Desenho `docs/desenho/T-0087.md` §6; decisão `docs/decisoes/0029-super-admin-de-plataforma.md` (super-admin fora dos tenants; a exceção à regra 5 está registrada lá).

## O que preciso (migração aditiva 0034, testes no CI)
1. `plataforma.super_admin` (sem `tenant_id`): `id`, `email` (único por `lower(email)` vivo), `nome`, `senha_hash` (check argon2id como na 0004), `totp_segredo_cifrado`, `totp_pendente_cifrado`, `totp_confirmado_em`, `totp_ultimo_passo bigint`, `recuperacao_hashes text[]`, `falhas int`, `bloqueado_ate`, `ativo`, `created_at`, `updated_at`, `deleted_at`, `external_id`.
2. `plataforma.super_admin_sessao` (`id`, `super_admin_id`, `criada_em`, `ultimo_uso_em`, `expira_em` = teto de 8 h, `revogada_em` + colunas padrão) e o desafio da 2ª etapa (tabela própria ou colunas; 5 min, uso único, só o hash do desafio).
3. `plataforma.auditoria_plataforma` **append-only** (sem update/delete para app e worker; gatilho que recusa): `id`, `super_admin_id` (nulo na falha de login com e-mail inexistente), `sessao_id`, `tenant_id` (nulo fora de tenant), `acao`, `metodo`, `rota` (modelo, sem query), `status`, `request_id`, `ip_prefixo`, `detalhes jsonb`, `ocorrido_em`.
4. RLS ligado e **forçado** nas tabelas, **sem política** para `macuxi_app`/`macuxi_worker` (0 linhas direto). Acesso só por funções `SECURITY DEFINER`, `search_path` fixo, `revoke all from public`, grant só ao `macuxi_app`:
   - `sa_existe()`, `sa_criar_primeiro(email, nome, senha_hash)` (trava consultiva; só cria com 0 linhas; senão devolve nulo), `sa_para_login(email)`;
   - `sa_registrar_falha(id)` / `sa_registrar_sucesso(id)` (5 falhas → `bloqueado_ate` +15 min);
   - `sa_gravar_totp_pendente`, `sa_confirmar_totp`, `sa_marcar_passo(id, passo)` (só avança), `sa_usar_recuperacao(id, hash)` (remove o hash e devolve os restantes), `sa_regerar_recuperacao`;
   - `sa_abrir_desafio` / `sa_consumir_desafio`, `sa_abrir_sessao`, `sa_sessao_valida(sid)` (viva = não revogada, `expira_em` > now, super-admin ativo e TOTP confirmado; atualiza `ultimo_uso_em`), `sa_revogar(sid)`;
   - `sa_auditar(...)`, `sa_listar_tenants(sid)` (id, código, nome, documento, fuso, status, criado_em, módulos e licenças), `sa_tenant_ativo(sid, tenant)` e `sa_provisionar_tenant(sid, p jsonb)` (confere a sessão viva e chama a `provisionar_tenant`).
5. `provisionar_tenant` (0029), aditiva: `admin` opcional quando `p.sem_admin = true` (o comando da T-0083 continua exigindo) e `p.parametros: [{ modulo, chave, valor }]` gravados em `plataforma.parametro` com `on conflict do nothing` (devolve `parametros_gravados`, as chaves inseridas). Chaves do Vendedor: `alcada.vendedor_pct`, `alcada.supervisor_pct`, `alcada.gerente_pct`, `validade_orcamento_dias`, `aplicacao_no_orcamento_padrao` (saem de `linhasDosParametrosIniciais` no SDK).
6. Retenção: a auditoria da plataforma sobrevive ao `excluir_tenant` (FK de `tenant_id` sem cascade, ou sem FK; diga qual escolheu).

## Pronto quando
- Migração up/down no CI (branch de verificação): `macuxi_app` lê 0 linhas direto nas tabelas; `macuxi_worker` recebe 42501 em todas as funções; update/delete na auditoria recusado; `sa_criar_primeiro` 2× = 1 linha; `sa_sessao_valida` falso após `sa_revogar` e após o teto; `sa_provisionar_tenant` com sessão revogada recusa; `provisionar_tenant` com `sem_admin` e parâmetros idempotente (2× = mesmas linhas).
- Recado de entrega com os nomes finais e as assinaturas das funções (o modulo-core e eu chamamos por elas).
- Prioridade: até 6h.
