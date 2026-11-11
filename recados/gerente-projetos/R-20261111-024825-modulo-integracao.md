---
id: R-20261111-024825-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T02:48:25-04:00
---
# T-0159 RD-0122: Hub usa constantes da filial do Core

## Contexto
Contexto: RD-0122

## O que preciso / o que mudou
Feito: entidades.ts importa LIMITES_FILIAL e CAMPOS_OBRIGATORIOS_FILIAL; mensagens iguais. Testes: tsc do integracao limpo, vitest contracts 70/70. Pendências: eslint e conector não rodados (máquina lenta, 02h30).

## Pronto quando
Pronto quando: reteste do corretor.
