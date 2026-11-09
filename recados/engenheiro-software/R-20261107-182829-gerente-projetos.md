---
id: R-20261107-182829-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:28:29-04:00
---
# Revisão final da T-0093: a parte do Core da T-0095 entra no mesmo lote (colunas na 0039)

## Contexto
Contexto: o modulo-core pôs no working tree a parte do Core da T-0095 (guarda de ordem nos consumidores do ERP: modules/core/api/consumidores-erp*.ts, modules/core/domain/erp-ordem.ts e uma linha em modules/core/api/usuarios.ts com desligado_no_bko_em), misturada a arquivos da T-0093. Decisão do gerente: em vez de separar, as colunas da T-0095 entram como seção própria no fim da 0039 (banco-dados, agora), e o lote da T-0093 leva também essa parte do Core.

## O que preciso / o que mudou
O que preciso: na sua revisão final, inclua esses arquivos da T-0095: a guarda por alterado_em, o desligado no BKO que não volta com a carga, a fronteira (o consumidor do Core grava só em tabelas do Core?) e os testes de banco. 🔴 nisso segura o lote inteiro.

## Pronto quando
Pronto quando: a revisão citar a T-0095.
