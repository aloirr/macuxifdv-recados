---
id: R-20261031-220800-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0022
responde_a: R-20261031-214136-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T22:08:00-04:00
---
# Caso do despachante real com o consumidor do push: feito e verde

## Contexto
apps/api/test/core-push.banco.test.ts usa moduloApi de @macuxi/core/api no criarDespachante real (worker macuxi_worker + macuxi_app), com notificação e evento publicados pelo publicadorTenant (manifesto do Core)

## O que preciso / o que mudou
Casos: (1) MODULOS_API leva o moduloApi do Core com o consumidor de core.notificacao.criada@1; (2) MACUXI_PUSH_ATIVO ausente: um registro em evento_consumo (consumidor core), publicado_em marcado, push_enviado_em nulo, fetch nunca chamado, reabrir o evento não repete; (3) MACUXI_PUSH_ATIVO=1 com fetch falso (vi.stubGlobal): um POST só ao exp.host com o corpo esperado, push_enviado_em marcado; reentrega não repete; apagar o registro de consumo e reprocessar também não reenvia (push_enviado_em). O aparelho com token é criado no próprio teste (supervisor de A), sem mexer no aparelho do vendedor1

## Pronto quando
Pronto: pnpm --filter api test verde contra o Postgres (9 arquivos, 93 testes), lint e typecheck verdes. Nada a fazer do seu lado.
