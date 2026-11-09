---
id: R-20261108-061555-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:15:55-04:00
---
# T-0094 fatia S no portal: 'Redefinir senha' do admin (super-admin) + 🟡 web da revisão W

## Contexto
T-0094 fatia S, lado do portal (pedido R-20261108-005744 do engenheiro-software; ordem do gerente nesta rodada). Só apps/web; nada em apps/mobile nem em modules/*/app.

## O que fiz
1. Portal, aba Empresa da página da empresa: painel "Administradores", só para o time da Macuxi (super-admin). Lista os admins (GET /v1/plataforma/empresas/:id/admins, ListaAdminsDaEmpresaSchema), com etiquetas da spec ciclo-de-senha §5 (troca pendente com vencimento no fuso da empresa, vencida, sem senha) + Inativo/Bloqueado. Por admin ativo e não bloqueado: "Redefinir senha" → diálogo "Redefinir a senha de <nome>?" (Cancelar com foco inicial / Redefinir senha, "Redefinindo…") → POST .../admins/:usuario_id/redefinir-senha com email_id gerado ao abrir (reusado na nova tentativa sem rede; trocado quando a API pede). Resultado: "Senha nova enviada por e-mail para <e-mail>; vale 72 h (até dd/mm às hh:mm)." Erros: 503 EMAIL_INDISPONIVEL ("…a senha não foi trocada…"), 409 ADMIN_ALTERADO e 404 USUARIO_NAO_ENCONTRADO (recarrega a lista), 409 PEDIDO_REPETIDO_DIFERENTE (id novo), 403, rota ausente ("ainda não está disponível neste servidor").
2. Modo falso: admins em memória por empresa (Distribuidora Uma: Ana = sucesso; "Suporte TI" @sem-email. = 503; Carlos bloqueado), idempotência por email_id (repetida/409), 403 para o admin do cliente, admin inicial da empresa criada entra na lista; nenhum e-mail no sessionStorage.
3. 🟡 web da revisão da fatia W (designer-ux R-20261108-054817 itens do web): "Ir para o login", "backoffice" no cartão Equipe, linha do login e texto da demo com o Macuxi Gestão, aria-describedby da confirmação do Esqueci.
Arquivos: apps/web/components/portal/cartao-admins.tsx (novo), apps/web/lib/portal-admins.ts (novo), apps/web/lib/portal-admins.test.ts (novo, 9 testes), apps/web/lib/portal-rotas.ts, apps/web/lib/portal-falso.ts, apps/web/components/portal/tela-empresa.tsx, apps/web/lib/ciclo-senha.ts, apps/web/components/ciclo-senha.tsx, apps/web/components/login-screen.tsx, apps/web/components/portal/cartao-equipe.tsx.
Testes: apps/web eslint 0, typecheck 0, vitest 148/148, next build 0. coord verificar OK.

## Premissas e pendências
- Sem "Copiar senha" no portal: a API nunca devolve a senha (RedefinirSenhaAdminRespostaSchema) e o 503 EMAIL_INDISPONIVEL vem antes de trocar a senha; não há senha para mostrar. Se o Alexandre quiser a senha na tela com e-mail fora, é mudança de contrato (engenheiro-software).
- Textos do painel propostos por mim; revisão de UX pedida (R-20261108-060333).
- R-20261107-233521: (1) e (2) prontos no SDK; o shell já aceita perfis resolvidos (lib/acesso.ts entraEm). (3) perfis no /me/modulos depende do modulo-core; ligo quando o contrato chegar.
- 🟡 1 e 2 do apps/mobile (texto "a web do BKO"; e-mail ao voltar ao login) ficam para depois do build (apps/mobile congelado).
- Recados antigos ainda abertos na minha caixa: R-20261106-023316 (revisão UX T-0087), R-20261106-073350 e R-20261106-201027 (T-0089), não tratados nesta rodada.

## Pronto quando
Revisão de UX sem 🔴.
