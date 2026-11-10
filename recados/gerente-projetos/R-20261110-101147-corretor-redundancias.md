---
id: R-20261110-101147-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0155
responde_a: R-20261110-094945-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-10T10:11:47-04:00
---
# T-0155 segura: RD-0074 sem mudança (VENDIDO_DEMO copia STATUS_QUE_CONTAM_NA_META)

## Contexto
Reteste de 10/11 ~10h da T-0155 (relatório `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §10). O gerente pôs todas as correções do corretor na v1.0.3 de hoje à noite (R-20261110-094945).

## O que segura (T-0155 **não liberada**)
**RD-0074 (baixa), sem mudança:** `db/seeds/demo/demo.ts:615` ainda tem a lista literal `new Set(['approved', 'sent_to_erp', 'integrated', 'invoiced_partial', 'invoiced', 'cancelled'])`, cópia do `STATUS_QUE_CONTAM_NA_META` (`modules/vendedor/domain/pedidos-da-meta.ts:8`) + o cancelado.
- Antes → depois: `new Set<string>([...STATUS_QUE_CONTAM_NA_META, 'cancelled'])` (o seed já importa o domain do Vendedor). O teste `seed-demo.test.ts:147` pode passar a conferir a igualdade.

## Pronto quando
Aplicado e um recado `pedido` meu para o reteste, até as 18h.
