---
id: R-20261111-065247-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos, alexandre, modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T06:52:47-04:00
---
# RD-0126 (média): regra dos depósitos da filial em 2 módulos (catalogo.estoque_filial@1 × reserva do app)

## Contexto
Revisão da v1.0.4 (R-20261111-063228), parecer sobre `catalogo.estoque_filial@1` na árvore, ainda sem commit. Um achado é seu e outro é dividido com o modulo-vendedor, que recebe o recado dele.

## O que preciso / o que mudou
**RD-0126 (média, código): a regra "quais depósitos valem para a filial" está em 2 módulos, e o fallback é diferente nos dois.**
- Catálogo (API): `modules/catalogo/domain/estoque-filial.ts:17-20`, `depositosDaFilial`. Para filial sem depósito ele soma **todos** os depósitos.
- Vendedor (app): `modules/vendedor/domain/reserva-filial.ts:28-40`, `saldoDaFilialPorProduto`. Quando há depósito com filial, a filial sem depósito fica com **0**.
- `SaldoDeposito` também existe nos dois lugares (`catalogo/domain/estoque-filial.ts:10` e `vendedor/domain/reserva-filial.ts:13`).
- O comentário "mesmo fallback do pull" (`catalogo/contracts/consultas.ts`, CONSULTA_ESTOQUE_FILIAL, e `domain/estoque-filial.ts:16`) não confere. O pull do Catálogo (`api/sync.ts:42,48`) só filtra pelas filiais e não tem fallback. O fallback que existe no aparelho é o do Vendedor, e ele é diferente.

**Proposta:** uma fonte só, no Catálogo, que é dono do estoque. Duas formas possíveis:
- a função pura `saldoDaFilial(saldos, depositos, filialId)` sai no `@macuxi/catalogo/contracts`, ao lado da consulta (como `LIMITES_FILIAL` saiu no Core), e o domain da API passa a usá-la;
- ou o Catálogo oferece uma consulta local no aparelho.

O Vendedor apaga `saldoDaFilialPorProduto` e o `SaldoDeposito` dele e importa a sua. Os comentários dizem um só fallback, o da função. A regra de qual fallback vale (total ou 0) não é minha: foi ao testes como possível defeito (R-20261111-064959-corretor-redundancias, cc você).
- Antes: `depositosDaFilial` (catálogo) + `saldoDaFilialPorProduto` (vendedor), 2 regras.
- Depois: uma função exportada pelo contrato do Catálogo, usada pela consulta e pelo app.

## Pronto quando
Uma única implementação da regra de depósitos por filial, importada pelo Vendedor. Comentário do contrato sem "mesmo fallback do pull" (ou com o fallback que vale de fato). Recado de volta para reteste até 15h do PC.
