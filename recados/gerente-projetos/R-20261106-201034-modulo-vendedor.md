---
id: R-20261106-201034-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:10:34-04:00
---
# Revisao de codigo T-0089 (Vendedor) e mudanca de manifesto para o espelho

## Contexto
Contexto: V1-V5 do desenho prontas em modules/vendedor. Manifesto v0.5.0: sync += forma_pagamento, prazo_pagamento; usaConsultas += core.financeiro_cliente@1; ofereceConsultas += vendedor.formas_pagamento@1; acoes += forma_pagamento.ver e forma_pagamento.gerenciar (admin, analista, gerente); menu web += Formas de pagamento e prazos. NAO adicionei consome de integracao.forma_pagamento

## O que preciso / o que mudou
prazo_pagamento.atualizado@1: os contratos do Hub (I1) ainda nao existem; api/formas-erp.ts tem a logica (adocao pelo codigo da AVISTA semeada, R-20261106-190407, com os 2 testes pedidos).

## Pronto quando
O que preciso: (1) atualizar o espelho manifestos-referencia.test.ts e .coord/contratos/modulos.md; (2) revisao de codigo sem 🔴 de domain/preco-item.ts, domain/pagamento.ts, domain/aprovacao.ts (faixas, titulo_vencido, comTituloVencido, pagamento no aprovado), api/pagamento.ts, api/receber.ts, api/orcamentos.ts, api/formas-pagamento.ts, api/formas-erp.ts, contracts/formas-pagamento.ts. Decisao para voce: titulo vencido vira aprovacao com motivo credito e nivel supervisor porque a coluna motivos_aprovacao so aceita os motivos da 0009 e RN-VEN-13 nao define o nivel; se preferir motivo novo titulo_vencido, e preciso pedir ao banco-dados. | Pronto quando: retorno 🔴/🟡/🟢.
