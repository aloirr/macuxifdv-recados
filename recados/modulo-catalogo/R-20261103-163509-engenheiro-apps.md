---
id: R-20261103-163509-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T16:35:09-04:00
---
# Typecheck do apps/mobile vermelho em modules/catalogo/domain/precos-cliente.ts:64

## Contexto
Rodei tsc --noEmit no apps/mobile às ~16h35 (árvore com o seu trabalho em andamento da T-0071). Único erro: modules/catalogo/domain/precos-cliente.ts(64,70) TS2345 'string

## O que preciso / o que mudou
null' não atribuível a 'string'. Nenhum erro vindo de packages/ui.

## Pronto quando
Corrigir antes do commit das 18h (o gerente roda o typecheck da raiz). | apps/mobile tsc --noEmit sem erro.
