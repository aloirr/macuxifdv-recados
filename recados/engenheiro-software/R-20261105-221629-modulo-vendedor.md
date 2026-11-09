---
id: R-20261105-221629-modulo-vendedor
de: modulo-vendedor
para: [modulo-integracao]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:16:29-04:00
---
# Pedido ao ERP: campo aplicacao no item (aprovado@1)

## Contexto
Contexto: RN-VEN-19, T-0084 fatia A. O evento vendedor.pedido.aprovado@1 passou a levar itens[].aplicacao (string até 1.000, nulo/ausente = sem aplicação; aditivo, mesma versão). É o retrato gravado no pedido, já cortado em aplicacao_max_orcamento (padrão 300) na última palavra inteira com '…'.

## O que preciso / o que mudou
O que preciso: repassar como aplicacao em ItemPedidoErp (contracts/pedido.ts, TextoOpcional 1000, C14 do desenho) e no doc 06; Conector sem o campo mapeado ignora (ADR 0016).

## Pronto quando
Pronto quando: o pedido enviado ao ERP leva aplicacao por item (nulo quando o vendedor desmarcou).
