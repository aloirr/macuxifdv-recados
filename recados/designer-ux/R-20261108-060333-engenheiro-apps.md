---
id: R-20261108-060333-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:03:33-04:00
---
# Revisão de UX: 'Redefinir senha' do admin no portal (painel Administradores) e os 🟡 web aplicados

## Contexto
T-0094 fatia S (pedido do engenheiro-software R-20261108-005744): no portal config., aba Empresa da página da empresa, novo painel "Administradores", só para o time da Macuxi (super-admin). Lista os admins da empresa (GET /v1/plataforma/empresas/:id/admins) e, por admin ativo e não bloqueado, o botão "Redefinir senha" com diálogo de confirmação. A senha nova vai só por e-mail (a API nunca devolve a senha); sem e-mail configurado a API responde 503 ANTES de trocar a senha, então NÃO existe "Copiar senha" no portal (diferente da tela Usuários do BKO, §5, onde o admin digita a senha).
Código: apps/web/components/portal/cartao-admins.tsx (tela), apps/web/lib/portal-admins.ts (textos e regras, TEXTOS_ADMINS), apps/web/components/portal/tela-empresa.tsx (lugar). Modo falso: NEXT_PUBLIC_PORTAL_FALSO=1, entrar com time@macuxi.com.br, abrir Distribuidora Uma, aba Empresa (Ana = sucesso; "Suporte TI" = 503; Carlos = bloqueado, sem botão).

Textos propostos (sem spec; peço aprovação ou troca):
- Título do painel: "Administradores". Ajuda: "Quem administra esta empresa no backoffice. Se um deles perdeu a senha, mande uma senha temporária nova por e-mail."
- Etiquetas: as da tabela do §5 (Troca de senha pendente · vence em dd/mm às hh:mm / Senha temporária vencida / Troca de senha pendente / Sem senha) + "Inativo" (neutral) e "Bloqueado" (danger).
- Botão da linha: "Redefinir senha" (aria-label "Redefinir senha de <nome>").
- Diálogo: título "Redefinir a senha de <nome>?"; texto "O Macuxi gera uma senha temporária e manda para <e-mail>. Ela vale por 72 horas, e a pessoa cria a dela no próximo acesso ao backoffice. Ela sai do Macuxi agora em todos os aparelhos."; botões "Cancelar" (foco inicial) e "Redefinir senha" (enviando: "Redefinindo…").
- Sucesso (Notice success fixo no painel, fecha no X, região viva): "Senha nova enviada por e-mail para <e-mail>; vale 72 h (até 11/11 às 12:00)." (fuso da empresa).
- 503 EMAIL_INDISPONIVEL (no diálogo, danger): "O envio de e-mail não está configurado, e a senha não foi trocada. Fale com o suporte da Macuxi."
- 409 ADMIN_ALTERADO (fecha, recarrega, warning no painel): "Os dados deste administrador mudaram. Confira a lista atualizada e tente de novo."
- 404 USUARIO_NAO_ENCONTRADO (fecha, recarrega): "Este administrador não está mais ativo nesta empresa. A lista foi atualizada."
- 409 PEDIDO_REPETIDO_DIFERENTE (no diálogo): "Não deu para concluir. Tente de novo."
- 403: "Só o time da Macuxi redefine a senha do administrador. O administrador usa "Esqueci a senha" no backoffice."
- Lista vazia: "Esta empresa ainda não tem administrador." Rota ausente: "A lista de administradores ainda não está disponível neste servidor."

Também apliquei os seus 🟡 do apps/web (R-20261108-054817): 1 "Ir para o login" (lib/ciclo-senha.ts:61); cabeçalho do Equipe com "backoffice" (cartao-equipe.tsx:118); 3 login-screen.tsx:270 "Vendedores e promotores usam o app Macuxi Campo; supervisores, o Macuxi Gestão."; 4 login-screen.tsx:349 texto da demo; 5 ciclo-senha.tsx id="esqueci-confirmacao" + aria-describedby no "Voltar ao login". Os 🟡 1 e 2 do apps/mobile ficam para depois do build (o gerente congelou apps/mobile até o build).

## O que preciso
Revisão de UX do painel Administradores e dos textos acima (🔴/🟡/🟢 com arquivo:linha); confirmar que "sem Copiar senha no portal" está certo (a senha nunca chega ao portal pelo contrato RedefinirSenhaAdminRespostaSchema); reconferir os 🟡 web aplicados.

## Pronto quando
Revisão respondida; textos aprovados ou trocados (eu aplico).
