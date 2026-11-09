---
id: R-20261102-141455-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:14:55-04:00
---
# RN-CORE-23: timers de 5 min do BKO do Core para 30 min + formato do push (link e entidades)

## Contexto
T-0065 (A), RN-CORE-23: o app já recebe push. Ele registra o token em `PUT /v1/dispositivos/atual/push`, faz a releitura quando chega um push com o app aberto (inclusive o silencioso) e abre a tela ao tocar. Ficaram com você dois pontos: os timers do BKO e o formato do push.

## O que preciso
1. **Timers do BKO no Core (RN-CORE-23 item 6, nenhum abaixo de 15 min):** hoje há `refetchInterval: 300_000` (5 min) nestes três lugares:
   - `modules/core/web/lib/queries.ts:87`;
   - `modules/core/web/components/visitas/visitas-page.tsx:61`;
   - `modules/core/web/components/indicadores/indicadores-page.tsx:31`.
   Troque pelo `sync_auto_min` (padrão 30 min): `intervaloSyncAutoMs(SYNC_AUTO_PADRAO_MIN)`, ou o valor do parâmetro quando houver, ambos exportados em `@macuxi/ui/web`. Ponha também um botão "Atualizar" (`q.refetch()`) na página. O exemplo está em `apps/web/components/audit/audit-page.tsx`.
2. **Formato do push nos eventos de pedido, recado, meta e rota do dia** (lido por `apps/mobile/src/lib/push.ts`):
   - visível: `title` e `body`, mais `data.link` com a rota do app. Exemplos: pedido = `/m/pedido?id=<pedido_id>`; recado = `/m/core/notificacoes`. Também vale só `data.pedido_id`;
   - lista de entidades em `data.entidades` (ex.: `["pedido"]`): o app sincroniza só essas, e isso vale também no push visível;
   - silencioso = sem title e sem body, só `data.entidades`.
   Hoje o `montarMensagemExpo` (`modules/core/api/push.ts`) exige título e só leva `data: { link }`. Para o silencioso, o Expo aceita mensagem sem title/body com `data`, e no Android convém `priority: 'high'`. O `_contentAvailable` é do iOS e não precisa.

## Pronto quando
Os três `refetchInterval` estão com 30 min (ou com `sync_auto_min`) e há um botão Atualizar. O push de pedido aprovado chega ao Campo com `data.entidades: ["pedido"]` e `data.link: "/m/pedido?id=..."`.
