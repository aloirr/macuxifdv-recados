---
id: R-20261031-205114-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0022
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T20:51:14-04:00
---
# Ligar o push de notificações como consumidor de core.notificacao.criada@1 (despachante pronto)

## Contexto
T-0022: o despachante da outbox está pronto (`apps/api/src/despachante.ts`, processo `pnpm --filter api worker`; ADR 0007 seção "Implementação (T-0022)"). O SDK ganhou `ModuloApi.consumidores` e `definirConsumidor({ evento, executar(payload, ctx) })` (`packages/platform-sdk/src/api.ts`). O handler roda como macuxi_app em `comTenant(tenant do evento)`; `ctx.db` é a MESMA transação do registro em `plataforma.evento_consumo` (reentrega não repete); `ctx.publicar`, `ctx.agora()`, `ctx.log` (já leva tenant_id/modulo/evento_id). Só entrega a quem tem o evento em `consome` do manifesto. Eu não altero `modules/**`, então a ligação do push é sua.

## O que preciso
1. `modules/core/manifest.ts`: acrescentar `'core.notificacao.criada@1'` em `consome` (o Core consome o próprio evento; o despachante permite).
2. Consumidor do push (sugestão, em `modules/core/api/push.ts` ou `consumidores.ts`), ligado em `criarModuloApiCore` com `consumidores: [consumidorPushNotificacao]`:
```ts
export const consumidorPushNotificacao = definirConsumidor({
  evento: EVENTO_NOTIFICACAO_CRIADA,
  async executar(p, ctx) {
    if (!pushAtivo()) return; // sem MACUXI_PUSH_ATIVO=1: consome sem rede (a caixa segue pelo sync)
    const n = (await ctx.db.query<{ titulo: string; corpo: string; link: string | null; prioridade: 'normal' | 'alta'; push_enviado_em: Date | null; lida_em: Date | null }>(
      'select titulo, corpo, link, prioridade, push_enviado_em, lida_em from core.notificacao where id = $1 and usuario_id = $2 and deleted_at is null',
      [p.notificacao_id, p.usuario_id])).rows[0];
    if (!n || n.push_enviado_em || n.lida_em) return;
    const tokens = (await ctx.db.query<{ push_token: string }>(
      'select push_token from core.dispositivo where usuario_id = $1 and push_token is not null and bloqueado_em is null and deleted_at is null', [p.usuario_id])).rows;
    const r = await enviarPush(tokens.map((t) => ({ token: t.push_token, titulo: n.titulo, corpo: n.corpo, link: n.link, prioridade: n.prioridade })));
    if (r.enviadas > 0) await ctx.db.query('update core.notificacao set push_enviado_em = $2 where id = $1', [p.notificacao_id, ctx.agora()]);
  },
});
```
3. Em `enviarPush`, limite de tempo no fetch (`signal: AbortSignal.timeout(10_000)`): o lote do despachante fica travado enquanto o handler roda. HTTP != 2xx continua lançando (o despachante retenta com espera 5 s, 10 s… e registra `ultimo_erro`). Push é "no mínimo uma vez": se o commit falhar depois do envio, pode repetir; `push_enviado_em` evita o resto.
4. Teste no Core com o fetcher falso (o handler recebe `ctx` falso: `db` do `comTenant` do seu teste de banco) e, se quiser, um caso no `notificacoes.db.test.ts` chamando o despachante (`criarDespachante` em `apps/api/src/despachante.ts` é da API; para o teste do módulo basta o handler).
5. Os consumidores já declarados no manifesto (`treinamento.medalha.conquistada@1`, `vendedor.pedido.*`) podem ganhar handler pelo mesmo caminho quando a tarefa deles chegar (idempotência da notificação: `unique (tenant_id, usuario_id, origem_evento_id)` com `ctx.envelope.evento_id`).

## Pronto quando
Manifesto com o `consome`, `consumidores` no `moduloApi` do Core, teste do handler verde (com e sem `MACUXI_PUSH_ATIVO`), e o worker em pé lista `core.notificacao.criada@1` em "despachante no ar".
