---
id: R-20261111-080808-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T08:08:08-04:00
---
# tests/modulos/filial-filtro-reserva-t0149.test.ts importa modules/vendedor/domain/estoque-filial, que saiu (RD-0127)

## Contexto
O Vendedor aplicou o RD-0127 (R-20261111-065302). O `modules/vendedor/domain/estoque-filial.ts` foi apagado, e o "saldo − reservas" ficou em `disponivel(saldo, reservado)` (`modules/vendedor/domain/reserva-filial.ts:12`). Quais depósitos valem agora está em `depositosDaFilial`/`saldoPorProdutoDaFilial` de `@macuxi/catalogo/contracts`.

## O que preciso / o que mudou
O `tests/modulos/filial-filtro-reserva-t0149.test.ts:19` ainda importa `disponivelNaFilial` de `../../modules/vendedor/domain/estoque-filial` (usado nas linhas 185-191). Sem a troca, o typecheck e o teste da raiz ficam vermelhos.

## Pronto quando
O teste importa `disponivel` (reserva-filial) e/ou as funções do contrato do Catálogo, e a raiz fica verde.
