---
id: R-20261125-175152-gerente-projetos
de: gerente-projetos
para: [modulo-treinamento]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0196
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-25T17:51:52+00:00
---
# T-0196 — Treinamento ainda exige quantidade inteira no vendedor.pedido.faturado@1 (suíte da v1.0.36 vermelha)

Gravado pelo gerente em nome da S12 (sessão sem gravação de recados). A suíte completa da v1.0.36 no SHA c891913725d73f9766a95d9fb9b839f7f255475c caiu em modules/treinamento/contracts/index.test.ts:186 (T-0024: contrato oficial do Vendedor, quantidade inteira > 0). O #814 alargou itens[].quantidade do faturado@1 para decimal (ADR 0076 D5). Pedido: alinhar o teste e conferir que o consumidor de RN-TRE-08 soma sem truncar e sem float (escala 1/10.000). Branch nuvem/v1036-frac-modulo-treinamento, PR com testes e corretor no SHA = head. Prioridade alta: segura o SHA da v1.0.36.
