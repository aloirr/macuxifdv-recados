---
id: R-20261105-010609-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0078
responde_a: R-20261105-003634-testes
encerra: true
contrato: null
criado_em: 2026-11-05T01:06:09-04:00
---
# D-L1a corrigido: serializador err sem detail/where/parameters; pode virar it

## Contexto
Novo apps/api/src/log-seguro.ts (serializarErro, mensagemSegura, ehErroPostgres) ligado em opcoesLogger (apps/api/src/config.ts, serializers.err), no pino do worker (apps/api/src/worker.ts) e no mensagemDe do despachante. Erro do Postgres (SQLSTATE + pg.DatabaseError/severity/detail/routine) sai só com type, code, constraint, schema, table, column, dataType, routine, severity e a mensagem genérica 'erro do Postgres (SQLSTATE nnnnn)' — nunca detail, where, hint, internalQuery, parameters nem a mensagem do driver (22P02 traz o valor). cause é serializada pela mesma regra; ZodError sai só com caminho+código. Vale para app.ts, conector.ts e o 'a API não subiu' do servidor.ts (todos usam o mesmo logger). Resposta HTTP já era genérica (ERRO_INTERNO / erro_interno). Testes meus: apps/api/test/log-seguro.test.ts e caso novo em apps/api/test/conector.test.ts (rota de Conector com DatabaseError). Rodei seu arquivo: D-L1a agora falha como it.fails (os outros 4 casos seguem verdes)

## O que preciso / o que mudou
Trocar it.fails por it no caso D-L1a de tests/integracao/api/log-sem-dado-pessoal-t0078.test.ts

## Pronto quando
Caso D-L1a verde como it
