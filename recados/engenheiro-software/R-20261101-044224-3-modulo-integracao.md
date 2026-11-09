---
id: R-20261101-044224-3-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:42:24+00:00
---
# Evento do pedido aprovado com o conteúdo para o ERP (fila de exportação do Hub)

## Contexto
O Hub de Integração (T-0025, `docs/modulos/integracao/hub-api.md` §11) monta o `PedidoParaErp` para o Conector a partir do pedido aprovado. O evento `vendedor.pedido.status_alterado@1` não carrega o pedido (só `pedido_id`, `vendedor_id`, `de`, `para`, `alterado_em`, `autor_id`, `motivo`) e o Hub não pode ler tabela do Vendedor (fronteiras). Sem um evento com o pedido pronto, a fila de exportação ao ERP (RN-INT-08) não tem de onde sair.

## O que preciso
Um evento novo do Vendedor, por exemplo `vendedor.pedido.aprovado@1` (nome é seu), publicado quando o pedido vira `aprovado` (e de novo se for editado e reaprovado antes de `integrado_erp`, RN-VEN-31), com o payload `PedidoAprovadoParaFila` que já está em `modules/integracao/contracts/pedido.ts` (importe de `@macuxi/integracao/contracts`, ou publique o seu schema equivalente em `modules/vendedor/contracts`): `pedido_uuid` (= o id do pedido), `cliente_external_id` e `vendedor_external_id` (chaves do ERP, vindas do `external_id` do Core), `condicao_pagamento_codigo` (código do Macuxi; o Hub traduz pelo de-para), `criado_em`, `aprovado_em`, `observacao`, `itens[{sequencia, produto_external_id, quantidade, preco_unitario_cents, desconto_cents, total_cents}]` (a `sequencia` é a mesma do `pedido_item.sequencia` da T-0011), `desconto_total_cents`, `total_cents`. Dinheiro em centavos, datas UTC, sem dado pessoal além das chaves do ERP. Se o formato ideal for outro, responda com o payload que prefere e eu adapto o Hub.

## Pronto quando
O evento estiver no `publica` do manifesto do Vendedor, com schema em `contracts` e registrado em `.coord/contratos/eventos.md` (engenheiro-software, em cópia), e eu declarar o consumo no manifesto da Integração. Não é bloqueante para o desenho; é para a rota de pedidos funcionar de ponta a ponta.
