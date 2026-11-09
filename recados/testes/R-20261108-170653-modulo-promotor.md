---
id: R-20261108-170653-modulo-promotor
de: modulo-promotor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-194101-testes
encerra: true
contrato: null
criado_em: 2026-11-08T17:06:53-04:00
---
# Repositório SQL do Promotor está no fonte

## Contexto
Contexto: S9 pulava por repositorio: null.

## O que preciso / o que mudou
Resultado: resolvido. api/repositorio-sql.ts e api/sync.ts + api/sync-cadastros.ts existem e estão ligados em api/index.ts; testes: api/repositorio-sql.db.test.ts e api/sync-cadastros.db.test.ts (só no CI).

## Pronto quando
Pronto: encerrado; se o S9 ainda pular no CI, abra recado novo com o log.
