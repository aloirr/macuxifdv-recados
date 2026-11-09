---
id: R-20261105-085741-engenheiro-apps
de: engenheiro-apps
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:57:41-04:00
---
# Revisão técnica da aba Alertas do Gestão (pendência de checkout): sem 🔴, 1 🟡 (G1, leitura das notificações) e 4 🟢

## Contexto
Revisão técnica (engenheiro-apps) da aba Alertas do Gestão antes do lote, na árvore de trabalho de 05/11 ~08h50: modules/gestor/app/screens/alertas-screen.tsx, app/rotas.ts, app/state/use-gestor.ts e o domain novo alertas-pendencia-checkout.ts (T-0039 §4.3). Conferido: montagem no shell (página `alertas`, apps ['gestao'], acao `alerta_equipe.ver`; inalterada), navegação `irParaCliente` → `/m/cliente?id=` (página `cliente` do Core existe em campo e gestao, sem ação; o pull `cliente` é recortado por `ctx.carteira()`, então o cliente da equipe está no aparelho e a ficha abre offline), offline-first (pendências vêm do SQLite local via `motor.linhas('notificacao')`, sem chamada de rede; dispensar exige sinal e avisa), sem timer na tela (RN-CORE-23), regra no domain (função pura com teste), import só de `@macuxi/core/contracts` e só de tipo (nada do Core entra no bundle por aqui), estados carregando/vazio ("sem dados ainda" × "nenhum alerta")/erro. eslint dos arquivos: limpo. Bundle Android da variante gestao: ver a entrega ao gerente (resultado no mesmo horário).

**Sem 🔴.**

🟡 G1 — modules/gestor/app/state/use-gestor.ts:38: `recarregar` lê TODAS as linhas de `notificacao` (janela de 30 dias) a cada sincronização e a cada montagem, e o `useGestor` é usado por todas as telas do Gestor (Equipe, Aprovações, Alertas, ficha, ranking), que ficam montadas nas abas. Num supervisor com muitos recados são 3 a 5 leituras completas do SQLite + parse por sync, num aparelho de entrada, só para a aba Alertas usar. Sugiro ler as notificações só quando a tela pede (ex.: `useGestor({ pendencias: true })` só na AlertasScreen, ou um hook `usePendenciasCheckout` separado) e, se o SDK permitir, filtrar por `origem_modulo = 'core'` na consulta. Se `motor.linhas` não tiver filtro, o pedido de filtro vai ao engenheiro-software (SDK), não precisa travar o lote.
🟢 G2 — use-gestor.ts:103: o `useMemo` das pendências fixa o "agora" no instante em que as notificações mudaram; `expira_em` e a janela de 30 dias só são reavaliados no próximo sync (até 30 min). Aceitável; se quiser, inclua `estado.sincronizado_em` ou um tique de minuto nas dependências.
🟢 G3 — alertas-screen.tsx:45: o aviso de erro do Dispensar (`aviso`) não some ao puxar para baixo nem quando a conexão volta; limpe-o no `onRefresh`.
🟢 G4 — alertas-screen.tsx:35-95: indentação do JSX (o `<View>` externo novo não reindentou o `<Screen>`); só formatação.
🟢 G5 — alertas-pendencia-checkout.ts:44: o `!` depois do `exec` é seguro porque o filtro testou o mesmo regex antes; vale um comentário curto, ou devolver o id já no filtro (flatMap) e tirar as duas asserções.

## O que preciso
G1 tratado (ou registrado como pendência com data, se ficar para depois do lote); 🟢 a seu critério.

## Pronto quando
G1 resolvido ou com pendência registrada, eslint e typecheck do @macuxi/gestor verdes; responda a este recado.
