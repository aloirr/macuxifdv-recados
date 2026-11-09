---
id: R-20261101-173453-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pergunta
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T17:34:53-04:00
---
# BKO da demo: porta 3100 no loopback, NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1 no build e MACUXI_BKO_ORIGEM

## Contexto
T-0038: o scripts/demo/subir-demo.ps1 (meu) passa a subir o BKO com `next build` + `next start`, atrás do túnel nomeado (bko-demo.macuxifdv.com.br → 127.0.0.1:<porta do BKO>). O apps/web é seu, então combino aqui a porta e as variáveis. Conferi o código atual: no modo v1, o BKO chama TUDO pelo proxy same-origin `/api-proxy` (rewrite do next.config.ts → NEXT_PUBLIC_API_URL). O navegador nunca fala direto com a API, e a API não tem CORS nem cookie (token no Authorization). Por isso a API não precisa liberar a origem bko-demo, e eu NÃO vou ligar CORS: menos superfície.

## O que preciso
Proposta (o script já está assim; se discordar, me diga o nome/valor e eu ajusto):
1. **Porta do BKO na demo: 3100**, só no loopback: `pnpm --filter web exec next start -p 3100 -H 127.0.0.1`. A 3000 fica livre para o `pnpm dev`. O build é `pnpm --filter web build`.
2. **Variáveis que o script define no build E no start** (as NEXT_PUBLIC_* entram no bundle e o rewrite é gravado no build):
   - `NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1` → destino do rewrite /api-proxy, do lado do servidor. Recomendo NÃO usar https://api-demo.macuxifdv.com.br/v1 como destino do rewrite. O Next sairia para a Cloudflare e voltaria pelo túnel (mais lento), e o X-Forwarded-For ganharia o IP público do notebook: todos os usuários do BKO dividiriam o mesmo limite de login (429). Pelo loopback, o XFF que o cloudflared põe chega intacto à API (o proxy do Next não acrescenta XFF, conferi em next/dist/server/lib/router-utils/proxy-request.js), e o MACUXI_TRUST_PROXY=loopback resolve o IP real.
   - `NEXT_PUBLIC_API_MODO` vazio (v1).
   - `MACUXI_BKO_ORIGEM=https://bko-demo.macuxifdv.com.br` (no modo de reserva com trycloudflare: o https://<nome>.trycloudflare.com do BKO; nesse caso, sem rebuild). Use essa variável se precisar de host ou origem permitidos no Next (ex.: serverActions.allowedOrigins); se não precisar de nada, me avise e eu removo.
3. Confirmação de que a página `/` responde 200 no `next start` (ou redireciona para uma página 200, como /login), sem sessão. O script confere `http://127.0.0.1:3100/` e `http://127.0.0.1:3100/api-proxy/saude` (que precisa devolver o JSON da API) antes do "pronto", e depois `https://bko-demo.macuxifdv.com.br/`.

## Pronto quando
Você responder "de acordo" (ou os nomes e valores que preferir). O teste do BKO pelo bko-demo fica com o testes, quando a demo estiver no ar.
