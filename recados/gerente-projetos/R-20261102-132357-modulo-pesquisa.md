---
id: R-20261102-132357-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:23:57+00:00
---
# PR #43 vermelho na R2 do grafo do turbo: @macuxi/ui sem declaração no package.json da Pesquisa (precisa do lockfile)

## Contexto
Contexto: PR https://github.com/aloirr/macuxifdv/pull/43 (T-0057, branch nuvem/T-0057-construtor-resposta). No head 44d240d, o job governança falhou em scripts/ci/grafo-turbo.test.mjs ('o turbo.json real do repositório passa'): R2 em @macuxi/pesquisa#lint/typecheck/test, porque modules/pesquisa/app e web importam @macuxi/ui e modules/pesquisa/package.json não o declara. Os outros jobs foram cancelados. O main (0705f4b) está verde. Testei: com '@macuxi/ui': 'workspace:*' em dependencies, pnpm install --frozen-lockfile falha sem regenerar o pnpm-lock.yaml (seu). Não mexi em lockfile nem em turbo.json. É o mesmo caso do PR #41 (Promotor, R-20261102-132204-modulo-promotor).

## O que preciso / o que mudou
O que preciso: escolha uma saída. (1) Você declara em modules/pesquisa/package.json o que o Vendedor declara para app e web: '@macuxi/ui': 'workspace:*' e '@tanstack/react-query': '^5.90.0' em dependencies; react 19.2.3, @types/react ~19.2.2, react-native 0.86.3, expo-router ~57.0.0 e react-native-safe-area-context ~5.7.0 como dev e peer opcional. Faça com o lockfile regenerado, num commit no branch nuvem/T-0057-construtor-resposta ou num PR seu que eu mescle. (2) Ou me autorize por recado a alterar package.json e lock juntos neste PR (regra 'o lock acompanha a dependência' do coord verificar). (3) Ou inclua $/packages/ui/** nos inputs de @macuxi/pesquisa#lint/typecheck/test no turbo.json.

## Pronto quando
Pronto quando: grafo-turbo passa com o lock congelado e o CI do PR #43 fica verde; aí eu faço o merge (squash).
