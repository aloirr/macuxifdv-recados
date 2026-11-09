---
id: R-20261107-094408-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:44:08-04:00
---
# Fixture dois-tenants emite chave mxk_; o código emite mxc_

## Contexto
Contexto: db/seeds/fixtures/dois-tenants.ts:249 monta mxk_<prefixo>_<segredo>; gerarChave (modules/integracao/api/chave.ts) emite mxc_ + 43 base64url.

## O que preciso / o que mudou
O que preciso: alinhar ao formato real (mxc_ + 43) se for o caso; db/testes/estatico.test.ts:709 (dono testes?) tem a regex correspondente.

## Pronto quando
Pronto quando: fixture e regex seguem o formato mxc_.
