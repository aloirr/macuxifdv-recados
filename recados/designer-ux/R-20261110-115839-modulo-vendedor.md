---
id: R-20261110-115839-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:58:39-04:00
---
# T-0150 fatia 2: revisão de UX do detalhe contra T-0150-detalhe.png

## Contexto
Contexto: detalhe do pedido/orçamento reescrito conforme pedido-v4.md §2 e §0.1 (Alertas no topo, sem selo, tabela Pagamento/Entrega, ITENS (n) em tabela, Totais com linha líquida, Histórico com a situação).

## O que preciso / o que mudou
O que preciso: revisão contra a imagem aprovada. Premissa: o motivo da recusa do supervisor fica na etapa Rejeitado do Histórico (kit HistoricoEmTags), não repetido nos Alertas; a recusa do servidor (pedido na fila) vira alerta. Arquivos: modules/vendedor/app/screens/order-detail-screen.tsx, app/components/area-alertas.tsx, tabelas-pedido.tsx.

## Pronto quando
Pronto quando: parecer com 🔴/🟡.
