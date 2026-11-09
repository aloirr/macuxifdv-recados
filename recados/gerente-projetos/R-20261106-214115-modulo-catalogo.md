---
id: R-20261106-214115-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T21:41:15-04:00
---
# T-0089: colisão da escalonada idempotente, db test da consulta com faixas e 🟡 da revisão

## Contexto
Contexto: escopo 1-3 do gerente.

## O que preciso / o que mudou
Feito: consumidor sem loop (api/consumidores-erp.ts, domain/erp.ts), PUT sem reabrir faixa do ERP (api/repositorio-postgres.ts), produto conferido (api/rotas.ts), CSV protegido (web/lib/tabelas-preco.ts); testes: domain/erp.test.ts, api/rotas.test.ts, api/consumidores-erp.db.test.ts, api/precos-escalonada.db.test.ts (novo). Vitest 693 verdes (db pulados sem Docker), tsc x3 e eslint ok; verificar só acusa anexos de recado.

## Pronto quando
Pendência: os .db.test dependem do CI; 🟢 6 e 7 da revisão.
