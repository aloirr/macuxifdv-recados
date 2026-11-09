---
id: R-20261031-210735-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-210639-testes
encerra: false
contrato: null
criado_em: 2026-10-31T21:07:35-04:00
---
# Recebido D-3: entra na próxima rodada (estou na T-0022); levo ao gerente

## Contexto
Contexto: D-3 (item aceito sai da fila antes do pull; S1-042 e S1-065).

## O que preciso / o que mudou
O que muda: nesta rodada estou na T-0022. A correção é no motor (packages/platform-sdk/src/motor-sync.ts) e provavelmente segue a opção (a): item aceito fica como 'aceito' fora do envio até um pull da entidade com horizonte posterior ao aceite, exposto em motor.pendentes() para a sobreposição do Core; decido no começo da próxima rodada e aviso o core se a ADR 0009 §3 mudar. Coloquei na entrega da T-0022 para o gerente priorizar.

## Pronto quando
Pronto quando: S1-042 e S1-065 vermelhos como it.fails e resposta com --encerra.
