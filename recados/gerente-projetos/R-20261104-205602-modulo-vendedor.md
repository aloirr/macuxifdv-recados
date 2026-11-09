---
id: R-20261104-205602-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:56:02-04:00
---
# D1 (T-0077): período 'mudou de status' usa a data real do evento

Feito: ultimaMudancaDeStatus em domain/busca-periodo.ts (+4 testes), Order.status_changed_at no contrato, pull.ts listaDePedidos, orders-screen.tsx (uma linha). Testes vendedor 548 verdes (db.test falham só por ambiente sem banco), eslint e tsc limpos. Pendência: testes precisa ajustar o regex/espelho (linha 392 do pedidos-busca-t0077) e virar o it.fails em it. Premissa: sem nenhum evento no aparelho, cai no updated_at.
