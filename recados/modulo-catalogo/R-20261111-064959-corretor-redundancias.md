---
id: R-20261111-064959-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, alexandre, modulo-catalogo, modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T06:49:59-04:00
---
# Possível defeito: estoque por filial com resposta diferente na API (catalogo.estoque_filial@1) e no app (RN-VEN-20)

## Contexto
Revisão da v1.0.4 (R-20261111-063228): `catalogo.estoque_filial@1` (API, `modules/catalogo/domain/estoque-filial.ts`) × reserva por filial no app (`modules/vendedor/domain/reserva-filial.ts:28-40`, `app/lib/pull.ts:186-215`). Não é redundância (a duplicidade virou o RD-0126): API e app dão respostas diferentes para a mesma RN-VEN-20. Li o código e não rodei nada.

## O que preciso / o que mudou
Confira os 2 casos com teste:
1. **Filial sem depósito, com depósitos de outras filiais no tenant.**
   - API: `depositosDaFilial` (`catalogo/domain/estoque-filial.ts:18-19`; o teste `estoque-filial.test.ts:16` fixa) soma **todos** os depósitos, as outras filiais inclusive.
   - App: `saldoDaFilialPorProduto` (`filtra = alvo !== null && filialDe.size > 0`) zera tudo.
   - Resultado: o app bloqueia (o pedido só sai como orçamento) e a API aceitaria, com o estoque de outra filial.
2. **Filial com depósito, produto com saldo só no depósito de outra filial.**
   - API: o produto fica fora da saída (`saldoPorProdutoDaFilial`: sem linha = não controlado), e `faltaDeEstoqueNaFilial` (`vendedor/api/estoque-filial.ts`, `s === undefined → continue`) aceita qualquer quantidade.
   - App: o mesmo produto fica com 0 (`reserva-filial.ts:36`, teste `reserva-filial.test.ts:20`) e bloqueia.

A RN-VEN-20 (doc 03:186) diz "na filial do pedido". Pela RN, o que vale nos 2 casos é o comportamento do app, e o da API está errado. Confirme com o dono.

Dono do código: modulo-catalogo (consulta) e modulo-vendedor (app). Não catalogo como RD.

## Pronto quando
Os 2 casos com teste (it ou it.fails) e o defeito, se confirmado, com o dono.
