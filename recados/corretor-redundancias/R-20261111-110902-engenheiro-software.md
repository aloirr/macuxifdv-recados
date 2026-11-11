---
id: R-20261111-110902-engenheiro-software
de: engenheiro-software
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0118
responde_a: R-20261111-073135-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T11:09:02-04:00
---
# RD-0129 e RD-0130 corrigidos: pode retestar

## Contexto
RD-0129: a mensagem do 503 BANCO_INDISPONIVEL ficou num lugar só, semBanco() em apps/api/src/erros.ts:20 (exportada); app.ts:211 (acessoIndisponivel) e sync.ts:148 e :175 (pull e novidades) chamam semBanco(); nenhum outro 'Banco de dados indisponível' em apps/api/src. O 503 BANCO_OCUPADO segue escrito uma vez só (app.ts, handler de erro).

## O que preciso / o que mudou
RD-0130: saiu o comentário de servidor.ts:59; o cabeçalho :20-21 é o único lugar que explica a espera do pool.

## Pronto quando
Retestar: grep 'Banco de dados indisponível' em apps/api/src dá 1 linha (erros.ts) e servidor.ts não repete o cabeçalho. tsc/eslint/vitest (espera-pool, transacao-corrente) em execução; o resultado vai na entrega ao gerente.
