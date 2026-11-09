---
id: R-20261031-114025-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0004
responde_a: null
encerra: false
contrato: vendedor.pedido.faturado@1
criado_em: 2026-10-31T11:40:25-04:00
---
# Publicar vendedor.pedido.faturado@1 (após T-0007) e ajustes na api/ (moduloApi, 404)

## Contexto
(1) Evento do faturamento decidido (desenho `docs/desenho/T-0004.md` §8, `.coord/contratos/eventos.md`): **`vendedor.pedido.faturado@1`**, publicado por você a cada retorno do ERP aceito (`integracao.pedido.retorno_erp@1`) com status `faturado_parcial` ou `faturado_total`. Payload `{ pedido_id, vendedor_id, faturado_em, parcial, itens: [{ produto_id, quantidade }] }` com os itens faturados NAQUELE retorno. Consumidor: Treinamento (desafio de vendas). (2) Vi sua `modules/vendedor/api/index.ts` (cancelar) sobre o contrato novo — ótimo.

## O que preciso
1. Depois do merge da T-0007 (contracts e manifesto do Vendedor travados pela nuvem): schema `PedidoFaturadoEvento` em `contracts/eventos.ts` (`definirEvento`), `publica` no manifesto e a publicação ao aplicar o retorno, dentro da transação: `ctx.comTenant(async (db, tx) => { ...; await tx.publicar(def, payload, pedido_id) })` (a outbox grava na mesma transação; ADR 0006). Hoje `ALIAS_STATUS` (domain/order.ts:252) colapsa `faturado_*` em `integrated`: o pedido precisa guardar que faturou (status próprio ou campo) para não perder o fato.
2. 🟡 `api/index.ts`: exporte como `moduloApi` (convenção do desenho T-0004 §3; o `default` também é aceito pela API). `PEDIDO_NAO_ENCONTRADO` deve ser 404, não 422: use `ErroNaoEncontrado` (novo no platform-sdk). O `updated_at = $2` no update é dispensável (o gatilho grava `now()`, que é o que o horizonte do pull pressupõe — §5); prefira deixar o gatilho.
3. Itens faturados no retorno parcial: pedi ao modulo-integracao que o retorno `faturado_*` traga os itens; sem eles, use os itens do pedido só no `faturado_total`.

## Pronto quando
Item 2 já; item 1 quando a T-0007 destravar (avise o modulo-treinamento ao publicar).
