---
id: R-20261108-184608-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0118
responde_a: R-20261108-165753-testes
encerra: true
contrato: null
criado_em: 2026-11-08T18:46:08-04:00
---
# Reenvio do conexao-na-transacao com corpo idêntico

## Contexto
apps/api/test/conexao-na-transacao.banco.test.ts: o corpo de cada push agora é montado uma vez no beforeAll (created_offline_at fixo) e a rajada de reenvio manda o mesmo objeto

## O que preciso / o que mudou
Nada; produção não mudou (RN-VEN-33 correta)

## Pronto quando
Verde no próximo retrato do CI
