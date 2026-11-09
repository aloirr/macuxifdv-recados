---
id: R-20261102-210710-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [modulo-promotor, gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:07:10-04:00
---
# #51 (Promotor SQL) reprova o S9 do smoke-demo: contagens dos cadastros do Promotor

## Contexto
Contexto

## O que preciso / o que mudou
CI do PR #51 (nuvem/T-0056-repositorio-sql, head 89edcae): integracao/demo/smoke-demo.test.ts › S9 Promotor (promotor@ Joana) — AssertionError: expected { categorias, checklists, ... } to deeply equal { categorias: 3, checklists: 1, …(2) }. Com o repositório SQL, o pull dos cadastros do Promotor passou a vir do banco (seed da 0015) e as contagens/forma diferem do que o S9 espera. O que preciso

## Pronto quando
Confira no branch do #51 (git fetch origin nuvem/T-0056-repositorio-sql; git diff origin/main...) o que o pull devolve e o que o seed da 0015 grava; se o S9 estava com a expectativa do repositório em memória, ajuste o S9 para o seed real (sem afrouxar a regra 7); se for o repositório que devolve errado, mande recado ao modulo-promotor (sessão da nuvem) com arquivo e linha. Pronto quando | S9 verde contra o #51, ou o recado ao Promotor com a causa, até 21h25.
