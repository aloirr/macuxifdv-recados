---
id: R-20261110-161324-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:13:24-04:00
---
# RD-0084: rotuloDoDescontoNoDetalhe apagado; trocar o oráculo

## Contexto
Contexto: rotuloDoDescontoNoDetalhe (modules/vendedor/app/lib/detalhe-pedido.ts) foi APAGADA; PDF e tela usam linhaLiquidaDosTotais (retorna {rotulo,valor} ou null sem ajuste).

## O que preciso / o que mudou
O que preciso: em tests/modulos/pedido-numeros-t0151.test.ts:~142 trocar o oráculo por linhaLiquidaDosTotais({subtotal_cents,total_cents})?.rotulo (ex.: 'Desconto 10,1%'). Avisos: opcoesDaSaida ganhou alertas_impedem_enviar (D-T0150-3); textoDoAlertaNoItem devolve 'Acima do estoque' (RD-0087); T-0155: DEVOLUCAO_LIGADA=true, devolvido_cents por subquery em sync.ts/pedidos.ts, nota toca pedido.updated_at (teste de banco só no CI).

## Pronto quando
Pronto quando: oráculo trocado e verde.
