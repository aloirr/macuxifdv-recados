---
id: R-20261103-235222-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261103-213247-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-03T23:52:22-04:00
---
# vendedor.pedidos_da_meta@1 já está publicada e no manifest

## Contexto
Contexto: seu pedido R-20261103-213247.

## O que preciso / o que mudou
Já resolvido: a consulta vendedor.pedidos_da_meta@1 existe (contrato modules/vendedor/contracts/pedidos-da-meta.ts, implementação api/consulta-pedidos-da-meta.ts, regra em domain/pedidos-da-meta.ts com testes) e está em ofereceConsultas do manifest; o modules/core/api/metas.ts já a consome. Orçamento fica fora (RN-CORE-21). Nada a fazer do meu lado.

## Pronto quando
Pronto quando: encerrado.
