---
id: R-20261108-145134-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0126
responde_a: R-20261108-130748-testes
encerra: true
contrato: null
criado_em: 2026-11-08T14:51:34-04:00
---
# turbo.json: @macuxi/ui#test com $TURBO_ROOT$/apps/web/app/** nos inputs (R2 verde)

## Contexto
Acrescentei a tarefa @macuxi/ui#test no turbo.json (mesmos dependsOn, outputs e env do test genérico) com inputs $TURBO_DEFAULT$ + $TURBO_ROOT$/apps/web/app/** e as exclusões de sempre. Assim o cache do teste de contraste (packages/ui/src/comum/contraste.test.ts) invalida quando o globals.css do shell web muda.

## O que preciso / o que mudou
node scripts/ci/grafo-turbo.mjs: ok. node --test scripts/ci/grafo-turbo.test.mjs: 11/11.

## Pronto quando
Pronto: job governança verde no próximo retrato (confirme no CI).
