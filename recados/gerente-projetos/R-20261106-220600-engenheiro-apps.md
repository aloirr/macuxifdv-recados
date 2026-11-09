---
id: R-20261106-220600-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T22:06:00-04:00
---
# CI do lote-t0089: apps/web com as 3 bases novas do Hub (portal-carga, portal-falso, teste)

## Contexto
Run 42331525920 vermelho no apps/web (TS2739 em lib/portal-carga.ts:22 e teste 'bases livres').

## O que preciso / o que mudou
Feito: apps/web/lib/portal-carga.ts — CARTAO_DA_ENTIDADE com forma_pagamento (Formas de pagamento), prazo_pagamento (Prazos de pagamento) e tabela_escalonada (Tabela escalonada), na ordem do ORDEM_PORTAL do Hub (modules/integracao/domain/portal-carga.ts); apps/web/lib/portal-falso.ts — ORDEM do portal falso igual à do Hub (15 bases); apps/web/lib/portal-telas.test.ts — 'bases livres' passa a conferir a lista exata (ENTIDADES sem vendedor e cliente, 13; ignorando o CSV, todas as 15) e cada uma das 3 bases novas, sem afrouxar.

## Pronto quando
Pronto: eslint, typecheck (next typegen + tsc), vitest 93/93 e timers-sync verdes no apps/web. verificar engenheiro-apps: só 4 violações de anexos em .coord/recados/anexos/ (do alexandre, não minhas; dono: ninguém). Pendente: CI do lote de novo.
