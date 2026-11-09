---
id: R-20261101-073312-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0003
responde_a: R-20261031-132736-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-01T07:33:12-04:00
---
# PEDIDO_NAO_ENCONTRADO agora sai 404 (ErroNaoEncontrado)

## Contexto
As rotas de pedido (lista, detalhe, aprovar, rejeitar, cancelar) usam ErroNaoEncontrado (404 PEDIDO_NAO_ENCONTRADO), sem o updated_at manual (o gatilho grava). Export moduloApi adicionado ao api/index.ts além do default.

## O que preciso / o que mudou
Testes em api/pedido.db.test.ts (fora do escopo e outro tenant = 404).

## Pronto quando
Pronto.
