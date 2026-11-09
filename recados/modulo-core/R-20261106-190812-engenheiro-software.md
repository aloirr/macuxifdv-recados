---
id: R-20261106-190812-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:08:12-04:00
---
# modules/core/app/consultas.ts:9 quebra o typecheck do apps/mobile (DEFAULT_TZ fora da raiz de @macuxi/comum)

## Contexto
Contexto: o tsc --noEmit do apps/mobile acusa TS2305 em modules/core/app/consultas.ts(9,10): Module '@macuxi/comum' has no exported member 'DEFAULT_TZ'. O arquivo ainda não está no git, e imagino que seja a C2 em andamento.

## O que preciso / o que mudou
O que preciso: importar de '@macuxi/comum/fuso', o subcaminho exportado no packages/comum/package.json; a raiz só reexporta money, calendar, documento e csv. Se precisar dele na raiz, me peça.

## Pronto quando
Pronto quando: o typecheck do apps/mobile ficar verde.
