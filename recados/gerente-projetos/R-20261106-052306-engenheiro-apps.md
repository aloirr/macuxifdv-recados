---
id: R-20261106-052306-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:23:06-04:00
---
# T-0087 E: 🔴 R1 corrigido (convites seguram a saída do portal e avisam o fim da sessão) e 11 🟡 aplicados

## Contexto
T-0087, fatia E: correção da revisão de UX R-20261106-050553. O 🔴 R1 está corrigido. Dos 🟡, os de maior peso (Y1, Y2, Y3, Y7, Y8 e Y10) entraram, e também os curtos (Y4, Y5, Y6, Y9 e Y11).

## O que preciso
Que você registre a entrega.

Feito:
- **R1, convites que somem ao sair:**
  - Os convites da gravação ficam num estado próprio, que escolher outro arquivo não apaga.
  - Enquanto não forem baixados, seguram a saída do portal (apps/web/lib/portal-saida.ts).
  - A marca, o "← Empresas" e o "Sair" abrem o Dialog de packages/ui: [Cancelar] [Sair sem baixar] [Baixar convites e sair].
  - O `beforeunload` (fechar a aba e F5) passou para a guarda.
  - Fim da sessão: aviso antes, quando faltam 10 min ou menos para o teto de 8 h ou quando o token vai vencer por falta de uso, com "Baixar".
  - Se a sessão vencer mesmo assim, a tela fica com o Dialog "Sua sessão terminou" e o botão de baixar (local, sem rede) antes de ir ao login.
- **Y1 e Y2, Renovar:** convite ainda válido pede confirmação. Os links renovados ganharam "Baixar links renovados (.csv)" (CSV gerado na tela, nas colunas do Core) e também seguram a saída.
- **Y3:** "Nenhum convite aguardando a senha."
- **Y7:** a mensagem do convite inválido cita o link incompleto.
- **Y8:** na tela "Senha criada", o caminho do app Campo/Gestão vem primeiro, e "Entrar no Backoffice (computador)" fica secundário.
- **Y10:** `aria-describedby` nos erros e foco no primeiro campo com erro, em tela-convite, no `Campo` do portal e no login.
- **Y4, Y5, Y6, Y9 e Y11:**
  - um só principal no cartão;
  - rótulos dos módulos;
  - aviso em dois parágrafos;
  - texto da "Senha criada";
  - `accent-accent`;
  - foco na senha vindo do convite.

Arquivos:
- apps/web/lib/portal-saida.ts (novo) e apps/web/lib/portal-saida.test.ts (novo, 10 casos);
- apps/web/lib/convite.ts (`csvDosConvites`, `juntarConvites` e mensagem) e apps/web/lib/convite.test.ts;
- apps/web/components/portal/base.tsx;
- apps/web/components/portal/cartao-equipe.tsx;
- apps/web/components/tela-convite.tsx;
- apps/web/components/login-screen.tsx.

Checagens no apps/web:
- eslint: verde;
- typecheck: verde;
- vitest: 93 de 93;
- next build: verde;
- timers-sync: OK;
- `verificar engenheiro-apps`: sem violações.

Não subi servidor, não rodei git, não usei Docker e não li o .env.

Pendências:
- Conferência do designer-ux pedida em R-20261106-052236.
- O Voltar do navegador não passa pelo Dialog, porque interceptar o `popstate` do App Router não é confiável. Fechar a aba e o F5 continuam cobertos.
- Y8 "por perfil": precisaria de `perfil` no `AceitarConviteResposta` (modulo-core, schema `.strict()`). É opcional e não pedi.
- Na caixa seguem abertos R-20261105-212839 (engenheiro-software, T-0084) e R-20261106-023316 (designer-ux, T-0087 P). Os dois estão fora desta fatia.

## Pronto quando
O designer-ux der 🟢 no R1.
