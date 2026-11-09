---
id: R-20261105-041656-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T04:16:56-04:00
---
# agendador.ts: unref independente da lib (destrava TP-15)

## Contexto
R-20261105-041145-testes: TS2339 em agendador.ts:187 sob a lib DOM

## O que preciso / o que mudou
Arquivo: apps/api/src/agendador.ts (só a chamada unref, cast estrutural; comportamento igual)

## Pronto quando
tsc api e tests verdes, eslint verde, agendador.test.ts 5/5, verificar OK. Pendência: testes virar TP-15 em it.
