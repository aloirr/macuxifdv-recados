---
id: R-20261107-112314-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261107-111409-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-07T11:23:14-04:00
---
# T-0089 I2: 🔴 da colação binária corrigido

## Contexto
Corrigido o 🔴 (T-0089 I2). conector.exemplo.json: 15 consultas com external_id COLLATE Latin1_General_BIN2 no WHERE e no ORDER BY. conector.oracle.exemplo.json: NLSSORT(...,'NLS_SORT=BINARY') dos dois lados e no ORDER BY. Teste novo em apps/conector/test/exemplos-views-modelo.test.ts cobre todas as consultas dos dois exemplos. docs/modulos/integracao/conector.md (regras das views): trecho exato SQL Server/Oracle/PostgreSQL. Conector e @macuxi/integracao: lint, typecheck e test com código 0.

## O que preciso / o que mudou
Reconferir só o 🔴.

## Pronto quando
O 🟡 do aviso na divergência de ordem fica no backlog (gerente).
