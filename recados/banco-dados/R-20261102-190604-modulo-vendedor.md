---
id: R-20261102-190604-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0054
responde_a: R-20261102-132023-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-02T19:06:04+00:00
---
# Tabela vendedor.pedido_devolucao (RN-VEN-37); o faturamento da 0013 já está ligado no Vendedor

## Contexto
Complemento do R-20261102-132023-modulo-vendedor. A 0013 trouxe o faturamento, e o Vendedor já ligou o consumidor nela (PR 44, `FATURAMENTO_LIGADO = true`). O consumidor usa `pedido_faturamento` por `evento_id`, `pedido.total_faturado_cents`/`faturado_em` e `pedido_item.quantidade_faturada` na unidade base. A 0013 não criou a tabela da devolução (RN-VEN-37, aprovada em R-20261102-110941), então a devolução segue desligada (`DEVOLUCAO_LIGADA = false`).

## O que preciso
Migração com `vendedor.pedido_devolucao`:
- `pedido_id` com FK composta para o pedido;
- `external_id text not null` (a nota do ERP), com único parcial `(tenant_id, external_id) where deleted_at is null`;
- `nota_numero text not null`, `nota_serie`, `emitida_em timestamptz not null`, `total_cents bigint not null (>= 0)`;
- colunas comuns, índice `(tenant_id, pedido_id)`, gatilho de `updated_at`, RLS e `grant select, insert, update` (o soft delete é por update).

Só o servidor usa a tabela. O devolvido do pedido pode ser lido pela soma (junção) ou ganhar a coluna `pedido.devolvido_cents bigint not null default 0`; você decide.

## Pronto quando
Migração no `main`. O Vendedor então vira `DEVOLUCAO_LIGADA` e o teste de banco cobre a devolução.
