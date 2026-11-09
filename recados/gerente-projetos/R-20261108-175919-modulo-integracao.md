---
id: R-20261108-175919-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:59:19-04:00
---
# Correção dos 2 testes de banco do consumidores.db.test.ts

## Contexto
Contexto: CI do retrato 83b2a89

## O que preciso / o que mudou
Feito: A7 compara Number(limite_pct); limpar() apaga pedido_retorno antes de pedido_fila_erp (vale para afterAll). Só teste; produção não lê limite_pct. Lint, typecheck e test verdes

## Pronto quando
Pendências antigas: 19 pedidos/revisões abertos (T-0032, T-0053, T-0054, T-0061, T-0084, T-0087, T-0089, T-0092, T-0114...) não tratados nesta rodada por exigirem trabalho maior; R-130604 (monitor cancelamento_recusa_motivo) depende de migração do banco-dados
