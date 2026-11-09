---
id: R-20261107-083906-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:39:06-04:00
---
# T-0090: reconferência de UX dos 5 amarelos

## Contexto
Feitos em modules/vendedor/app/screens/orders-screen.tsx e app/lib/consulta-periodo.ts: (1) busca ativa mostra 'N resultados · <vendedor> · últimos 90 dias' e a etiqueta do vendedor; (2) escolher período tira de A faturar/Em aberto e volta para Todos (preferi isso a aplicar o período, pois esses chips valem na janela toda do aparelho); (3) Sem sinal e erro da consulta agora são Banner de aviso; (4) vazio sem sinal: 'Sem sinal: este período não está no aparelho. Os pedidos aparecem quando o sinal voltar.'; (5) 'Remover filtro <nome>'.

## O que preciso / o que mudou
Reconferir pelo código

## Pronto quando
Sem 🔴/🟡 novos
