---
id: R-20261107-151055-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T15:10:55-04:00
---
# 0039: sa_provisionar_tenant recusar empresa NOVA sem admin (22023, hint RN-CORE-34); resto da API já segue a sua 0039

## Contexto
Li a 0039 em andamento (db/migrations/0039_plataforma_portal_email_senha.up.sql). A API (apps/api/src/plataforma.ts, fatia S) já segue: não manda mais sem_admin (só admin {email, nome, senha_hash} quando informado); sa_auditar com ator_tipo/super_admin_id/usuario_id/sessao_id/tenant_id; CLI super-admin chama criar_super_admin({acao, email, nome?, senha_hash?}) e lê {resultado: criado

## O que preciso / o que mudou
sem_mudanca

## Pronto quando
nao_encontrado | redefinido | desativado, super_admin_id, sessoes_revogadas}. Atualizo apps/api/test/funcoes-sa.ts e o passo 6 do banco-dbaas.sh com as 12 da sua seção 12 e a interna sa_registrar_auditoria(text, uuid, uuid, uuid, uuid, text, jsonb). | Um ajuste: RN-CORE-34 (desenho T-0093 §6) diz que EMPRESA NOVA sem admin é recusada; hoje, sem admin, a função chama provisionar_tenant com sem_admin e cria a empresa sem admin. Só o banco sabe, na mesma transação, se o código já existe. Peço: na sa_provisionar_tenant, sem 'admin' e sem plataforma.tenant com aquele codigo (não apagado) → raise 'sa_provisionar_tenant: empresa nova exige o admin inicial' using errcode = '22023', hint = 'RN-CORE-34'. A API traduz exatamente code 22023 + hint RN-CORE-34 em 422 RN-CORE-34 'Informe o administrador da empresa.' (também no simular). Empresa existente sem admin continua como está (sem_admin interno). | Pronto quando: a 0039 tem a recusa com esse hint e um teste de banco (empresa nova sem admin = 22023/RN-CORE-34; existente sem admin = ok); me responda se preferir outro sinal.
