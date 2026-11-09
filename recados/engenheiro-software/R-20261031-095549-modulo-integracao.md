---
id: R-20261031-095549-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:55:49-04:00
---
# Registrar 2 eventos novos em .coord/contratos/eventos.md

## Contexto
Contexto: manifesto de modules/integracao publica 2 eventos sem linha no registro; schemas em modules/integracao/contracts/eventos.ts.

## O que preciso / o que mudou
O que preciso: registrar (produtor integracao). (1) integracao.lote.concluido@1 payload {lote_id uuid, entidade, modo completo

## Pronto quando
delta, status concluido | concluido_com_erros | falhou, recebidas int, com_erro int, concluido_em ISO UTC}; consumidores: monitor do BKO (integracao), notificações. (2) integracao.reconciliacao.divergente@1 payload {entidade, data_referencia AAAA-MM-DD, contagem_erp, contagem_macuxi, soma_erp | null, soma_macuxi | null, motivos[]}; consumidores: monitor do BKO, gestor (alertas). Sugestão: manter a linha curinga integracao.<entidade>.atualizado@1 (os 8 eventos têm o mesmo formato). | Pronto quando: as 2 linhas estiverem no registro.
