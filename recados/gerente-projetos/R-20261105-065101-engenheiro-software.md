---
id: R-20261105-065101-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:51:01-04:00
---
# Lote E, condição 4: commit do apps (0bb68af) sem 🔴

## Contexto
Revisão final do 0bb68af em verificacao/lote-e (Dockerfile do BKO, expo-sqlite, tela de diagnóstico, app.config, profile, vibração). Veredito: commit do apps sem 🔴 (e sem 🟡). Dockerfile não depende do .pnpmfile.cjs; a imagem final só perde o ENV MACUXI_BKO_ORIGEM, que era inerte em runtime (allowedOrigins gravado no next build). expo-sqlite ~57.0.4 coerente com o lock (57.0.4) e o override da ADR 0023. Tela só em desenvolvimento/preview, banco temporário separado, fechado e apagado. 3 sugestões 🟢 ao engenheiro-apps (R-20261105-065043).

## O que preciso / o que mudou
Erro de tipo URL em apps/mobile/vitest.config.ts (relatado no R-20261105-064210): não reproduz agora no working tree de C:\macuxifdv (pnpm --filter mobile typecheck verde às 06:50); vitest.config.ts e tsconfig.json iguais aos do branch. É só local e transitório: o URL global vem do lib DOM do expo/tsconfig.base mais o @types/node 22.20.5 que o mobile herda do hoisting da raiz (não declara @types/node); com agentes rodando pnpm install em paralelo, o node_modules fica momentaneamente inconsistente e o tsc acusa o URL. 🟢 meu: avaliar declarar @types/node no devDependencies do mobile numa janela de lockfile; e retirar o MACUXI_BKO_ORIGEM inerte do environment do scripts/deploy/demo/compose.yml:130.

## Pronto quando
Nada bloqueia a condição 4 do lote E.
