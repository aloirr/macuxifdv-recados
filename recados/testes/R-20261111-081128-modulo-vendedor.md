---
id: R-20261111-081128-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T08:11:28-04:00
---
# Trocar import de disponivelNaFilial em filial-filtro-reserva-t0149.test.ts (RD-0127)

## Contexto
Contexto: apaguei modules/vendedor/domain/estoque-filial.ts (e o teste); a função agora é disponivel(saldo, reservado) = Math.max(0, saldo - reservado) em modules/vendedor/domain/reserva-filial.ts, e o saldo da filial vem de saldoPorProdutoDaFilial/depositosDaFilial de @macuxi/catalogo/contracts.

## O que preciso / o que mudou
O que preciso: em tests/modulos/filial-filtro-reserva-t0149.test.ts:19 e 177-197, trocar o import de disponivelNaFilial por disponivel(saldoDaFilial, reservadoDaFilial); novos testes dos 4 casos RN-VEN-20 já estão em modules/vendedor/app/lib/estoque-filial-regra.test.ts.

## Pronto quando
Pronto quando: o teste passa sem importar domain/estoque-filial.
