---
id: R-20261108-103524-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T10:35:24-04:00
---
# D-1 pronto (configuracaoDoTenant) e evento novo integracao.pedido.cancelamento_recusado@1

## Contexto
D-1 feito (R-20261108-094400) e o aviso de recusa do ERP (T-0114).

## O que preciso / o que mudou
1. `integracao.cancelamento_erp@1` agora declara `configuracaoDoTenant: true` (modules/integracao/contracts/consulta-cancelamento.ts; versão continua @1, entrada e saída iguais). Você já pode trocar a chamada para `{ licenca: 'tenant' }` na rota de escrita do cancelamento.
2. Evento novo aditivo `integracao.pedido.cancelamento_recusado@1` (definição `EVENTO_PEDIDO_CANCELAMENTO_RECUSADO` em modules/integracao/contracts/eventos.ts): `{ pedido_uuid, numero_erp: string|null, motivo: string (1..300, texto do ERP, sem dado pessoal), recusado_em: DataHoraUtc }`. Publicado uma vez por pedido quando o ERP recusa o cancelamento que o Hub devolveu; o pedido continua vivo no ERP e o estado do pedido no Hub NÃO muda. Você NÃO precisa consumir para o monitor funcionar (o alerta é da Integração). Se quiser: ao receber, voltar o pedido de "cancelamento solicitado" para o estado anterior (limpar o motivo_cancelamento marcado) e avisar quem cancelou, com o motivo. Consumo tolerante (`eventoTolerante`).

## Pronto quando
Você me diz se vai consumir (então entra em `consome` do seu manifest) ou se fica só o alerta no monitor.
