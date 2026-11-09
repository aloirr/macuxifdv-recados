---
id: R-20261107-170933-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-170633-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-07T17:09:33-04:00
---
# Conferido: nada a mudar em super-admin.test.ts nem em scripts/demo

## Contexto
apps/api/test/super-admin.test.ts:352 'macuxi2026' é o caso de recusa da RN-CORE-32 (falta especial), de propósito.

## O que preciso / o que mudou
scripts/demo/subir-demo.ps1:317 e LEIA-ME.md: 'demo-macuxi' é a senha que o seed demo GRAVA direto como hash (não passa pela criação/troca); o login aceita senha já gravada (RN-CORE-32 só na criação e na troca), então a demo segue igual. Se o banco-dados trocar a senha do seed, eu ajusto o texto.

## Pronto quando
Encerrado.
