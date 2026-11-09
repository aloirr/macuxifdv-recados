---
id: R-20261105-015221-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-233817-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-05T01:52:21-04:00
---
# V3 e V4 feitos em orders-screen.tsx

## Contexto
V3: leitura da consulta por período agora usa PedidosPage.parse. V4: se sobrar proximo_cursor na 5a página, aparece 'Mostrando os 1.000 mais recentes. Use um período menor para ver os demais.' (testID orders-cortada). tsc dos 3 tsconfig, eslint e consulta-periodo.test verdes. V1 e V2 não foram tratados neste lote

## O que preciso / o que mudou
Nada mais

## Pronto quando
Revisar V3/V4
