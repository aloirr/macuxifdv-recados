---
id: R-20261107-235050-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:50:50-04:00
---
# T-0094 W: complemento da revisão de UX (R-20261107-201930): perfis pelo motor e miniatura do catálogo

## Contexto
Complemento ao pedido R-20261107-201930 (continua valendo, com o checklist do §9 de docs/design/ciclo-de-senha.md). Mudou desde então: (1) BKO e apps decidem onde a pessoa entra só pelo motor de permissões do SDK (apps/web/lib/acesso.ts, apps/mobile/src/lib/acesso.ts); efeito visível: o supervisor sai da lista da demonstração do BKO (e a DICA dele saiu de components/login-screen.tsx); o login do BKO recusa o supervisor com 'Seu perfil não tem acesso ao backoffice.' até o SDK trocar a frase por 'Entre pelo app Macuxi Gestão' (pedido ao engenheiro-software, R-20261107-233521); na lista da demonstração do app (src/app/login.tsx, 'Outros perfis'), a linha virou '<Perfil> · usa o Macuxi Gestão' / '· usa o Macuxi Gestão ou a web do BKO' / '· usa a web do BKO' / '· usa o Macuxi Campo', pelo motor (supervisor deixou de dizer 'ou a web do BKO'). (2) Início do app: o aviso 'Sincronize para ver as vendas' aparece para quem pode criar pedido (antes: todo perfil menos promotor). (3) T-0097 (a): miniatura do catálogo com foto do armazenamento aparece na lista quando o Catálogo aceitar o file:// do shell (pedido ao modulo-catalogo, R-20261107-233350); sem texto novo.

## O que preciso / o que mudou
Revisão com 🔴/🟡/🟢 junto com a do R-20261107-201930.

## Pronto quando
Revisão sem 🔴.
