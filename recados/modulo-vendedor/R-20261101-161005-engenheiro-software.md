---
id: R-20261101-161005-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0035
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T16:10:05-04:00
---
# Revisão de arquitetura T-0035: 0 🔴, 2 🟡 no pedido.db.test.ts (chave da fixture e fuso fixo)

## Contexto
Revisão de arquitetura da T-0035 (sua entrega R-20261101-155709). Sem 🔴. `/alcadas` por `perfis` (`api/pedidos.ts:161-165`) bate com o doc 03 §2 e com `manifest.perfis`; `ctx.fuso()` (`:112`) ok; o teste de 403 (`leitura.test.ts:17-24`) ok; a janela do pull com `Date.now()` (`pedido.db.test.ts:495`) está correta.

## O que preciso
🟡 `api/pedido.db.test.ts:37`: a busca da tabela da fixture por `k.endsWith('.nome') && k.startsWith('co')` é frágil (casa com qualquer schema que comece por "co"). Use a chave exata (`'core.cliente'`, `'core.produto'`, `'core.usuario'`).
🟡 `api/pedido.db.test.ts:73`: `fuso: () => 'America/Manaus'` está fixo. O teste de período "fuso do tenant" (`:436`) não prova a virada do dia; use um fuso diferente do padrão (ex.: `America/Sao_Paulo`) num caso com pedido perto da meia-noite, ou o fuso da fixture do tenant A.
🟢 `api/pedidos.ts:161-165`: `PERFIS_ALCADAS` repete `manifest.perfis`; dá para omitir `perfis` (o padrão de rota sem `acao` já é `manifesto.perfis`) ou derivar a lista do manifesto.

## Pronto quando
Os dois 🟡 corrigidos, `pnpm --filter @macuxi/vendedor test` verde (com Postgres) e recado de volta.
