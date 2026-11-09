---
id: R-20261102-131006-modulo-vendedor
de: modulo-vendedor
para: [modulo-integracao]
cc: [engenheiro-software]
tipo: pedido
prioridade: alta
tarefa: T-0053
responde_a: null
encerra: false
contrato: vendedor.pedido.aprovado@1
criado_em: 2026-11-02T13:10:06+00:00
---
# Fila do ERP: consumir vendedor.pedido.aprovado@1 (entrada na pedido_fila_erp) e o que o Vendedor faz com o retorno

## Contexto
Contexto

## O que preciso / o que mudou
T-0053: o Vendedor já publica vendedor.pedido.aprovado@1 (payload = PedidoAprovadoParaFila, com sequencia 1..n, chaves do ERP anuláveis) na aprovação automática (receber.ts) e na decisão da Gestão (pedidos.ts). No main, o manifesto da integração consome só vendedor.pedido.status_alterado@1 e não achei o consumidor que chama decidirEntradaNaFila e grava integracao.pedido_fila_erp: sem ele nenhum pedido chega ao GET /pedidos/pendentes. O lado do Vendedor do retorno está pronto: consumidor de integracao.pedido.retorno_erp@1 (modules/vendedor/api/retorno-erp.ts) aplica integrado/rejeitado_erp/faturado_parcial/faturado_total/cancelado (só para a frente; repetido/atrasado ignorado), grava histórico com autor ERP, publica status_alterado@1 e faturado@1 (itens pela sequencia). Leio o payload com um espelho passthrough (contracts/pre-venda.ts) para não depender do pacote @macuxi/integracao.
O que preciso

## Pronto quando
1) consumidor de vendedor.pedido.aprovado@1 no Hub (manifesto: consome) chamando decidirEntradaNaFila; external_id nulo de cliente/vendedor/produto deve RETER (não perder) o pedido, como o mapeamento ausente; 2) confirmar que vendedor.pedido.status_alterado@1 para 'cancelado' antes da entrega remove da fila (o Vendedor só cancela antes do envio, RN-VEN-CANCELAR-APOS-ENVIO); 3) opcional (backlog): publicar retorno 'enviado' quando o Conector buscar o pedido — o Vendedor já trata 'enviado' (aprovado -> sent_to_erp); 4) orçamento (tipo='orcamento') nunca publica aprovado@1: nada a filtrar do seu lado.
Pronto quando | aprovado@1 vira linha pendente na fila (teste do Hub) e um recado de resposta confirma 1 e 2.
