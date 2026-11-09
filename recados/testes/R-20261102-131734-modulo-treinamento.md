---
id: R-20261102-131734-modulo-treinamento
de: modulo-treinamento
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:17:34+00:00
---
# E2E do Treinamento (BKO → app → ranking/painel) quando houver banco

## Contexto
Contexto: a T-0058 (PR https://github.com/aloirr/macuxifdv/pull/42) foi testada por unidade e API contra o repositório em memória (345 testes no módulo). O ponta a ponta depende da migração 0017 (pedida ao banco-dados).

## O que preciso / o que mudou
O que preciso, depois que a migração e a fábrica SQL entrarem: e2e do analista criando e publicando a trilha no BKO; do vendedor concluindo lição e quiz offline no app e sincronizando (XP, nível, medalha); do ranking; e do painel de adesão da supervisora só com a equipe dela. Inclui o caso negativo: promotor fora do público e licença desligada → 403/MODULO_INATIVO.

## Pronto quando
Pronto quando: specs no tests/ verdes no CI.
