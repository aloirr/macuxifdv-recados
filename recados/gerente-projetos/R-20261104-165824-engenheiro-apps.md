---
id: R-20261104-165824-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T16:58:24-04:00
---
# T-0073 passo 5: Início no shell (Campo vendedor/promotor e Gestão) sobre useInicio(); 4 lacunas pedidas ao Core; revisão visual pedida

## Contexto
T-0073, passo 5 (shell). O Início é a aba `index` de `(tabs)`, então já é a primeira tela depois do login e da carga (o `_layout` manda para /login sem sessão e para /sync sem a carga). A tela foi refeita sobre o `useInicio()` do Core (PR #84, a9d9fcc), seguindo docs/design/inicio.md. O shell não tem regra de negócio: a meta do dia, a situação, a rota e a "Equipe agora" chegam prontas na `VisaoInicio`, e o shell só escolhe texto, tom e cor.

## O que fiz
- `apps/mobile/src/app/(tabs)/index.tsx`: Início nas duas variantes.
  - **Campo** (vendedor e promotor, escopo `proprio`): data e saudação no fuso do tenant (toque abre o Perfil), sino com contador, recado do dia (`Cartao escuro`), Sua meta de hoje (grade de 2 colunas, "faltam N dias úteis", aviso de base defasada), 3 notificações com "Ver todas", **um só botão principal** ("Começar a rota · N paradas", "Seguir a rota", "Continuar visita · cliente"; sem parada pendente, vira secundário "Rota de hoje concluída" ou "Ver rota"), cards do slot e rodapé "Sincronizado às 8h05 · N na fila", ou "Sem sinal · última sincronização 8h05" em âmbar.
  - **Gestão** (escopo `equipe`): data com a equipe, recado, cards do slot com ordem < 50 (o "Pedidos para aprovar" do Gestor, ordem 10), Meta de hoje da equipe, Equipe agora (toque abre `/m/equipe-membro` se a página existir), os demais cards e o rodapé. Não há botão de 52.
  - **Promotor**: recebe só os indicadores com meta, porque é o Core quem filtra (RN-PRO-01). O card de aprovação não aparece para ele: o Gestor só o registra no app `gestao` e com `fila_aprovacao.ver`. O aviso "Sincronize para ver as vendas" nunca aparece para o promotor.
  - **Offline**: tudo sai das linhas do aparelho e da cópia de `core.inicio@1`. Puxar para baixo = Sincronizar. Não há timer novo.
- `apps/mobile/src/components/inicio.tsx`: os blocos (CabecalhoInicio, RecadoDoDia, GradeDeMetas, UltimasNotificacoes, MetaDaEquipe, EquipeAgora, RodapeSync), com o visual da T-0072 (`Cartao`, `Botao`, `ProgressBar height={6}` e os ícones bell, sun e map). Todos os alvos de toque têm 48 dp ou mais.
- `apps/mobile/src/lib/inicio.ts` + `inicio.test.ts`: textos e tons, puros, com **24 testes**:
  - saudação de 5h, 12h e 18h no fuso;
  - os 5 estados de situação;
  - cobertura em pontos-base;
  - base defasada;
  - as horas das notificações;
  - os 4 estados do botão da rota;
  - Equipe agora;
  - rodapé;
  - `ordenarCards`.
- `apps/mobile/src/components/extensoes-shell.tsx`: `CardsDoInicio` ordena por `ordem` (ausente = 100, empate na ordem do registro) e aceita `faixa` 'topo' ou 'fim'.
- 🟢 3 do R-20261104-042956: `limparHistoricoDoShell()` agora é chamado em `fecharSessaoLocal` (logout e aparelho bloqueado), em `state/plataforma.tsx` e `lib/transicao-modulo.ts`.
- Saíram do Início: a lista "Seus módulos" (as abas já cobrem) e o SyncStamp duplicado. Ficou o banner de módulo desativado com itens na fila.

## Testes
- eslint nos 7 arquivos tocados: limpo.
- vitest de inicio, transicao-modulo e abas: 40 de 40 verdes.
- tsc --noEmit do apps/mobile: verde (exit 0) com todos os arquivos do Início. Depois mudei 2 linhas em `state/plataforma.tsx` (o import e a chamada de `limparHistoricoDoShell()`, que não recebe argumento). As duas reexecuções estouraram o tempo (590 s), com a máquina carregada pelos outros agentes. Esse resultado fica para o CI limpo confirmar.
- O bundle Android não foi rodado nesta rodada (limite de 60 min). Precisa rodar antes do próximo build EAS.

## Pendências
1. **modulo-core** (R-20261104-163012), todos aditivos no @1:
   - `cliente_nome` no MembroAgora, para mostrar "Em visita · cliente";
   - os indicadores sem realizado quando não há cópia (hoje o shell usa `base.dia === null`);
   - `equipe_nome` na visão: na API v1 a sessão não tem `team_name`, então o cabeçalho da Gestão e a assinatura do recado ficam sem a equipe;
   - export para marcar como lida a notificação tocada no Início.
2. **designer-ux**: revisão visual pedida em R-20261104-164046, com 7 escolhas para confirmar.
3. **Vibração leve**: espera o expo-haptics, que o engenheiro-software deixou para a próxima janela de install.
4. **R-20261104-164000 do Alexandre** (chegou durante a rodada, para o gerente, com cópia para mim): ele pede outro Início, com "6 visitas hoje · 3 feitas", cards de Orçamentos e A faturar do Vendedor, e no fim **só o Sincronizar**, sem "Começar a rota". Isso conflita com o docs/design/inicio.md ("Começar a rota" como principal). O gerente decide com o designer-ux. Do meu lado, os cards novos entram sozinhos pelo `inicio.cards` e o rodapé troca em 1 linha. Sobre a área segura do topo: o `Screen` já soma `insets.top`; confiro no próximo APK.
5. `verificar`: o meu escopo está OK. As 4 "violações" são os anexos do Alexandre em `.coord/recados/anexos/` (sem dono), não são minhas.
