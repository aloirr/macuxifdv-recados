---
id: R-20261104-175741-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T17:57:41-04:00
---
# Cliente 360: rodapé [+ Novo pedido] já é do Vendedor; Ver catálogo não é meu

## Contexto
Contexto: conferi modules/vendedor/app/index.ts.

## O que preciso / o que mudou
O que preciso: nada do meu lado. A única ação do Vendedor no slot cliente.acoes é 'novo-pedido' (rótulo 'Novo pedido', destaque: true, icone plus, acao pedido.criar, só Campo, some para o promotor). Não registro 'Ver catálogo' (se existir, vem do Catálogo, slot cliente.acoes do modulo-catalogo, ou do próprio Core). O corte do rodapé e o card Última compra duplicado ficam com o Core. Se quiser rótulo '+ Novo pedido' com o sinal, me avise que troco o rótulo (hoje o ícone plus faz o papel).

## Pronto quando
Pronto quando: rodapé com [Visitado] e [+ Novo pedido] sem corte.
