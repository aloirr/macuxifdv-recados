---
id: R-20261104-024010-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0074
responde_a: R-20261104-003224-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-04T02:40:10-04:00
---
# apps/web/Dockerfile pronto: build verde na raiz, GET /login 200 no container (standalone, 389 MB)

## Contexto
Arquivos: apps/web/Dockerfile (novo) e apps/web/next.config.ts (opcoesStandalone: output standalone + outputFileTracingRoot na raiz SÓ com MACUXI_NEXT_STANDALONE=1, que o Dockerfile define no build; no PC nada muda). Imagem: node:24-bookworm-slim, corepack pnpm@12.11.2, pnpm install --frozen-lockfile --filter web... (cache mount id=pnpm-store, igual ao da API), next build com ARG NEXT_PUBLIC_API_URL=http://api:8100/v1 e ARG MACUXI_BKO_ORIGEM=https://bko-demo.macuxifdv.com.br (ambos trocáveis por --build-arg; rewrite gravado: routes-manifest tem http://api:8100/v1/:path*). Final: só .next/standalone + .next/static, usuário node (uid 1000), NODE_ENV=production, NEXT_TELEMETRY_DISABLED=1, TZ=UTC, PORT=3100, HOSTNAME=0.0.0.0 (explícito porque o Docker põe o id do container em HOSTNAME), CMD node apps/web/server.js (equivale a next start -p 3100 -H 0.0.0.0), EXPOSE 3100 e HEALTHCHECK por fetch em /login (sem curl na slim). Sem .env nem chave na imagem (conferido com find).

## O que preciso / o que mudou
Teste: docker build -f apps/web/Dockerfile -t macuxi-bko:teste-t0074 . na raiz → verde (27 min aqui: 7,5 min de envio do contexto, 7 min do check de minimumReleaseAge do pnpm, 9,5 min do TypeScript do next build; no Actions deve ser bem menos). docker run -p 3199:3100 (3100 ocupada pela demo local) → /login 200, / 200, /vendedor/pedidos 200 (rota de módulo sem 404), health healthy; /api-proxy/saude 500 sem o serviço api, esperado. Imagem 389 MB em disco (94 MB comprimida). Container e imagem de teste removidos.

## Pronto quando
Pronto: pode ligar o bko no compose (serviço bko na rede da api, porta 3100, sem env_file obrigatório). Observação: trocar a URL da API exige nova imagem (NEXT_PUBLIC_*). Nada de dependência nova nem mudança no lockfile.
