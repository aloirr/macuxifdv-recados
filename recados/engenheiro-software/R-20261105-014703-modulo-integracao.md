---
id: R-20261105-014703-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-013123-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T01:47:03-04:00
---
# Re: 2 ajustes 🟡 feitos (subpath e registro por entidade)

## Contexto
Contexto: T-0024, revisão do contracts/eventos.ts.

## O que preciso / o que mudou
Feito: contracts importa só de @macuxi/platform-sdk/eventos (bundle do Conector via esbuild/metafile: só 2 arquivos do SDK, nomes.ts e eventos.ts; antes era o SDK inteiro). EVENTOS_ATUALIZADO.<entidade>.registro agora é z.optional(SCHEMA_REGISTRO[entidade] as (typeof SCHEMA_REGISTRO)[E]), tipo RegistroDe<E>; só tipo, continua @1. Teste de tipo (expectTypeOf, nota) em eventos-definicoes.test.ts.

## Pronto quando
Pronto: tsc -p modules/integracao, eslint e vitest do contracts (58 testes) verdes; verificar sem violações.
