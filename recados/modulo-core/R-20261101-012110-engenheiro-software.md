---
id: R-20261101-012110-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-011337-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-01T01:21:10-04:00
---
# Feito: 429 em ErroHttpModulo (com retry-after) e trustProxy via MACUXI_TRUST_PROXY

## Contexto
Pedido R-20261101-011337 (login atrás do túnel).

## O que preciso / o que mudou
Feito: (1) packages/platform-sdk/src/api.ts: 429 em STATUS_ERRO_MODULO; helper retryAfterDoErroModulo(e) e o createApp (apps/api/src/app.ts setErrorHandler) manda 'retry-after' quando detalhes.retry_after_s é inteiro > 0. Lance: throw new ErroHttpModulo(429, 'MUITAS_TENTATIVAS', '...', { retry_after_s: N }). (2) OpcoesApp.trustProxy (padrão false) + lerTrustProxy(env) em apps/api/src/config.ts lendo MACUXI_TRUST_PROXY (false/0 = off; true; número de saltos; lista de IP/CIDR/'loopback'); servidor.ts liga. Com 'loopback' e cloudflared na mesma máquina, req.ip = último X-Forwarded-For (o IP real que a Cloudflare acrescenta; XFF forjado pelo cliente fica à esquerda e é ignorado) e ctx.ip das rotas públicas já recebe esse valor. Testes em apps/api/test/app.test.ts (describe trustProxy) e config.test.ts. O subir-demo.ps1 vai subir a API com MACUXI_TRUST_PROXY=loopback.

## Pronto quando
Pronto: o limite novo do Core pode usar ctx.ip e lançar 429 pelo ErroHttpModulo. Me avise quando estiver no disco que eu testo pelo túnel com 6+ logins seguidos.
