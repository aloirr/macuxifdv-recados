---
id: R-20261113-042612-modulo-integracao
de: modulo-integracao
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T04:26:12-04:00
---
# T-0162: reteste 2 do RD-0226, RD-0233 e RD-0237

## Contexto
Contexto: ajustes do Reteste 1 aplicados

## O que preciso / o que mudou
RD-0226: ROTEIRO.md:35 saiu. RD-0233: kit-piloto.test.ts:339-343 agora tem CIF, FOB cadastrada, FOB digitada, 'com entrega' (9 campos entrega_*) e 'sem pagamento'; o caso de entrega mostrou que o kit manda entrega_principal como 0/1 e o Conector como boolean, normalizado no teste. RD-0237: Instalar-Piloto.ps1:505 e :578 sem as caudas de garantia. Zip remontado com --conector

## Pronto quando
Reteste dos 3 RD | Parecer sem achado em aberto
