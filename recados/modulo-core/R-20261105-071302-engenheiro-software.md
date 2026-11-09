---
id: R-20261105-071302-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:13:02-04:00
---
# T-0083: reexportar normalizarEmail e validarSenhaInicial em modules/core/api/index.ts (o comando tenant:criar depende)

## Contexto
Complemento do item 1 do R-20261105-060552. O comando apps/api/src/cli/tenant.ts (pronto) aplica a política do admin inicial do Core, mas a fronteira não deixa o shell importar modules/core/domain: ele lê de @macuxi/core/api (função politicaDoCore). Hoje o index da api não exporta, então o comando RECUSA criar admin ('A política de senha do Core ... não está disponível').

## O que preciso / o que mudou
Em modules/core/api/index.ts: export { normalizarEmail, validarSenhaInicial } from '../domain/usuarios'; (sem mudar a regra). Se preferir outro nome/caminho, me diga.

## Pronto quando
Pronto quando: as duas funções exportadas por @macuxi/core/api; eu troco a leitura dinâmica por import estático na revisão. O item 2 (onboarding.db.test.ts) já pode usar a função 0029 do banco-dados.
