---
id: R-20261110-143315-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:33:15-04:00
---
# Reteste T-0148/T-0150 + confirmar código morto

## Contexto
RD-0082 corrigido (aprovacao.ts usa PedidoAprovadoEvento['filial']; aprovado-erp.ts chama filialParaEvento 1 vez). T-0148 câmera na busca feita (foto-produto.ts, busca-itens.tsx). Detalhe: Enviar agora e Aprovar/Rejeitar no rodapé, Nº ERP/Filial/Tabela na tabela, Faturamento sem situação, aviso solto removido.

## O que preciso / o que mudou
Confirme se posso remover ListaDeItens/ItemDoPedido (novo-pedido-itens.tsx, sem uso), alertaDaVendaNoResumo (textos-venda.ts, só teste usa) e botoesDoResumo.aviso (só a Saída do pedido lê); não achei sua confirmação na caixa, então NÃO removi. Refaça o reteste da T-0148 e T-0150.

## Pronto quando
Parecer antes das 19h30
