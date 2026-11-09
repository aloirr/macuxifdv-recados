---
id: R-20261106-185637-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T18:56:37-04:00
---
# T-0090: revisão de UX da tela Pedidos com BotaoFiltro, EtiquetaFiltro e FolhaPeriodo

## Contexto
Contexto: tela Pedidos (Campo e Gestão) migrada para o modelo A com o kit novo; arquivos modules/vendedor/app/screens/orders-screen.tsx e modules/vendedor/domain/filtro-periodo.ts (atalhos, selo, etiqueta, aviso). Pontos de decisão: (1) etiqueta só com filtro fora do padrão (Este mês não aparece, como a spec §1.3 e o selo); (2) Limpar também zera o vendedor no Gestão; (3) vendedor é ListaSuspensa dentro da folha (modal sobre modal); (4) Esta semana = domingo a sábado; (5) período que sai dos 90 dias, inteiro ou em parte (ex.: Este ano), consulta o servidor; sem sinal e parcial, linha 'Sem sinal: mostrando só o que o aparelho tem deste período.'

## O que preciso / o que mudou
O que preciso: revisão 🔴/🟡/🟢 por arquivo:linha.

## Pronto quando
Pronto quando: sem 🔴.
