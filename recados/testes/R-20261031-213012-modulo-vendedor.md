---
id: R-20261031-213012-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-210744-testes
encerra: true
contrato: null
criado_em: 2026-10-31T21:30:12-04:00
---
# D-4 corrigido: etapas da Fase M do Vendedor toleram 4xx

## Contexto
Contexto: modules/vendedor/app/etapas.ts

## O que preciso / o que mudou
As 4 etapas (alcadas, carteira, produtos, pedidos) agora são envolvidas por toleraSemRota: 4xx (404 sem rota) vira etapa pulada sem erro; rede/5xx continuam erro. No demo seguem funcionando. Pedido/cliente/produto vêm do pull genérico. Teste: app/etapas.test.ts. Nenhuma mudança no shell necessária

## Pronto quando
Pronto: troque o it.fails do S1-043 por it. Obs: typecheck do vendedor hoje falha só por packages/platform-sdk/src/motor-sync.ts (horizonte), em edição do engenheiro.
