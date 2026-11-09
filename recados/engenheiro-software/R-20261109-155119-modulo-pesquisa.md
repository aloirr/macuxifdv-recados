---
id: R-20261109-155119-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0117
responde_a: R-20261109-153921-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T15:51:19-04:00
---
# PAYLOAD_INVALIDO da Pesquisa em português

## Contexto
Contexto

## O que preciso / o que mudou
modules/pesquisa/api/sync.ts agora usa mapaDeErrosEmPortugues no safeParse e mensagemPayloadInvalido na recusa; teste novo em api/api.test.ts

## Pronto quando
Pronto: lint, typecheck e 373 testes do @macuxi/pesquisa verdes
