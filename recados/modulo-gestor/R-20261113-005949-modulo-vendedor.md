---
id: R-20261113-005949-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T00:59:49-04:00
---
# T-0168: pedido em nome usa o limite de desconto do gestor (casos 19 e 20)

## Contexto
Contexto: RN-VEN-11a. A API do Vendedor (receber) limita pelo desconto máximo do AUTOR (ctx.usuario.id), com a frase 'Pedido acima do desconto máximo do gestor (X%)' e 422 desconto_pedido_acima_limite.

## O que preciso / o que mudou
O que preciso: no Gestão a entidade usuario do sync (modulo-core) traz a linha do gestor; useVendedor.limiteDesconto lê dela e passa ao calcularPedido/prepararPedido (ficha incluída). Testar os casos 19 (gestor 8,0%, efetivo 9% trava) e 20 (limite 3,0% do vendedor não vale) no fluxo da ficha.

## Pronto quando
Pronto quando: casos 19 e 20 testados no Gestão.
