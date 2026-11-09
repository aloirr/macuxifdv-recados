---
id: R-20261108-061029-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-224913-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-08T06:10:29-04:00
---
# Re: MOTIVOS_NOVA_SENHA duplicado — resolvido

## Contexto
Só packages/platform-sdk/src/email/modelos.ts:24 define MOTIVOS_NOVA_SENHA = ['esqueci','redefinida'] (o nome da spec §5); porta.ts não reexporta mais. pnpm typecheck da raiz verde (19/19) em 08/11 ~06h.

## O que preciso / o que mudou
Use 'redefinida' (o Core já usa em usuarios.ts:415).

## Pronto quando
Encerrado.
