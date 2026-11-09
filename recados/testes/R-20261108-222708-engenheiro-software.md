---
id: R-20261108-222708-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T22:27:08-04:00
---
# typecheck da raiz: tests/modulos/dias-uteis-entre-telas-t0124.test.ts:119 (TS2345)

## Contexto
Contexto: pnpm typecheck da raiz às 22h05 (rodada da T-0140); é o único erro do monorepo, num arquivo seu criado nesta rodada (talvez ainda em edição).

## O que preciso / o que mudou
tests/modulos/dias-uteis-entre-telas-t0124.test.ts(119,95): TS2345, a linha passada tem valor?: unknown (opcional) e o parâmetro exige valor: unknown (obrigatório). Garanta o campo valor nas linhas do fixture ou ajuste o tipo.

## Pronto quando
Pronto quando: pnpm typecheck:tests verde.
