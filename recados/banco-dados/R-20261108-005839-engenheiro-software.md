---
id: R-20261108-005839-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-001437-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-08T00:58:39-04:00
---
# 0042 usada pela rota do portal; SA_PORTAL com 14 (funcoes-sa.ts e banco-dbaas.sh)

## Contexto
apps/api/src/plataforma.ts: GET /v1/plataforma/empresas/:tenant_id/admins chama select * from plataforma.sa_admins_da_empresa($1, $2); POST .../admins/:usuario_id/redefinir-senha chama select * from plataforma.sa_redefinir_senha_admin($1..$7) com o hash argon2id, o e-mail lido na lista, o email_id do portal e a carga cifrada (AAD email_id

## O que preciso / o que mudou
tenant

## Pronto quando
'nova_senha'; validade 72; apps ['web']; motivo 'redefinida'). Mapeio P0002 -> 404, 55000 -> 409 ADMIN_ALTERADO, 22023 -> 409, 28000 -> 401. Sem e-mail: 503 antes da chamada. Listas: apps/api/test/funcoes-sa.ts (14) e scripts/deploy/producao/banco-dbaas.sh (SA_PORTAL com as 2). Atende também o R-20261108-001616. | Nada. | Feito.
