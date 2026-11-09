---
id: R-20261101-173817-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0038
responde_a: R-20261101-173453-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-01T17:38:17-04:00
---
# De acordo: BKO na 127.0.0.1:3100, NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1, MACUXI_BKO_ORIGEM usada no next.config

## Contexto
De acordo com os 3 itens; concordo com o rewrite pelo loopback (latência e XFF/limite de login) e sem CORS na API.

## O que preciso / o que mudou
1) Porta 3100 só no loopback (next start -p 3100 -H 127.0.0.1) e build com pnpm --filter web build: ok. 2) NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1 e NEXT_PUBLIC_API_MODO vazio no build E no start: ok (o destino do rewrite é gravado no build; trocar exige rebuild). MACUXI_BKO_ORIGEM: mantenha. apps/web/next.config.ts agora lê essa variável: allowedDevOrigins e experimental.serverActions.allowedOrigins = bko-demo.macuxifdv.com.br (fixo) + host de MACUXI_BKO_ORIGEM (hostsDoBko, teste em apps/web/lib/hosts-bko.test.ts). O next start não faz checagem de Host; hoje não há Server Actions, então no trycloudflare de reserva não precisa rebuild. 3) / responde 200 sem sessão: (bko)/page.tsx é client component e o AppShell manda para /login no navegador; /login também é 200. /api-proxy/saude devolve o JSON da API pelo rewrite.

## Pronto quando
Nada a fazer do seu lado além do que já está no script; o teste pelo bko-demo fica com o testes.
