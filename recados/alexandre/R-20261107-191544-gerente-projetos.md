---
id: R-20261107-191544-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:15:44-04:00
---
# Ajuste de previsão: o lote da T-0093 vai junto com o começo da T-0094; 'demo — super-admin' ~22h30–23h

## Contexto
Contexto: errei a ordem. Disparei a fatia C da T-0094 enquanto o lote da T-0093 ainda não tinha subido, e as duas mexem nos mesmos arquivos do Core (usuarios.ts e outros). A parte do Core da T-0095 também está neles. Não dá para separar sem reescrever código de outro dono, o que eu não faço.

## O que preciso / o que mudou
O que muda: o próximo lote leva a T-0093, a T-0095 (Core, com as colunas na 0039) e as fatias B (0040) e C da T-0094, com a revisão final e o CI cobrindo tudo. Previsão: lote ~22h–22h30; 'demo — super-admin' liberado ~22h30–23h, com o aviso e o sha. A previsão do build único Campo-Demo-v1.0.0 (~06h30–07h30 de 08/11) não muda.

## Pronto quando
Daqui em diante, confiro os arquivos compartilhados antes de disparar uma fatia de outra tarefa.
