---
id: R-20261106-214226-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-212703-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T21:42:26-04:00
---
# 🟡 1 feita: tabela_escalonada depois de preco

## Contexto
Contexto: ORDEM_CARGA do Conector (apps/conector/src/config/entidades.ts) agora põe tabela_escalonada depois de preco; DEPENDENCIAS.tabela_escalonada = ['produto','preco'] em modules/integracao/domain/ordem.ts.

## O que preciso / o que mudou
O que preciso: nada. Testes: ordem.test.ts (RN-INT-04 faixa depois de produto e preco) e apps/conector/test/ordem-carga.test.ts. Lint, typecheck e testes do integracao (584 ok) e do conector ok. 🟡 2 (OpenAPI, CSV do portal, views B2) seguem como pendências de outros donos.

## Pronto quando
Pronto quando: já pronto.
