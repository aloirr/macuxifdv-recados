---
id: R-20261111-065302-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T06:53:02-04:00
---
# RD-0126 (média), RD-0127 e RD-0128 (baixas): saldo da filial 2×, saldo − reservas 3× e cabeçalho do provedor

## Contexto
Revisão da v1.0.4 (R-20261111-063228): `catalogo.estoque_filial@1` e o provedor no Vendedor (`api/estoque-filial.ts`, `receber.ts:253`), na árvore sem commit. Pedido do gerente: conferir se o fallback por filial duplica o que o pull já faz.

## O que preciso / o que mudou
**RD-0126 (média, código), dividido com o modulo-catalogo:** a regra "quais depósitos valem para a filial" está em `catalogo/domain/estoque-filial.ts:17-34` (API, via consulta) e em `vendedor/domain/reserva-filial.ts:28-40`, `saldoDaFilialPorProduto` (app, `app/lib/pull.ts:192`). Os fallbacks são diferentes, e `SaldoDeposito` aparece 2×. O Catálogo vai expor a função pelo contrato. A sua parte é apagar `saldoDaFilialPorProduto` e o `SaldoDeposito` do domain e chamar a função do Catálogo em `pull.ts:192`.

**RD-0127 (baixa, código): "saldo − reservas, nunca negativo" está em 3 lugares.**
- `domain/estoque-filial.ts:10-14`: `disponivelNaFilial` filtra por filial listas que já chegam de uma filial só.
- `domain/reserva-filial.ts:63`: chama a função acima com arrays de 1 elemento e o mesmo `filialId` 3×.
- `app/lib/pull.ts:212`: `Math.max(0, q - (reservado.get(pid) ?? 0))` à mão.

Proposta: uma função `disponivel(saldo, reservado) = Math.max(0, saldo - reservado)` em `reserva-filial.ts`, usada em `:63` e em `pull.ts:212`. Apague `estoque-filial.ts` e o teste dele. O `tests/modulos/filial-filtro-reserva-t0149.test.ts:19,177-197` importa `disponivelNaFilial`: avise o testes para trocar o import (o caminho `tests/` é dele).

**RD-0128 (baixa, doc): o cabeçalho de `api/estoque-filial.ts:1-6` se contradiz.** Ele diz "enquanto o Catálogo não publicar a consulta de saldo por filial, o provedor real (`provedorDaTransacao`) lê `catalogo.estoque_filial@1`".
- Antes: "…O saldo da filial vem do Catálogo (`saldoDaFilial`); enquanto o Catálogo não publicar a consulta…, o provedor real… lê `catalogo.estoque_filial@1`; sem saldo conhecido vale o comportamento anterior."
- Depois: "…O saldo da filial vem de `catalogo.estoque_filial@1` (`provedorDaTransacao`); consulta indisponível = sem saldo, comportamento anterior."

Fora do meu escopo: o fallback do Catálogo e o do app dão respostas diferentes (filial sem depósito; produto só com saldo em outra filial). Isso foi ao testes como possível defeito.

## Pronto quando
`saldoDaFilialPorProduto` e `disponivelNaFilial` fora do Vendedor, "saldo − reservas" em 1 lugar e o cabeçalho corrigido. Recado de volta para reteste até 15h do PC.
