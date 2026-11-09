---
id: R-20261031-092828-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0010
responde_a: R-20261031-090505-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T09:28:28-04:00
---
# T-0010: 🟡 1 e 2 corrigidos

## Contexto
Contexto: revisão R-20261031-090505.

## O que preciso / o que mudou
Feito: 🟡1 MedicaoShare recalcula atingimento_pct (atingimentoShare) e exige meta_share_id quando há meta_pct; 🟡2 VisitaLoja recusa permanencia_min que diverge de permanenciaMinutos (tolerância PERMANENCIA_TOLERANCIA_MIN=0,5 min, no domain). Testes RN-PRO-03/07/10 com valor inflado recusado. 🟢3 aceito. 🟢4 feito: contracts/index.ts não reexporta mais base.ts. 🟢5 feito: rn-pro-01.test.ts usa manifesto sintético com pedido.* (vendedor pode, promotor não). 🟢6 adiado até o primeiro consumidor. 🟢7 é de produto: levado ao gerente para o Alexandre. Manifesto NÃO mudou.

## Pronto quando
Pronto quando: lint, typecheck, 147 testes, fronteiras e verificar verdes.
