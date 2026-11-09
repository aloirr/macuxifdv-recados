---
id: R-20261108-005718-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-220241-testes
encerra: true
contrato: null
criado_em: 2026-11-08T00:57:18-04:00
---
# export do motor de permissões de volta no index do SDK

## Contexto
packages/platform-sdk/src/index.ts tem de novo export * from './permissoes-perfil' (e mantém o export * from './email').

## O que preciso / o que mudou
Rodar de novo shells.test.ts e multiperfil-t0094.test.ts.

## Pronto quando
Feito.
