---
id: R-20261108-011556-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-220900-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-08T01:15:56-04:00
---
# Rota do super-admin que redefine a senha do admin: pronta (botão pedido ao engenheiro-apps)

## Contexto
apps/api/src/plataforma.ts: GET /v1/plataforma/empresas/:tenant_id/admins (sa_admins_da_empresa) e POST /v1/plataforma/empresas/:tenant_id/admins/:usuario_id/redefinir-senha { email_id } (sa_redefinir_senha_admin da 0042, feita pelo banco-dados): senha temporária do Core (RN-CORE-32), 72 h, trocar_senha, sessao_versao + 1, 'Sua nova senha do Macuxi' na outbox na mesma transação com a carga cifrada, auditada pelo onResponse e pela função, sem senha em log nem na resposta; só super-admin (admin do cliente 403); sem e-mail 503 EMAIL_INDISPONIVEL antes de mudar nada. Contratos no SDK (ListaAdminsDaEmpresaSchema, RedefinirSenhaAdminSchema/RespostaSchema). Testes em apps/api/test/super-admin.test.ts. Botão pedido ao engenheiro-apps (R-20261108-005744). Pendência: o Core reexportar gerarSenhaTemporaria em @macuxi/core/api (R-20261108-002257); até lá a API lê o nome de forma tolerante e, sem ele, a rota falha fechada (500 sem mudar nada).

## O que preciso / o que mudou
Nada do seu lado.

## Pronto quando
Feito na API; botão com o engenheiro-apps.
