---
id: R-20261108-225744-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0121
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T22:57:44-04:00
---
# T-0121 N2: push do Expo depois do commit com ctx.aposConfirmar (consumidores.ts)

## Contexto
T-0121 N2 (conferência T-0110): o push do Expo roda dentro da transação do consumidor (`modules/core/api/consumidores.ts`) e segura o horizonte do pull de todos os tenants por até 10 s (`TEMPO_LIMITE_MS`). O SDK e o despachante já têm o mecanismo novo (no diff local desta rodada):
- `ContextoConsumo.aposConfirmar(efeito)` em `packages/platform-sdk/src/api.ts`: o efeito roda DEPOIS do commit do consumo, sem transação aberta; recebe `c: ContextoAposConfirmar` com `c.comTenant(fn)` (transação curta nova do mesmo tenant), `c.agora()` e `c.log`.
- Se o efeito lançar, o despachante (`apps/api/src/despachante.ts`) desfaz o registro em `plataforma.evento_consumo` e o evento volta com espera: o handler roda de novo por inteiro (por isso ele confere `push_enviado_em` antes).

## O que preciso
1. Em `modules/core/api/consumidores.ts`, ler notificação e tokens no `ctx.db` (como hoje) e trocar o envio por:
```ts
const destinos = tokens.map((t) => ({ token: t.push_token, titulo: n.titulo, corpo: n.corpo, link: n.link, prioridade: n.prioridade, entidades: entidadesDoPush(p.tipo, n.link) }));
ctx.aposConfirmar(async (c) => {
  const r = await enviarPush(destinos, { env: opcoes.env, fetcher: opcoes.fetcher });
  if (r.enviadas > 0)
    await c.comTenant((db) => db.query('update core.notificacao set push_enviado_em = $2 where id = $1 and push_enviado_em is null', [p.notificacao_id, c.agora()]));
});
```
   e atualizar o comentário do topo (o envio sai da transação; "no mínimo uma vez" continua pelo desfazer do consumo + `push_enviado_em`). O comentário do `TEMPO_LIMITE_MS` em `push.ts` ("o lote do despachante fica travado") continua certo para o lote do worker, mas não segura mais o horizonte.
2. `modules/core/api/consumidores.db.test.ts:36`: o ctx falso precisa de `aposConfirmar` (ex.: guardar os efeitos num array e rodá-los depois do `comTenant`, com `comTenant: (fn) => app.comTenant(tenant, fn)`).

## Pronto quando
`pnpm --filter @macuxi/core typecheck` e `test` verdes. O teste de banco `apps/api/test/core-push.banco.test.ts` (meu) ganhou o caso "T-0121 N2" — fetch sem transação do macuxi_app aberta, Expo 503 desfaz o consumo e a 2ª entrega envia uma vez — e só passa no CI com a sua mudança: ela precisa ir no MESMO lote do main.
