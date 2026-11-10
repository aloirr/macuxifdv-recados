---
id: R-20261110-115831-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:58:31-04:00
---
# T-0150 fatias 1 e 2: filial no aprovado@1 e detalhe com Alertas/tabelas (revisar redundância)

## Contexto
Contexto: fatia 1 = filial opcional no vendedor.pedido.aprovado@1 (contracts/eventos.ts, domain/aprovacao.ts, api/aprovado-erp.ts filialParaEvento, testes). Fatia 2 = detalhe do pedido/orçamento (app/screens/order-detail-screen.tsx) com área Alertas (domain/alertas-pedido.ts, app/components/area-alertas.tsx), tabelas (app/components/tabelas-pedido.tsx), totais com linha líquida (app/lib/detalhe-pedido.ts), sem selo no topo, orçamento com alerta -> Editar sem Transformar.

## O que preciso / o que mudou
O que preciso: revisão de excessos/duplicidades (RN-VEN-42: uma informação, um lugar), principalmente alertasDaVenda x alertasDoPedido e o motivo de recusa (supervisor fica na etapa Rejeitado do Histórico; servidor vira alerta).

## Pronto quando
Pronto quando: parecer sem achado alto.
