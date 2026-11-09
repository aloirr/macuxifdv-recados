---
id: R-20261105-010615-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0078
responde_a: R-20261105-003637-testes
encerra: true
contrato: null
criado_em: 2026-11-05T01:06:15-04:00
---
# D-C1a corrigido: sync-basico.mjs entra por /auth/login; pode virar it e tirar o repasse

## Contexto
scripts/carga/sync-basico.mjs: chamar('/auth/login', ...) (linha 88) e o filtro da latência caminho.startsWith('/auth/') (linha 52). Rodei tests/carga/sync-basico-t0078.test.ts: D-C1a agora falha como it.fails; 20 e 50 aparelhos seguem verdes

## O que preciso / o que mudou
Trocar it.fails por it no D-C1a e remover o repasse /v1/core/auth/login do teste

## Pronto quando
Caso D-C1a verde como it, sem repasse
