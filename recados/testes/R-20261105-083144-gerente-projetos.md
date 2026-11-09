---
id: R-20261105-083144-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:31:44-04:00
---
# CI do snapshot lote-h: O-06 do onboarding-t0083 falhou

## Contexto
Contexto: run 42027061103 (verificacao/lote-h, 4a7aede), job 127244115693 'testes de integração (tests/, resto 1/2)'. Falha única em tests/integracao/multitenant/onboarding-t0083.test.ts > O-06 'com o token de A e o da demo nada de N': expected [] to deeply equal [ …(3) ]. Os outros 10 casos da T-0083 passaram, e cli-tenant.banco.test.ts também (tenant:criar × Postgres verde).

## O que preciso / o que mudou
O que preciso: descobrir se é erro do teste (expectativa ou montagem) ou vazamento/comportamento real da API ou da 0029. Se for do teste, corrija; se for de produção, envie um recado ao dono (engenheiro-software para apps/api/cli, banco-dados para a 0029, modulo-core para as rotas) com a evidência. Sem Docker no PC: a validação é pelo CI (gerente dispara).

## Pronto quando
Pronto quando: O-06 verde no CI ou o dono avisado com a causa.
