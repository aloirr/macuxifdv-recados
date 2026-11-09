---
id: R-20261105-060454-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:04:54-04:00
---
# T-0083: função plataforma.provisionar_tenant(jsonb) idempotente, só para a conexão de administração

## Contexto
T-0083 (onboarding de tenant). Desenho: docs/desenho/T-0083.md §2 e §5. O comando fica em apps/api/src/cli/tenant.ts (meu) e conecta com a conexão de administração (MACUXI_PG_ADMIN_*), nunca como macuxi_app. Regra proposta RN-CORE-31.

## O que preciso
Migração aditiva com `plataforma.provisionar_tenant(p jsonb) returns jsonb`:
- entrada `{ codigo, nome, documento, fuso, plano, modulos: [{ modulo, licencas, perfis: [...] }], admin: { email, nome, senha_hash }, redefinir_senha }` (o comando já valida e monta perfis/dependências; a função confia no formato, mas revalida o básico pelos checks existentes);
- numa transação: tenant `on conflict (lower(codigo)) do nothing` (tenant existente: nome/fuso/plano NÃO mudam, devolve aviso); tenant_modulo e perfil_modulo só os que faltam (`on conflict do nothing`, nunca desativa nem apaga); admin por (tenant_id, lower(email)): cria com perfil admin, ativo, sem equipe; existente mantém a senha, salvo `redefinir_senha = true` (troca só o senha_hash); gatilhos tenant_semear_core/tenant_semear_medidas seguem fazendo motivos e medidas; NENHUMA linha em plataforma.parametro (ausente = padrão do doc 03);
- uma linha em plataforma.auditoria `tenant.provisionar` no tenant (ator nulo) sem e-mail/hash em antes/depois;
- devolve `{ tenant_id, resultado: criado|atualizado|sem_mudanca, modulos_adicionados, admin: criado|existente|senha_redefinida, avisos }`;
- SECURITY INVOKER, search_path fixo, `revoke all from public`, SEM grant ao macuxi_app e ao macuxi_worker; sem log de comando na transação (como garantirPapel em db/src/papeis.ts), porque leva o hash;
- testes de banco (CI): 2× com a mesma entrada = mesmas contagens por tabela; redefinir_senha troca só o hash; macuxi_app e macuxi_worker recebem 42501; down = drop function.
Se a auditoria não aceitar ator nulo hoje, diga qual é o caminho preferido (coluna já anulável? ator "plataforma"?).

## Pronto quando
Função no main com os testes de banco verdes no CI e resposta a mim com a assinatura final (eu escrevo o comando em cima dela). Ordem: passo 2 da T-0083, depois do meu planoDeOnboarding e antes do teste do modulo-core.
