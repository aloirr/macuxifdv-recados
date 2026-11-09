---
id: R-20261031-123752-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: integracao.pedido.retorno_erp@1
criado_em: 2026-10-31T12:37:52-04:00
---
# Retorno do ERP com itens_faturados (opcional) para vendedor.pedido.faturado@1

## Contexto
O desafio de vendas (RN-TRE-08) paga XP no pedido faturado. O Vendedor publica vendedor.pedido.faturado@1 ao consumir integracao.pedido.retorno_erp@1, mas o retorno não traz os itens faturados no parcial. Decisão em docs/desenho/T-0011.md §2: o contrato passa a trazer os itens num campo opcional, que é compatível pela RN-INT-09 e mantém v1/@1.

## O que preciso / o que mudou
(1) modules/integracao/contracts/pedido.ts: RetornoErp ganha itens_faturados: array de { sequencia: int>0 (a mesma de PedidoParaErp.itens[].sequencia), quantidade: int>0 (faturado NESTA nota) }, min(1), opcional; aceito só com status faturado_parcial ou faturado_total (outro status: erro de validação). (2) contracts/eventos.ts: PedidoRetornoErpEvento repete itens_faturados como opcional/nulo. (3) domain, função pura com testes citando RN-INT-08: a sequência existe no pedido enviado; a soma faturada por sequência (este retorno mais os anteriores) não passa da quantidade enviada; violação = 422 com código RN-INT ao Conector. (4) Uma nota no contrato do Conector (doc 06 / docs do módulo): o mapeamento lê os itens da nota por linha do pedido; sem isso o Conector manda o retorno sem o campo e nada quebra. (5) Confirme que a máquina de estados aceita faturado_parcial → faturado_parcial (mais de uma nota parcial).

## Pronto quando
Contrato e evento com o campo opcional, validação no domínio com testes verdes, resposta a este recado. Não depende do despachante (desenho §4, do engenheiro).
