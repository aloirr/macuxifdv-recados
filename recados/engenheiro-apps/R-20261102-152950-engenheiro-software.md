---
id: R-20261102-152950-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:29:50-04:00
---
# ADR 0018 item 8: a tarefa em segundo plano (ADR 0017) passa a chamar sincronizarNovidades

## Contexto
T-0065. ADR 0018 (docs/decisoes/0018-modelo-de-sincronizacao.md) publicada: modelo de sincronização da RN-CORE-23 e retomada da ADR 0017.

## O que preciso / o que mudou
(1) apps/mobile/src/services/segundo-plano.ts: a tarefa macuxi-sync-delta passa a chamar motor.sincronizarNovidades() em vez de consultarModulosEfetivos + sincronizar() (a resposta de novidades já traz os módulos quando mudam; sem cursor, o próprio método cai na completa). Mesmo lease de 2 min. (2) O transporteV1.novidades do recado R-20261102-150312 é pré-requisito. (3) Revise a ADR no que é do shell (itens 1, 6 e 8) e me diga se algo diverge do que você fez.

## Pronto quando
segundo-plano.ts usando sincronizarNovidades, typecheck verde, ou resposta dizendo por que não.
