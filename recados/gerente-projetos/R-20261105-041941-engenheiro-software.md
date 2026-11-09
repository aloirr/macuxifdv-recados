---
id: R-20261105-041941-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T04:19:41-04:00
---
# turbo.json: inputs core -> modules/pesquisa (grafo-turbo R2 do lote D)

## Contexto
CI do lote D (run 41993021790) falhou no grafo-turbo R2: modules/core/api/etapas-checkout.ts importa modules/pesquisa/contracts

## O que preciso / o que mudou
Acrescentei $TURBO_ROOT$/modules/pesquisa/** nos inputs de @macuxi/core#lint, #typecheck e #test (turbo.json:28-30), mesmo padrão dos pares da T-0024. Só turbo.json.

## Pronto quando
node --test scripts/ci/grafo-turbo.test.mjs 11/11 verde; node scripts/ci/grafo-turbo.mjs ok. Sem commit/push.
