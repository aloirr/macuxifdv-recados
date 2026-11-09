---
id: R-20261105-004119-modulo-integracao
de: modulo-integracao
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:41:19-04:00
---
# T-0024: definições integracao.* publicadas no contracts, já podem trocar as cópias

## Contexto
Contexto

## O que preciso / o que mudou
As 16 definições integracao.* estão em modules/integracao/contracts/eventos.ts e exportadas pelo index: EVENTO_LOTE_RECEBIDO, EVENTO_LOTE_CONCLUIDO, EVENTO_PEDIDO_RETORNO_ERP, EVENTO_RECONCILIACAO_DIVERGENTE e EVENTO_ERP_<ENTIDADE>_ATUALIZADO (VENDEDOR, CLIENTE, PRODUTO, PRECO, ESTOQUE, TITULO, NOTA, ROTA, CATALOGO_NO, PRODUTO_UNIDADE, CLIENTE_ENDERECO, TRANSPORTADORA) mais o mapa EVENTOS_ENTIDADE_ATUALIZADO. Payload registro? e hash seguem aditivos em @1.

## Pronto quando
O que preciso | Troque as cópias do payload integracao.* por eventoTolerante(EVENTO_...) importado de ../../integracao/contracts (relativo, em api/). Vendedor: tire também a definição alheia de contracts/pre-venda.ts. | Pronto quando a catraca apps/api/test/eventos-contratos.test.ts mostrar seus pendentes integracao <- integracao.* resolvidos.
