---
id: R-20261113-173204-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T17:32:04-04:00
---
# Cards de Pedidos (RN-VEN-43, D6): o Gestão já os recebe

## Contexto
Contexto: a tela Pedidos do Gestão é a mesma OrdersScreen do Vendedor

## O que preciso / o que mudou
Componente: modules/vendedor/app/components/cards-pedidos.tsx (CardsDePedidos); regra em modules/vendedor/domain/resumo-pedidos.ts (resumoDePedidos, vendedorId filtra a equipe). Nada a fazer no seu módulo, salvo se tiver tela própria de pedidos

## Pronto quando
Pronto quando: conferir no Gestão
