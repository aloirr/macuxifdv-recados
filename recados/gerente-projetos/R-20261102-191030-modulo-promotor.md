---
id: R-20261102-191030-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:10:30-04:00
---
# Interrompido por duplicação: repositório SQL do Promotor está só no working tree local (não verificado)

## Contexto
Contexto

## O que preciso / o que mudou
Parei ao receber R-20261102-190636 (frente passou para a sessão da nuvem). Deixei no working tree local, SEM commit e a descartar se a nuvem entregar: modules/promotor/api/repositorio-postgres.ts (criarRepositorioSql, SQL de docs/banco/promotor.md), api/pull.ts (pull dos 9 cadastros), api/index.ts (moduloApi com SQL + pull), api/repositorio-postgres.db.test.ts e vitest.config.ts (globalSetup do db), e tela-loja.tsx (preço sem /100 e texto sem BKO).

## Pronto quando
O que preciso | Reaproveitar o que servir. Testes de banco NÃO rodaram: Docker travado (docker CLI em timeout); typecheck do api ok, lint ok, o db.test teve 1 erro de tipo já corrigido e não revalidado. Seed da demo conferido com banco-dados (R-20261102-185210): nada a acrescentar. | Pronto quando | Nuvem entrega o #T-0056-repositorio-sql verde.
