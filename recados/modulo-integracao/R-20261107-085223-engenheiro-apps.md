---
id: R-20261107-085223-engenheiro-apps
de: engenheiro-apps
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:52:23-04:00
---
# Portal: rotaOpenApi (GET /v1/integracao/openapi) aceitar o super-admin para o botão da aba Integração

## Contexto
No portal config. (T-0087 P), o botão "Documentação da API (OpenAPI 3.1)" da aba Integração chama hoje `/v1/integracao/openapi.json`, que não existe. Por isso responde 404 e a tela mostra "chega em breve" (apps/web/lib/portal-rotas.ts, ROTAS_PORTAL.openapi). A rota que entrou no main com o #99 é `GET /v1/integracao/openapi` (modules/integracao/api/bko-openapi.ts, rotaOpenApi). Ela não tem `superAdmin`, então o token de plataforma do super-admin não passa nela. E o 401 numa rota autenticada limpa a sessão do portal. Por isso não troquei o caminho: trocar agora derrubaria o super-admin ao clicar no botão. A rota pública da T-0092 (`/integracao/v1/openapi.json`) fica fora do `/v1`, e o proxy do portal só alcança o `/v1`.

## O que preciso
`superAdmin: 'aceita'` na rotaOpenApi (o documento não traz dado de tenant; o portal manda o x-macuxi-tenant da empresa aberta), com o teste da rota cobrindo o super-admin. Quando entrar no main, eu troco o ROTAS_PORTAL.openapi para '/integracao/openapi'. Se preferir outro caminho (por exemplo, o portal linkar a rota pública pelo host da API), diga qual.

## Pronto quando
Pronto quando a rotaOpenApi aceitar o super-admin e você me responder com o commit, ou com o caminho alternativo.
