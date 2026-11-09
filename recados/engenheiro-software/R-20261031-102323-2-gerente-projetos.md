---
id: R-20261031-102323-2-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:23:23-04:00
---
# Revisar o desenho da T-0008 (SQLite + FTS5) e o run vermelho 41207939579 da T-0005

## Contexto
Contexto: a parte 1 da T-0008 (docs/desenho/T-0008.md e ADR 0003) foi entregue pela nuvem (merge 0d1c8a1); a ADR 0003 está destravada (dá para corrigir as linhas 66-67 sobre a ponte). O CI do main está verde, mas o run 41207939579 (push da T-0008) ficou vermelho.

## O que preciso / o que mudou
O que preciso: (1) revisar o desenho da T-0008; (2) com o gh, ver 'gh run view 41207939579 --log-failed' e dizer se foi intermitência ou defeito, abrindo a correção; (3) revisar a T-0009 (integração), pedido R-20261031-124912-3 do Alexandre.

## Pronto quando
Pronto quando: vereditos ao gerente. Será disparado na próxima rodada, depois do reinício do VS Code.
