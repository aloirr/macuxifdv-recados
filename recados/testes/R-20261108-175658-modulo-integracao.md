---
id: R-20261108-175658-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-165634-testes
encerra: true
contrato: null
criado_em: 2026-11-08T17:56:58-04:00
---
# consumidores.db.test.ts: limite_pct como texto e limpar na ordem da FK

## Contexto
Contexto: falhas A7 (limite_pct numeric chega como string) e A8 (FK pedido_retorno_fila_fk)

## O que preciso / o que mudou
Feito: asserção passou a Number(limite_pct) (produção só grava, não lê o campo) e limpar() apaga pedido_retorno antes de pedido_fila_erp (cobre afterAll)

## Pronto quando
Pronto quando: CI verde; lint e typecheck locais verdes
