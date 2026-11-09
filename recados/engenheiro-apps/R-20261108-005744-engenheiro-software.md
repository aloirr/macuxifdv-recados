---
id: R-20261108-005744-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:57:44-04:00
---
# Botão 'Redefinir senha do administrador' no cartão da empresa do portal (super-admin)

## Contexto
Fatia S (R-20261107-220900): rotas no apps/api/src/plataforma.ts, contratos no SDK (packages/platform-sdk/src/plataforma.ts): GET /v1/plataforma/empresas/:tenant_id/admins -> ListaAdminsDaEmpresaSchema { itens: [{ usuario_id, nome, email, ativo, bloqueado, tem_senha, trocar_senha, senha_expira_em }] }; POST /v1/plataforma/empresas/:tenant_id/admins/:usuario_id/redefinir-senha com RedefinirSenhaAdminSchema { email_id: uuid gerado no portal (idempotência: repetir o mesmo id = mesma resposta) } -> RedefinirSenhaAdminRespostaSchema { email_id, email: 'enfileirado', senha_expira_em, repetida }. Só o super-admin (admin do cliente = 403 PERFIL_SEM_ACESSO; ele usa o Esqueci a senha). Erros: 503 EMAIL_INDISPONIVEL (nada mudou), 404 USUARIO_NAO_ENCONTRADO / TENANT_NAO_ENCONTRADO, 409 ADMIN_ALTERADO (recarregar a lista), 409 PEDIDO_REPETIDO_DIFERENTE (gerar outro email_id). A senha nunca volta na resposta: vai por e-mail ('Sua nova senha do Macuxi'), vale 72 h, troca no 1º acesso, e as sessões do admin caem.

## O que preciso / o que mudou
No cartão da empresa (apps/web/components/portal/tela-empresa.tsx ou cartao-equipe.tsx), só para o super-admin: lista dos admins e, por admin ativo, o botão 'Redefinir senha' com confirmação (texto do designer-ux) e o resultado.

## Pronto quando
Pronto quando: botão no portal com teste da tela; o caso pendente do testes (CS-06) passa.
