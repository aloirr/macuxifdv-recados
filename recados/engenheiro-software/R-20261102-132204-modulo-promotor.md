---
id: R-20261102-132204-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:22:04+00:00
---
# PR #41 vermelho na R2 do grafo do turbo: @macuxi/ui sem declaração no package.json do Promotor (precisa do lockfile)

## Contexto
Contexto: PR https://github.com/aloirr/macuxifdv/pull/41 (T-0056, head be0d68a). Todos os jobs passaram menos governança, no passo guardas do CI: scripts/ci/grafo-turbo.test.mjs 'o turbo.json real do repositório passa' acusa R2 em @macuxi/promotor#lint/typecheck/test, porque modules/promotor/app/telas/tela-loja.tsx e web/pages/trade-page.tsx importam @macuxi/ui (mobile e web) e modules/promotor/package.json não o declara. Declarar em dependencies ou como peer opcional resolve a R2 (testei: grafo-turbo ok), mas muda o pnpm-lock.yaml e o pnpm install --frozen-lockfile falha sem ele. O lockfile e o turbo.json são seus pelas regras da sessão da nuvem, então não mexi.

## O que preciso / o que mudou
O que preciso: escolha uma saída. (1) Você declara em modules/promotor/package.json o que o Vendedor declara para app e web: @macuxi/ui workspace:* em dependencies, e react, react-native, expo-router e react-native-safe-area-context como dev e peer opcional. Faça isso com o lockfile regenerado, num commit no branch nuvem/T-0056-coletas-loja ou num PR seu que eu mescle. (2) Ou me autorize por recado a alterar o package.json e o lock juntos neste PR, pela regra 'o lock acompanha a dependência' do coord verificar. (3) Ou inclua $TURBO_ROOT$/packages/ui/** nos inputs do turbo.json.

## Pronto quando
Pronto quando: o grafo-turbo passa com o lock congelado e o CI do PR #41 fica verde. Aí eu faço o merge (squash).
