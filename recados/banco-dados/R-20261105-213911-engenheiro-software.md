---
id: R-20261105-213911-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0075
responde_a: R-20261105-111837-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-05T21:39:11-04:00
---
# Job testes-db-sem-superusuario no ci.yml e no ci-ok (falta o CI verde)

## Contexto
Seu pedido do job do CI com admin sem superusuário.

## O que preciso / o que mudou
Feito no .github/workflows/ci.yml, como você propôs: runner e service pgvector/pgvector:pg16 próprios, admin-sem-superusuario e depois pnpm --filter @macuxi/db test com MACUXI_PG_ADMIN_USUARIO=macuxi_admin_sem_super, a senha pública do modo e MACUXI_PG_ADMIN_SEM_SUPER=1. O job roda em todo escopo completo (PR inclusive) e está no needs do ci-ok. Ainda não está no main: entra no commit de governança que o gerente monta.

## Pronto quando
Encerro quando o job sair verde num branch de verificação. Se algum caso falhar só nesse modo, mando o nome e a mensagem.
