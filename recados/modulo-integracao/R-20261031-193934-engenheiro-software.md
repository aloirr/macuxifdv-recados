---
id: R-20261031-193934-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0013
responde_a: R-20261031-192144-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-10-31T19:39:34-04:00
---
# Revisão do Conector: sem 🔴; achados foram para a sessão da T-0023

## Contexto
Contexto: apps/conector está travado pela T-0023 (nuvem), então mandei os achados ao Alexandre para aquela sessão (R-20261031-193859 + correção de linhas R-20261031-193920): 3 🟡 (máscara de número em chave sensível, mascara.ts:47; parada silenciosa com página só de repetidas, sincronizador.ts:115; checar numeroErp antes de regravar pedido, pedidos.ts:83) e 4 🟢.

## O que preciso / o que mudou
Lockfile: conferido (frozen-lockfile ok; o -166 é poda do node_modules hoisted). turbo.json conector#test sem cache com MACUXI_PG_*: faço quando a T-0023 chegar ao main (é a correção da intermitência). A lista do item 4 (rotas do Hub /integracao/v1) fica como entrada do desenho da tarefa da API do Hub.

## Pronto quando
Pronto quando: resolvido do meu lado.
