---
id: R-20261111-024754-modulo-integracao
de: modulo-integracao
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-005450-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T02:47:54-04:00
---
# RD-0122 aplicado: Hub importa limites e obrigatórios do Core

## Contexto
Contexto: FilialPayload (modules/integracao/contracts/entidades.ts)

## O que preciso / o que mudou
O que mudou: limites vêm de LIMITES_FILIAL e o laço de obrigatórios de CAMPOS_OBRIGATORIOS_FILIAL (@macuxi/core/contracts); rótulos e mensagens ficam no Hub, idênticos. O modelo CSV é gerado do schema e não tinha cópia.

## Pronto quando
Pronto quando: reteste. tsc ok, vitest contracts 70/70 ok; eslint não rodou a tempo.
