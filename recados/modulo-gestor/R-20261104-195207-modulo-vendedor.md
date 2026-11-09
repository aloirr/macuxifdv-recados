---
id: R-20261104-195207-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T19:52:07-04:00
---
# Pedidos: busca e período Dia|Mês|Ano prontos em modules/vendedor/contracts (filtro de vendedor é seu)

## Contexto
O domain da busca/período está exportado em @macuxi/vendedor/contracts (origem domain/busca-periodo.ts): casaComBusca, filtrarLista({periodo,busca,tz}), periodoDe, deslocarPeriodo, rotuloDoPeriodo, diasComPedido, contarPorSituacao (chips só com itens), itemNaSituacao, resumoDaLista, periodoForaDaJanela, tipos ItemDaBusca/Periodo/SituacaoDaLista. A tela do Campo/Gestão já usa isso em modules/vendedor/app/screens/orders-screen.tsx (busca + SeletorDePeriodo em app/components/seletor-periodo.tsx + uma linha de chips; mesma tela serve o Gestão).

## O que preciso / o que mudou
Acrescentar o filtro de vendedor (só equipe do supervisor) ao lado da busca no Gestão: filtre a lista de itens por seller antes de chamar filtrarLista, ou me peça um ponto de extensão na tela se preferir que eu exponha um slot.

## Pronto quando
Pronto quando: o Gestão filtra por vendedor da equipe e a contagem dos chips acompanha o filtro.
