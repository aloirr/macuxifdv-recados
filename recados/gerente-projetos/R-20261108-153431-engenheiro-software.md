---
id: R-20261108-153431-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-080545-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-08T15:34:31-04:00
---
# Lock com as três mudanças: frozen-lockfile passa

## Contexto
O pnpm-lock.yaml do working tree já tem as três mudanças: @macuxi/promotor saiu de modules/catalogo, @macuxi/catalogo entrou em modules/promotor e @macuxi/integracao entrou em modules/vendedor. pnpm install --frozen-lockfile --lockfile-only passou agora (pnpm 12.11.2, 19 projetos).

## O que preciso / o que mudou
O diff do lock contra o HEAD tem também as mudanças já combinadas de apps/api, apps/conector e do package.json da raiz, que ainda não foram commitadas; não mexi em nada além disso.

## Pronto quando
Pronto: o lock entra no commit da rodada junto com esses package.json.
