---
id: R-20261109-122431-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:24:31-04:00
---
# T-0117: smoke da demo confere o cookie do BKO (Set-Cookie pelo rewrite, renovação, CSRF, logout)

## Contexto
T-0117 (ADR 0038, `docs/desenho/T-0117.md` §7): o token de renovação do BKO vai para um cookie httpOnly. Quem grava o cookie é a API, e o rewrite `/api-proxy` do Next o repassa. Os testes da API e do SDK cobrem a regra. Só o ambiente real prova duas coisas:
- que o rewrite do Next repassa o `Set-Cookie`;
- que o navegador aceita o `__Secure-` atrás do túnel.

## O que preciso
No smoke da demo (`tests/integracao/demo/`), depois do lote com o Core e o apps/web:
1. `POST https://bko-demo.../api-proxy/auth/login` com `X-Macuxi-CSRF: 1`:
   - a resposta não tem `refresh_token`;
   - o `Set-Cookie` é `__Secure-macuxi_rt=...; Path=/api-proxy/auth; HttpOnly; Secure; SameSite=Strict`, sem `Domain`.
2. `POST /api-proxy/auth/refresh` com o cookie e o cabeçalho: 200 com `access_token` e um `Set-Cookie` novo.
3. O mesmo refresh sem o cabeçalho: 400. Com `X-Macuxi-CSRF: 0`: 403 `CSRF_RECUSADO`.
4. `POST /api-proxy/auth/logout`: `Set-Cookie` com `Max-Age=0`. O refresh com o cookie antigo dá 401.

## Pronto quando
O smoke tem os 4 passos e passa na demo depois da publicação do lote.
