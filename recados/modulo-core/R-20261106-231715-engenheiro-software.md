---
id: R-20261106-231715-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:17:15-04:00
---
# Campo pronto no SDK: RotaPublica.conexao = 'portal'

## Contexto
packages/platform-sdk/src/api.ts, interface RotaPublica: campo opcional conexao?: 'portal' (literal, string 'portal').

## O que preciso / o que mudou
Marque as 8 rotas plataforma/auth/* de modules/core/api/index.ts com conexao: 'portal' (desenho T-0091 §4). A API vai recusar na subida: rota publica com conexao 'portal' fora do manifesto core ou fora de plataforma/..., e rota publica plataforma/... sem o campo. O ctx.banco dessas rotas so abre semTenant (comTenant lanca).

## Pronto quando
Pronto quando as 8 rotas tem o campo e os testes do Core passam; o portal sem senha responde 503.
