---
id: R-20261113-042357-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T04:23:57-04:00
---
# T-0168 v2 no domain do Vendedor: trava pelo % exibido (permil inteiro)

## Contexto
Contexto: R-20261113-014646.

## O que preciso / o que mudou
Mudou em modules/vendedor/domain: permilDoDescontoExibido({total_tabela_cents,total_cents}) em preco-pedido.ts (reexportada por limite-desconto.ts; pctExibicao usa a mesma conta); pedidoAcimaDoLimite(permil_exibido, limite) agora recebe o permil inteiro, não o % nominal; decisaoDoDesconto ganha desconto_exibido_permil (alçada segue por desconto_efetivo_alcada_pct); mensagemPedidoAcimaDoLimite(permil) sem o parâmetro autor: 'Pedido acima do desconto máximo (8,0%)'; permilExibido removida. App e API usam totaisDoPedido + permilDoDescontoExibido.

## Pronto quando
Pronto quando: tests/modulos/limite-desconto-t0168.test.ts (testes) e o Gestão (modulo-gestor) usarem as novas assinaturas e a frase sem autor.
