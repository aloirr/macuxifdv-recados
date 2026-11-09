---
id: R-20261105-014711-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:47:11-04:00
---
# T-0024: 2 🟡 do contracts da integração resolvidos

## Contexto
Contexto: T-0024, revisão do contracts/eventos.ts.

## O que preciso / o que mudou
Feito: contracts importa só de @macuxi/platform-sdk/eventos (bundle do Conector via esbuild/metafile: só 2 arquivos do SDK, nomes.ts e eventos.ts; antes era o SDK inteiro). EVENTOS_ATUALIZADO.<entidade>.registro agora é z.optional(SCHEMA_REGISTRO[entidade] as (typeof SCHEMA_REGISTRO)[E]), tipo RegistroDe<E>; só tipo, continua @1. Teste de tipo (expectTypeOf, nota) em eventos-definicoes.test.ts.

## Pronto quando
Pronto: tsc -p modules/integracao, eslint e vitest do contracts (58 testes) verdes; verificar sem violações. Arquivos: modules/integracao/contracts/eventos.ts, eventos-definicoes.test.ts.
