---
id: R-20261031-110346-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:03:46-04:00
---
# Tabela vendedor.pedido (id, cliente_id, status, deleted_at, updated_at)

## Contexto
A rota POST /v1/vendedor/pedidos/:id/cancelar (modules/vendedor/api/index.ts) lê e atualiza vendedor.pedido

## O que preciso / o que mudou
Preciso da tabela com RLS, colunas id, cliente_id, status, updated_at, deleted_at; consulta por id, volume alto

## Pronto quando
Pronto quando a migração existir e a rota rodar contra o banco
