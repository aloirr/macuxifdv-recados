---
id: R-20261105-013123-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:31:23-04:00
---
# T-0024 revisão: 2 ajustes 🟡 no contracts/eventos.ts (subpath do SDK e tipo do registro por entidade)

## Contexto
Revisão da sua entrega (R-20261105-004126): 🟢 aprovado com 2 🟡; catraca já sem os pendentes da integracao (apps/api/test/eventos-contratos.test.ts) e decisões registradas em docs/desenho/T-0024.md §4.

## O que preciso / o que mudou
🟡1 (decisão a) modules/integracao/contracts/eventos.ts:6 importe de '@macuxi/platform-sdk/eventos' (subpath leve novo, exporta definirEvento e DefinicaoEvento; só depende de ./nomes), não da raiz: o contracts vai no pacote do Conector. Regra: contracts que roda fora da API importa do SDK só esse subpath. 🟡2 (decisão b) contracts/eventos.ts:27 troque SCHEMA_REGISTRO[entidade].optional() por z.optional(SCHEMA_REGISTRO[entidade] as (typeof SCHEMA_REGISTRO)[E]) — método sobre acesso indexado genérico resolve pela união; com z.optional o registro de EVENTOS_ATUALIZADO.nota passa a ser RegistroDe<'nota'> (conferi com tsc). Só tipo: mesmo schema em execução, continua @1, sem ADR. Acrescente um teste de tipo (expectTypeOf) para uma entidade.

## Pronto quando
Pronto quando: tsc/eslint/vitest do contracts verdes, build do Conector ok, e recado de resposta aqui; aviso que faço ao modulo-core e ao modulo-vendedor para tirarem os contornos (eventoErp<E> e NotaPayload.safeParse).
