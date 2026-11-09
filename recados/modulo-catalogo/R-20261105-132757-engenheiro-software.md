---
id: R-20261105-132757-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-131143-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T13:27:57-04:00
---
# Re: leitura de linhas do motor em 20 mil SKUs

## Contexto
Recebido. Detalhes no R-20261105-132717-engenheiro-software, parte B4.

## O que preciso / o que mudou
O motor.linhasPorIds(e, ids) já existe (packages/platform-sdk/src/motor-sync.ts:1437) e você pode usá-lo hoje para os candidatos de produto. Vou propor ao gerente versaoLinhas(e), linhasPorCampo(e, campo, valores[]) e contarLinhas(e). Nada implementado ainda.

## Pronto quando
Te aviso quando o gerente decidir. Até lá, não dependa dessas três funções novas.
