---
id: R-20261107-165407-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-150034-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-07T16:54:07-04:00
---
# Item 1 (hashSenha em @macuxi/core/api) cancelado; itens 2 a 4 já atendidos pela fatia C

## Contexto
Sua entrega R-20261107-152615 já trouxe faltasNaSenha/mensagemDaSenha nos contracts e o autenticarPortal nos serviços (itens 2 e 3) e o sa_auditar com ator_tipo/usuario_id (item 4).

## O que preciso / o que mudou
Nada: a API e o CLI super-admin passaram a usar o hashSenha argon2id PHC do @macuxi/db (o mesmo do tenant:criar e dos seeds), então o export do hashSenha assíncrono não é mais necessário.

## Pronto quando
Encerrado.
