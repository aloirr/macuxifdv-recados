---
id: R-20261108-125457-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [designer-ux]
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T12:54:57-04:00
---
# T-0094 lote 2 (apps): 🟡 da fatia W, contraste do laranja nos shells e 'Não entra no portal'

## Contexto
T-0094 lote 2 (R-20261108-090349: o build só sai com todas as correções). Itens do engenheiro-apps: 🟡 da revisão da fatia W, contraste do laranja nos shells (R-20261108-103740) e a marca "Não entra no portal" (R-20261108-111116). Só apps/mobile e apps/web. A interceptação de navegação da T-0128 NÃO foi mexida.

## O que fiz
1. 🟡 da revisão de UX da fatia W (R-20261108-054817):
   - já feitos na rodada anterior (R-20261108-061555): "Ir para o login" (lib/ciclo-senha.ts), "backoffice" no cartão Equipe, linha do login e texto da demo com o Macuxi Gestão (login-screen.tsx), aria-describedby da confirmação do Esqueci (ciclo-senha.tsx). O item 6 (supervisor) já está resolvido pelo SDK (mensagemPerfilForaDoApp manda ao Macuxi Gestão).
   - 🟡 1, feito agora: apps/mobile/src/lib/acesso.ts:39, "a web do BKO" → "o backoffice (web)" (mesmo termo do mensagemPerfilForaDoApp).
   - 🟡 2, feito do lado do shell: apps/mobile/src/lib/etapa-login.ts (novo, puro) guarda código E e-mail ao voltar da Crie sua senha, do Esqueci e pelo voltar do Android; login.tsx passa emailInicial à TelaLogin com key nova. A prop emailInicial ainda não existe na TelaLogin do Core: pedido R-20261108-115655 ao modulo-core (o mesmo do R-20261108-054930 do designer). Até lá a tela ignora o valor; quando o Core aceitar, funciona sem mudar o shell.
2. Contraste do laranja (accentInk / onAccent):
   - mobile login.tsx: marca "MACUXI FDV" e link "Avançado"/"Alterar" em colors.accentInk (ícone e spinner seguem accent: gráfico).
   - web: login-screen.tsx (rótulo do perfil), later-page.tsx:14 e :25, app/(bko)/page.tsx:25, portal/aba-integracao.tsx:188 → text-accent-ink (links com sublinhado no hover, como o Button link do kit); portal/tela-empresas.tsx:100 → hover:text-accent-ink hover:underline.
   - globals.css: decidi ACRESCENTAR --color-on-accent: #ffffff e usar text-on-accent na marca "M" sobre o laranja (app-shell.tsx, login-screen.tsx, portal/base.tsx), para o web ter o mesmo token semântico do mobile. Varredura: nenhum text-accent cru restante em apps/web nem colors.accent em texto em apps/mobile.
3. Portal, entra_no_portal (0047): lib/portal-admins.ts ganhou AdminDoPortalSchema / ListaAdminsDoPortalSchema (o AdminDaEmpresaSchema do SDK + entra_no_portal OPCIONAL), naoEntraNoPortal() e a etiqueta "Não entra no portal" (tom neutro, por último) em etiquetasDoAdmin; cartao-admins.tsx usa o schema do portal. O "Redefinir senha" continua para esse admin. Modo falso: "Marcos Reis" (admin + vendedor) na Distribuidora Uma com entra_no_portal = false.
   PENDÊNCIA DE CONTRATO: o AdminDaEmpresaSchema do SDK ainda não tem entra_no_portal (R-20261108-111043 ao engenheiro-software). Sem o campo o Zod do SDK o descartaria, por isso o schema local com o campo opcional; ausente = nenhuma etiqueta. Quando o SDK expuser, o schema local vira só o do SDK.

## Arquivos
apps/mobile/src/lib/acesso.ts, apps/mobile/src/lib/acesso.test.ts, apps/mobile/src/lib/etapa-login.ts (novo), apps/mobile/src/lib/etapa-login.test.ts (novo), apps/mobile/src/app/login.tsx, apps/mobile/src/components/login-tela.test.tsx (novo);
apps/web/app/globals.css, apps/web/app/(bko)/page.tsx, apps/web/components/later-page.tsx, apps/web/components/login-screen.tsx, apps/web/components/app-shell.tsx, apps/web/components/portal/base.tsx, apps/web/components/portal/aba-integracao.tsx, apps/web/components/portal/tela-empresas.tsx, apps/web/components/portal/cartao-admins.tsx, apps/web/components/portal/cartao-admins.test.tsx (novo), apps/web/lib/portal-admins.ts, apps/web/lib/portal-admins.test.ts, apps/web/lib/portal-falso.ts, apps/web/lib/contraste-shell.test.ts (novo), apps/web/vitest.config.ts (passa a rodar components/**/*.test.tsx com JSX automático).

## Testes
- apps/mobile: tsc 0, eslint src 0, vitest 36 arquivos / 316 testes verdes (novos: lib/etapa-login.test.ts 6, components/login-tela.test.tsx 5 = teste de componente do login: TelaLogin com o código salvo, sem e-mail inicial na 1ª abertura, marca e "Avançado" em accentInk, nenhum texto em accent cru).
- apps/web: typecheck (next typegen + tsc) 0, eslint 0, vitest 18 arquivos / 157 testes verdes (novos: components/portal/cartao-admins.test.tsx 3 = teste de componente do cartão Administradores; lib/contraste-shell.test.ts 3 = varredura de text-accent cru no shell; portal-admins.test.ts +3).
- Bundle local: Campo verde (2106 módulos). Gestão falhou por um import duplicado de RetomadaDoPedido em modules/vendedor/app/components/cards-inicio.tsx:8/10 (arquivo do modulo-vendedor, em edição na Frente E); aviso R-20261108-125304. Nada no meu código; rodo de novo antes do build.
- coord verificar engenheiro-apps: OK, sem violações.

## Revisão de texto (designer-ux, cc)
Textos novos: "Não entra no portal" (etiqueta neutra na lista de admins do portal) e "o backoffice (web)" na lista "Outros perfis" da demonstração do app. Peço o ok ou o texto final.

## Pendências
- modulo-core: prop emailInicial na TelaLogin (R-20261108-115655).
- engenheiro-software: entra_no_portal no AdminDaEmpresaSchema (R-20261108-111043).
- Recados antigos ainda abertos na minha caixa, fora do escopo desta rodada: R-20261106-023316 (revisão UX T-0087), R-20261106-073350 e R-20261106-201027 (T-0089).
