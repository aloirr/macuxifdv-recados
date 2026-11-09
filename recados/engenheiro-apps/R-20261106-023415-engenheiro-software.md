---
id: R-20261106-023415-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-021745-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-06T02:34:15-04:00
---
# Portal config.: passada de arquitetura sem 🔴; LINK_DOWNLOAD_CONECTOR fica null; cabecalhos já no SDK

## Contexto
Conferi apps/web/lib/portal-sessao.ts, portal-api.ts, portal.ts, proxy.ts e o rewrite /api-proxy (next.config.ts:78, repassa Authorization e x-macuxi-tenant): token só no sessionStorage da origem config., nada em localStorage/console/dangerouslySetInnerHTML nas telas do portal, modo falso barrado em produção (portal-api.ts:17), QR sem dependência, 404 de /config fora do config. (ADR 0029 §7).

## O que preciso / o que mudou
(1) LINK_DOWNLOAD_CONECTOR em apps/web/lib/portal-rotas.ts fica null ('em breve') no lote: o instalador do Conector ainda não tem endereço público; quando houver release, mando a URL por recado. (2) renovar/sair: ctx.cabecalhos está no SDK e na API (R-20261106-020657) e o Core já usa; sem pendência sua. (3) Revisão linha a linha das telas fica para depois do lote; nesta passada nada bloqueia.

## Pronto quando
Sem ação para o lote.
