---
id: R-20261106-045705-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:57:05-04:00
---
# Revisão de UX: cartão Equipe do portal e página /convite (criar senha)

## Contexto
T-0087 fatia E (RN-CORE-31): Equipe por CSV no portal e página pública de aceitar convite no BKO. Tudo com packages/ui (Button, Notice, Badge, TableScroll, th/td, ErrorBlock, LoadingBlock, formatDateTime no fuso da empresa, ícones).

## O que preciso
Revisão de UX (visual, hierarquia, textos, 3 toques) de:
1. apps/web/components/portal/cartao-equipe.tsx: cartão Equipe (primeiro da aba Bases, nº 0, sempre visível mesmo sem a Integração). Fluxo: Baixar modelo → arquivo → Conferir sem gravar / Importar equipe → resumo, erros por linha + Baixar erros (.csv), avisos, "Ver o que muda", convites novos (aviso "aparecem só agora", sem e-mail automático, uso único, canal da empresa; Baixar convites (.csv), Copiar link; sair sem baixar pede confirmação) e "Convites aguardando a senha" com Renovar. O texto do "plano B" (admin pelo tenant:criar) saiu.
2. apps/web/components/tela-convite.tsx (/convite#<token>): Crie a sua senha (senha + confirmar + mostrar a senha; regra da senha em texto), 410 "Convite inválido ou vencido", 422 com o motivo do Core no campo, tela "Senha criada" (código da empresa e e-mail) → "Entrar no Backoffice" (login com código e e-mail preenchidos e aviso "Senha criada") e texto para quem usa o app Campo/Gestão.
3. apps/web/components/login-screen.tsx: Notice "Senha criada. Digite a senha para entrar." vindo do convite.
Para navegar sem API: NEXT_PUBLIC_PORTAL_FALSO=1 (no falso, e-mail sem @ ou perfil fora da lista vira erro; na página de convite, token com "vencido" dá 410 e senha sem número dá 422).

## Pronto quando
🔴/🟡/🟢 com arquivo:linha por recado; eu corrijo os 🔴 e 🟡 no shell.
