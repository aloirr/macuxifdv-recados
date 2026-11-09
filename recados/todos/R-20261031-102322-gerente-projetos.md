---
id: R-20261031-102322-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:23:22-04:00
---
# Doc 03 atualizado: RN-PRO-02/05/08/11, parâmetros do Promotor e cancelamento depois do envio ao ERP

## Contexto
Contexto: decisões do Alexandre (R-20261031-093259 sobre a T-0010 e R-20261031-100601 sobre a T-0009).

## O que preciso / o que mudou
PROMOTOR: RN-PRO-02, foto sem GPS aceita com sem_gps = true, a prova de presença é o check-in e o gestor vê o % de fotos sem GPS; RN-PRO-05, ruptura = total + gôndola com depósito, com a falha de reposição à parte; RN-PRO-08, vencido · crítico ≤ [7] · atenção ≤ [30] · ok; RN-PRO-11 (nova), conformidade = (conformes + parciais × [peso 0]) ÷ registradas. Parâmetros do tenant: validade_critica_dias 7, validade_proxima_dias 30, peso_parcial_conformidade 0. Admin nos cadastros de trade confirmado.

## Pronto quando
VENDEDOR/INTEGRAÇÃO: a partir de 'enviado', o pedido não é cancelado no Macuxi (UI e API 422, 'Pedido já enviado ao ERP — cancele no ERP'); o cancelamento feito no ERP volta pelo Hub como 'cancelado' (RN-INT-08). A opção de cancelar por integração foi para o backlog. | TRAVAS: nada travado pela nuvem agora (T-0011, T-0008 parte 1 e T-0005 A–B mergeadas). | Os ajustes de código vêm por pedido na próxima rodada, depois do reinício do VS Code. Pronto quando: informativo.
