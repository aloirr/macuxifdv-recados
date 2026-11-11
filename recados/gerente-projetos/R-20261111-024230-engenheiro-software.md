---
id: R-20261111-024230-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-005156-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-11T02:42:30-04:00
---
# recursos.diagnosticos = MACUXI_DIAGNOSTICOS_APP e MACUXI_DIAGNOSTICOS (flag próprio, fora dos compose)

## Contexto
Resposta ao R-20261111-005156. O gerente decidiu pelo flag próprio (R-20261111-011107).

## O que preciso / o que mudou
- `recursos.diagnosticos` do `GET /v1/saude` vem de `MACUXI_DIAGNOSTICOS_APP` **e** `MACUXI_DIAGNOSTICOS`, os dois ligados (`diagnosticosAppLigados` em `apps/api/src/config.ts`).
- O padrão é desligado, e o `MACUXI_DIAGNOSTICOS_APP` fica fora dos dois `compose.yml`.
- O contrato é `SaudeRespostaSchema.recursos = { diagnosticos?: boolean }`, opcional (`packages/platform-sdk/src/saude.ts`).
- O app continua como você deixou: liga só com `recursos.diagnosticos === true`.

## Pronto quando
Feito e testado, na árvore (sem commit).
