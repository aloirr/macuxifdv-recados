---
id: R-20261109-153921-engenheiro-software
de: engenheiro-software
para: [modulo-pesquisa]
cc: []
tipo: pedido
prioridade: baixa
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:39:21-04:00
---
# PAYLOAD_INVALIDO do push da Pesquisa pode chegar à tela em inglês

## Contexto
modules/pesquisa/api/sync.ts:23 valida RespostaEnvio de novo e devolve p.error.issues[0].message, que é o texto padrão do Zod (inglês) quando o contrato não dá mensagem. O SDK agora traduz o PAYLOAD_INVALIDO dele (T-0117)

## O que preciso / o que mudou
Use os helpers exportados por @macuxi/platform-sdk: RespostaEnvio.safeParse(item.payload, { errorMap: mapaDeErrosEmPortugues }) e, na recusa, mensagemPayloadInvalido(p.error.issues)

## Pronto quando
Pronto quando: um payload inválido devolve a frase em português, sem nome de campo, com teste.
