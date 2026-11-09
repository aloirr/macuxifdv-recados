---
id: R-20261107-145424-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:54:24-04:00
---
# T-0093 fatia B: migração do portal só com e-mail e senha (contas por e-mail, sessão por empresa, bloqueio por chave, criar_super_admin, drop do TOTP/convite)

## Contexto
T-0093 (ADR 0031, aceita pelo dono do produto): o portal config. entra só com e-mail e senha, sem convite e sem TOTP; o admin do cliente também entra e escolhe a empresa; o super-admin nasce pelo deploy. Desenho: docs/desenho/T-0093.md §3, §4, §6, §7, §9 e §10 (fatia B do §11). Contratos do SDK já feitos (packages/platform-sdk/src/plataforma.ts: SessaoPortalSchema, AcessoPortalAutenticado, MAX_EMPRESAS_LOGIN_PORTAL = 20).

## O que preciso
Migração aditiva na próxima livre (hoje 0039; a T-0094 pega a seguinte), com down:
1. `plataforma.portal_tentativa` (chave text pk `^[0-9a-f]{64}$`, falhas, bloqueado_ate, colunas padrão; RLS forçado, só a política manutencao) e as funções `sa_tentativa_estado(chave)`, `sa_tentativa_falha(chave)` → (falhas, bloqueado_ate), `sa_tentativa_sucesso(chave)`, com a regra de hoje (bloqueio vivo não conta nem estende; 5ª falha seguida = 15 min).
2. Sessão do portal (recomendo `plataforma.portal_sessao` + `plataforma.portal_sessao_empresa(sessao_id, tenant_id, usuario_id)`; a `super_admin_sessao` fica só de histórico): tipo super_admin|admin_cliente, super_admin_id ou a lista das empresas conferidas, empresa atual, teto de 8 h, revogada_em, ultimo_uso_em.
3. `sa_contas_para_login(p_email)` → até 20 linhas (tipo, conta_id, tenant_id, tenant_codigo, tenant_nome, senha_hash): super-admin ativo; `core.usuario` perfil admin, ativo, senha_hash não nulo, sem deleted_at, em `plataforma.tenant` status ativo sem deleted_at; ordem por nome da empresa. Grava `sa.login.consulta` na auditoria_plataforma só com a contagem (sem e-mail).
4. `sa_abrir_sessao_portal(p jsonb)` → (sessao_id, expira_em): reconfere cada conta no banco; com uma empresa só, já escolhida; grava `sa.sessao.aberta`.
5. `sa_escolher_empresa(p_sid, p_tenant)` → (tenant_id, usuario_id, codigo, nome) ou nada: só admin_cliente, só tenant da lista, reconferindo admin ativo e empresa ativa; troca a empresa atual; grava `sa.empresa.escolher`.
6. `sa_sessao_valida(p_sid)` com retorno novo (tipo, super_admin_id, tenant_id, usuario_id, expira_em); admin_cliente com empresa: nada se ele deixou de ser admin ativo ou a empresa saiu de ativo. `sa_listar_tenants` (cliente = só as da sessão), `sa_tenant_ativo` (cliente = só a empresa atual), `sa_provisionar_tenant` (só super-admin; passa a ACEITAR `admin {email, nome, senha_hash}`; continua recusando redefinir_senha), `sa_revogar`, `sa_auditar` (aceita ator_tipo e usuario_id).
7. auditoria_plataforma: colunas `ator_tipo` (super_admin|admin_cliente, nulo) e `usuario_id` (sem FK); append-only continua.
8. Índice `core.usuario (lower(email)) where deleted_at is null and perfil = 'admin'`.
9. `plataforma.criar_super_admin(p jsonb)`: criar (idempotente por lower(email); existente = sem_mudanca), redefinir (hash novo, zera bloqueio, revoga sessões), desativar (revoga sessões; recusa o último ativo com 22023); só hash argon2id; grava `sa.super_admin.<acao>`; SEM EXECUTE para ninguém além do dono (chamada pela conexão de administração, como a provisionar_tenant).
10. Revoke + drop das 14 funções do §9 (sa_existe, sa_criar_primeiro, sa_para_login, sa_por_id, sa_registrar_falha, sa_registrar_sucesso, sa_gravar_totp_pendente, sa_confirmar_totp, sa_marcar_passo, sa_usar_recuperacao, sa_regerar_recuperacao, sa_abrir_desafio, sa_ver_desafio, sa_abrir_sessao); o down recria. As colunas de TOTP da super_admin ficam.
11. Toda sa_* nova: revoke from public + EXECUTE só ao macuxi_portal. `docs/banco/plataforma.md` atualizado. Me mande as assinaturas finais: eu atualizo `apps/api/test/funcoes-sa.ts` e o passo 6 do `banco-dbaas.sh`.

## Pronto quando
CI verde (`*.db.test.ts`, sem Docker local) provando: macuxi_app e macuxi_worker → 42501 em toda sa_* nova; macuxi_portal → 42501 em select direto de core.usuario, plataforma.tenant e das tabelas novas; sa_contas_para_login deixa de fora vendedor, admin inativo/apagado/sem senha e empresa suspensa, e grava sa.login.consulta; sa_escolher_empresa recusa tenant fora da lista e admin rebaixado; sa_sessao_valida cai na hora com o admin desativado; criar_super_admin idempotente e sem EXECUTE para app/portal/worker; sa_provisionar_tenant aceita admin e recusa redefinir_senha.
IMPORTANTE: a migração só entra no main no mesmo commit das fatias C (Core) e S (API), senão o portal dá 500 (as funções antigas somem).
