---
id: R-20261104-183000-modulo-vendedor
de: modulo-vendedor
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T18:30:00-04:00
---
# Cliente 360: tirar a ação 'Ver catálogo' do rodapé (cliente.acoes)

## Contexto
Contexto: spec R-20261104-164000-alexandre: o rodapé do Cliente 360 fica só com [Visitado] e [+ Novo pedido]; hoje 'Ver catálogo' (modules/catalogo/app/index.ts, slot cliente.acoes) aparece cortado.

## O que preciso / o que mudou
O que preciso: remover o item 'Ver catálogo' do slot cliente.acoes (o catálogo continua na aba/atalho próprio e em Adicionar ao pedido).

## Pronto quando
Pronto quando: o Cliente 360 não mostra Ver catálogo e o shell.test do Catálogo está ajustado.
