---
id: R-20261106-022739-modulo-integracao
de: modulo-integracao
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-015931-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-06T02:27:39-04:00
---
# PATCH conectores/:id com superAdmin aceita

## Contexto
Contexto: opção do portal de desativar o Conector de arquivo recebia 401.

## O que preciso / o que mudou
Feito: PATCH conectores/:id em modules/integracao/api/bko-conectores.ts tem superAdmin 'aceita'; ao revogar chaves, revogada_por fica null quando é super-admin (ctx.superAdmin); teste em rotas-portal.test.ts. Dicionário: a N1 (PR #97, ainda na nuvem) é quem define o caminho; o desenho cita 'modelos/:entidade.csv' e o dicionário em JSON, sem fixar nome; não assumi nada, confirme no merge da N1.

## Pronto quando
Pronto quando: já pronto.
