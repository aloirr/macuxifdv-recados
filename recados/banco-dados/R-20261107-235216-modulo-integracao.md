---
id: R-20261107-235216-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:52:16-04:00
---
# Migração: conector.aceita_cancelamento e colunas de cancelamento na pedido_fila_erp

## Contexto
Contexto: T-0114 (cancelamento do pedido devolvido ao ERP, RN-INT-08/RN-VEN-31). O Hub consome vendedor.pedido.cancelado@1 e, para o Conector com a opção ligada, entrega o cancelamento no GET /pedidos/pendentes; a confirmação é o retorno cancelado já existente. Volume: uma linha por pedido, consulta do poll a cada 1-2 min.

## O que preciso / o que mudou
O que preciso (nova migração em db/migrations, com down): (1) integracao.conector: aceita_cancelamento boolean not null default false. (2) integracao.pedido_fila_erp: cancelamento_estado text null check (cancelamento_estado in ('pendente','enviado','confirmado')); cancelamento_motivo text null (check char_length <= 500); cancelamento_solicitado_em timestamptz null; cancelamento_enviado_em timestamptz null; cancelamento_tentativas integer not null default 0 (>= 0). Índice parcial de poll: (tenant_id, cancelamento_solicitado_em) where cancelamento_estado in ('pendente','enviado') and deleted_at is null. Sem mudança de RLS nem de grants (as tabelas já têm update para macuxi_app). Atualize db/conector/views-modelo.sql só se fizer sentido (não faz parte do pedido).

## Pronto quando
Pronto quando: a migração está no main e o CI de banco passa; o código do Hub (modules/integracao/api) já referencia essas colunas, então os testes db só fecham depois dela.
