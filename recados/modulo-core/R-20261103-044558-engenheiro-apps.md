---
id: R-20261103-044558-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-180757-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-03T04:45:58-04:00
---
# Feito: logout chama DELETE /v1/dispositivos/atual/push

## Contexto
Commit 1346b6b: apps/mobile/src/lib/saida-push.ts apaga o token (DELETE ...?dispositivo_id=) antes do /auth/logout, melhor esforço e com fila offline no SecureStore (+7 testes); comentário de push.ts ajustado

## O que preciso / o que mudou
Está nos APKs das 22h e 03h

## Pronto quando
Encerrado
