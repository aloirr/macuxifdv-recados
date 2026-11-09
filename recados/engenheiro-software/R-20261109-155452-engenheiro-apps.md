---
id: R-20261109-155452-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:54:52-04:00
---
# T-0117 G2: BKO mostra o estado sem_conexao (aviso + Tentar de novo), só 401/423 vão ao login

## Contexto
Pedido R-20261109-153908-engenheiro-software (revisão G2 da T-0117): o SDK agora deixa a sessão do BKO em `sem_conexao` quando a restauração pelo cookie não alcança o servidor, e o `apps/web/components/app-shell.tsx:125` tratava todo status que não fosse `authenticated` como "Carregando…". Com isso, a aba sem rede ficava presa nessa tela (regressão).

## O que foi feito (só apps/web)
- `apps/web/lib/estado-shell.ts`: `estadoDaSessao(status)` (função pura) devolve `autenticada | sem_conexao | ir_ao_login | carregando`. Só `anonymous` (401/423 ou nenhum usuário) vai ao login.
- `apps/web/components/sessao-sem-conexao.tsx` (novo): `Notice tone="warning"` do kit com o `session.aviso` do SDK, a frase "Quando a conexão voltar, o backoffice abre de novo sozinho." e o `Button` primário "Tentar de novo" (testids `shell-sem-conexao` e `shell-sem-conexao-tentar`).
- `apps/web/components/app-shell.tsx`: com `sem_conexao`, o shell mostra esse aviso e o botão chama `tentarRestaurarSessao()`. O redirecionamento ao login usa `estadoDaSessao`. A volta sozinha vem do `useSession()` do SDK (eventos `online` e `focus`): com a renovação, o status passa a `authenticated` e o conteúdo aparece sem novo login.

## Testes
- `components/sessao-sem-conexao.test.tsx` (4 casos, com o AppShell renderizado):
  - em `sem_conexao`: o aviso e o "Tentar de novo" aparecem; "Carregando…", "Indo para o login…" e o conteúdo da página não;
  - o botão chama `tentarRestaurarSessao`;
  - `loading` mostra "Carregando…";
  - `anonymous` mostra "Indo para o login…".
- `lib/sessao-sem-conexao.test.ts` (6 casos, com o SDK real e o fetch falso):
  - aba nova sem rede: `sem_conexao`, com o usuário mantido;
  - a rede volta e "Tentar de novo" autentica sem novo login;
  - um 503 também dá `sem_conexao`;
  - 401 e 423 vão ao login e o usuário sai do navegador;
  - sem rede e depois 401 na nova tentativa: vai ao login.
- apps/web: lint verde; test verde (23 arquivos, 190 testes).
- Typecheck do apps/web: os meus arquivos passam. O único erro é de outro dono, `modules/vendedor/domain/pdf-pedido.ts:259` (`preco_data` não existe em `OrderPdfOrder`). É trabalho em andamento do modulo-vendedor (RN-VEN-18) e entra no typecheck do web pelo import do módulo.
- `verificar engenheiro-apps`: só a violação conhecida de `.vscode/settings.json`.

## Pendências
- modulo-vendedor: fechar o `preco_data` em `OrderPdfOrder` para o typecheck do apps/web voltar a ficar verde.
- designer-ux: pode revisar o texto e o visual do aviso (usa só `Notice` e `Button` do kit).
- Sem commit.
