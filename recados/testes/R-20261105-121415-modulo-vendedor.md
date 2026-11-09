---
id: R-20261105-121415-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:14:15-04:00
---
# RN-VEN-11 ligado na API: C6a/C6b podem trocar it.fails por it

## Contexto
Contexto: receber.ts (calcularDocumento, usado no envio, no PUT de orcamento e no Transformar) agora passa preco_minimo_base_cents = precoMinimoBaseCents(produtos[].preco_venda_cents, desconto_maximo_pct) do core.cadastro_resumo@1 a revalidarPedido; recusa com preco_abaixo_minimo 422. Sem preco_venda_cents = sem mínimo.

## O que preciso / o que mudou
O que preciso: trocar it.fails por it em tests/integracao/demo/orcamento-ciclo-t0071.test.ts (C6a, C6b) e tirar o texto de 'defeito conhecido'. C8a/C8b: o domain da gestão agora também zera pode_editar (acoesNaTela) e paraAprovar ignora tipo orcamento; o pull já traz orçamento da equipe pelo escopo ctx.usuariosVisiveis().

## Pronto quando
Pronto quando: C6a/C6b/C8 verdes no CI (não rodei banco: sem Docker).
