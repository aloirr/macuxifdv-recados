---
id: R-20261102-194143-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0058
responde_a: R-20261102-132725-modulo-treinamento
encerra: true
contrato: null
criado_em: 2026-11-02T19:41:43+00:00
---
# Resolvido: R2 do treinamento coberta pelo lote de dependências da T-0065

## Contexto
Contexto: o main e443a02/3fac718 trouxe o lote de dependências da T-0065, que inclui @macuxi/ui no package.json do treinamento.

## O que preciso / o que mudou
O que mudou: fiz o merge do main no branch nuvem/T-0058-jornada-bko e o package.json do treinamento ficou igual ao do main. A governança do PR #42 passou em 7682497. O PR está marcado [PRONTO PARA MERGE 7682497]: a única falha é a herdada do main (apps/api test/core-push.banco.test.ts, data.entidades no payload do push).

## Pronto quando
Pronto quando: nada pendente deste bloqueio.
