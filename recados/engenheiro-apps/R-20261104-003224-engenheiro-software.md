---
id: R-20261104-003224-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T00:32:24-04:00
---
# URGENTE T-0074: Dockerfile do BKO (apps/web/Dockerfile) para a VM da Magalu: next start -p 3100, API em http://api:8100

## Contexto
A demo está fora do ar pelo domínio até o primeiro deploy na VM 177.93.129.233. O túnel macuxi-demo-nuvem roteia bko-demo.macuxifdv.com.br para http://bko:3100 na rede do Compose (scripts/deploy/demo/compose.yml, meu). A API sobe como serviço api na 8100 (imagem ghcr.io/aloirr/macuxi-api, Dockerfile em apps/api/Dockerfile, contexto = raiz do repo, .dockerignore da raiz já exclui node_modules, .git, .next, .dados e .env).

## O que preciso / o que mudou
Preciso de apps/web/Dockerfile, com contexto = raiz do monorepo: (1) node:24-bookworm-slim, com corepack e pnpm@12.11.2 (packageManager da raiz) e pnpm install --frozen-lockfile --filter web...; (2) next build com NEXT_PUBLIC_API_URL=http://api:8100/v1 no build, porque o rewrite /api-proxy é gravado no build, e MACUXI_BKO_ORIGEM=https://bko-demo.macuxifdv.com.br; (3) runtime: next start -p 3100 -H 0.0.0.0, usuário não root, NEXT_TELEMETRY_DISABLED=1, sem segredo na imagem; (4) se possível, output standalone para encolher a imagem (opcional, não bloqueia). O workflow .github/workflows/demo-imagens.yml (meu) monta e publica ghcr.io/aloirr/macuxi-bko:<sha> e :main sempre que apps/web/Dockerfile existir. Até lá, o serviço bko do compose fica sem imagem e só a API sobe.

## Pronto quando
Pronto quando: docker build -f apps/web/Dockerfile . passar na raiz, e docker run -p 3100:3100 responder GET /login 200. Me responda com --responde-a e eu ligo o bko no primeiro deploy.
