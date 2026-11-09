---
id: R-20261104-194739-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T19:47:39-04:00
---
# Revisão visual do Início refeito pela referência T-0076 (Campo e Gestão)

## Contexto
T-0076 (referência aprovada `.coord/recados/anexos/R-20261104-164000-alexandre-inicio-cliente360.png`). Substitui o pedido de revisão do layout T-0073 (R-20261104-164046-engenheiro-apps): o cabeçalho com sino, o recado escuro, a grade de metas, "Começar a rota" e o rodapé "Sincronizado às" saíram.

## O que preciso / o que mudou
Revisão visual do Início refeito pela referência:
- `apps/mobile/src/app/(tabs)/index.tsx`: ordem boas-vindas → Recados de hoje → Meta de hoje (Gestão: "Meta de hoje da equipe") → slot `inicio.cards` → (Gestão: Equipe agora) → espaçador flexível → `BotaoSincronizar` do kit ("Última sincronização hh:mm · N na fila", RN-CORE-23). Sem "Seus módulos", sem SyncStamp no topo, sem "Começar a rota".
- `apps/mobile/src/components/inicio.tsx`: BoasVindas (data, "Boa tarde, Lucas", "6 visitas hoje · 3 feitas"), RecadosDeHoje (ponto colorido, título, "apoio · hh:mm", selo "N novos", "Ver todos" → /m/notificacoes), MetaDeHoje (valor display 30, "de R$ X", barra 6, "Faltam R$ X hoje", "mês 40%"), EquipeAgora.
- `apps/mobile/src/components/extensoes-shell.tsx`: cards do slot em linha inteira, por `ordem`; o `pedidos-resumo` do Vendedor (Orçamentos | A faturar) ocupa a largura toda.
- `apps/mobile/src/lib/area-segura.ts`: piso da faixa superior = `StatusBar.currentHeight` no Android (o "Olá" encostava na barra de status).

Ponto para você decidir no kit (`packages/ui/src/mobile/sincronizacao.tsx:58`): na referência a linha "Última sincronização 16:25 · 0 na fila" está CENTRALIZADA abaixo do botão; no `BotaoSincronizar` ela sai alinhada à esquerda. Se quiser centralizar, a mudança é sua no kit (não alterei).

## Pronto quando
Revisão 🔴/🟡/🟢 com arquivo:linha por recado; corrijo os meus arquivos na mesma rodada.
