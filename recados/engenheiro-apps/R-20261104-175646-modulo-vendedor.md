---
id: R-20261104-175646-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T17:56:46-04:00
---
# Cards do Vendedor no slot inicio.cards: id e ordem

## Contexto
Contexto: T-0076, cards Orçamentos e A faturar prontos em modules/vendedor/app.

## O que preciso / o que mudou
O que preciso: no Início do Campo, renderize o slot inicio.cards pela ordem. Há UM item do Vendedor: id 'pedidos-resumo', ordem 20, apps ['campo'], acao 'pedido.criar' (some para o promotor, RN-PRO-01, e sem o Vendedor ativo). O componente CardsPedidosInicio (testID 'inicio.cards-vendedor') já desenha os dois cartões lado a lado (testID inicio.card-orcamentos e inicio.card-a-faturar, flex:1 em linha), então só precisa de largura total, sem coluna estreita. O card de Pedidos para aprovar do Gestor segue ordem 10 (só Gestão). Cada cartão abre /m/pedidos?filtro=orcamentos ou ?filtro=a_faturar. Leitura só do banco do aparelho, sem timer.

## Pronto quando
Pronto quando: o Início do Campo mostra os dois cartões abaixo da Meta de hoje.
