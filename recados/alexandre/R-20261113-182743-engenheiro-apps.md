---
id: R-20261113-182743-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T18:27:43-04:00
---
# T-0170 v1.0.6 shell: barra de 6 no Campo, sino em todas as telas com balão, rotas pelo manifesto (falta navegacao da Performance no Core)

## Contexto
T-0170 (v1.0.6), encaixes no shell do app (apps/mobile), na branch trabalho/v1.0.6, sem commit.

## O que fiz
1. **Barra com 6 posições no Campo:** `MAX_ABAS_POR_VARIANTE` em `apps/mobile/src/lib/abas.ts` (Campo 6, Gestão 5). Fica Início, Rota, Clientes, Pedidos, Performance e Mais. Usado em `(tabs)/_layout.tsx` e `(tabs)/mais.tsx`.
   - A aba Performance aparece quando a página `performance` do Core tiver `navegacao: 'Performance'` e o manifesto trocar 'Metas' por 'Performance' em `apps.campo.abas`. Isso foi pedido ao modulo-core (R-20261113-172728). No PC, a página já existe, mas ainda sem `navegacao`.
2. **Sino:** `apps/mobile/src/components/sino.tsx` e `apps/mobile/src/lib/sino.ts` (puro, com teste).
   - Botão de 48 dp com o ícone bell. O número vem do `useNotificacoes().naoLidas` do Core, lido uma vez no layout (`ProvedorContagemSino`), escondido com 0 e "9+" acima de 9.
   - O toque abre um balão (Modal com fundo escurecido) com o `BalaoRecadosETarefas` do Core.
   - "Ver todos" abre `/m/recados-e-tarefas`, ou `/m/notificacoes` se a página não existir. A tarefa abre `/m/tarefa?id=`.
   - Todas as navegações passam por `bloqueioDoShell.tentarSair`, por causa da RN-VEN-38.
   - **Telas de módulo:** o layout das abas entrega `<Sino/>` ao `ProvedorSinoCabecalho` do kit (pedido ao designer-ux, R-20261113-173653; ele já está no PC). O `CabecalhoTela` o desenha em todas as telas.
   - **Início:** o sino fica ao lado da saudação, porque o Início não usa o `CabecalhoTela`. O "Ver todos" dos recados do Início também vai a Recados e tarefas.
   - O kit e o balão do Core são lidos de forma opcional (acesso por namespace), para o shell não quebrar se uma das costuras não entrar no corte. Troco por import direto no Oficial.
3. **Rotas:** o shell já serve `/m/<caminho>` pelo manifesto. As páginas `performance`, `recados-e-tarefas` e `tarefa` são do Core e aparecem pelo registro dele, sem rota nova no shell.

## Verificação no PC
- `tsc --noEmit` do apps/mobile verde.
- eslint dos arquivos tocados verde.
- `pnpm --filter mobile bundle:android` verde: 2244 módulos, com o estado do Core e do kit no PC às 18h05.
- vitest `sino.test.ts` verde (3 testes). `abas.test.ts` e `sino.test.ts` verdes (13 testes). `coord verificar`: a única violação é `.vscode/settings.json`, que já estava fora do controle de versão antes desta tarefa e não é minha.

## Pendências
- **modulo-core:** `navegacao: 'Performance'` na página `performance` e 'Performance' em `manifest.apps.campo.abas`, no lugar de 'Metas'. Sem isso a aba não aparece e a Metas segue no Mais.
- Depois das costuras do Core e do kit: rodar de novo o bundle e o tsc, e tirar o print do aparelho para o corretor-redundancias, o design-de-marca e o designer-ux.
- **Premissa:** o Gestão segue com 5 posições, porque a imagem aprovada é do Campo.

## Arquivos
`apps/mobile/src/lib/abas.ts`, `apps/mobile/src/lib/abas.test.ts`, `apps/mobile/src/lib/sino.ts`, `apps/mobile/src/lib/sino.test.ts`, `apps/mobile/src/components/sino.tsx`, `apps/mobile/src/app/(tabs)/_layout.tsx`, `apps/mobile/src/app/(tabs)/index.tsx`, `apps/mobile/src/app/(tabs)/mais.tsx`
