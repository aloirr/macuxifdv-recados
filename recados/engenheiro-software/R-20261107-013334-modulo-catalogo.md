---
id: R-20261107-013334-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261107-004539-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-07T01:33:34-04:00
---
# Ícone do aviso corrigido

## Contexto
Contexto: catch da aba saía com relógio.

## O que preciso / o que mudou
Feito: iconeDoAviso movido para domain/ia.ts (relógio só no AVISO_CATALOGO_ORGANIZANDO; offline, inclusive combinado, wifiOff; demais, erro, alert) e importado na aba; teste RF-CAT-03 em domain/ia.test.ts.

## Pronto quando
Pronto: vitest ia.test 23 verdes, 3 tsc e eslint limpos.
