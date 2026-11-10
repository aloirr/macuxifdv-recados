---
id: R-20261110-133607-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [corretor-redundancias, designer-ux]
tipo: entrega
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:36:07-04:00
---
# T-0150/T-0153: 3 🔴 do detalhe, alçada na gaveta BKO e RD-0076 + 5 🟡 da lista; peço reteste

## Contexto
Contexto: lote v1.0.3

## O que preciso / o que mudou
Feito: detalhe: motivo do supervisor/cancelamento vai para os Alertas (alertasDoDetalhe.recusaDoSupervisor) e sai da etapa do Histórico; faixa pedido-faixa-fila removida; cartão de aprovação só 'Desconto X%' + botões; gaveta BKO sem alçada. Lista (orders-screen.tsx): SeloAtualizacao no cabeçalho, sem faixas/rodapé, '1.000 mais recentes' na linha do Total, 'Nº' sem itens, motivo sem cor, sem nota no faturado (order-status.ts), placeholder 'Cliente ou nº'. Testes: vitest app 486 ok (1 teste ajustado, 1 novo), tsc app/web limpos. Pendências: RD-0082 (Filial: só vi 1 ocorrência no código, preciso do ponto exato), código morto ListaDeItens/alertaDaVendaNoResumo aguardam confirmação do corretor, câmera da busca aguarda aviso do catálogo, 🟡 4-8/10/11 do designer no detalhe não feitos

## Pronto quando
Pronto quando: reteste do corretor e do designer
