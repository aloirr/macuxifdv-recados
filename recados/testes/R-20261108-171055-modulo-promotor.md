---
id: R-20261108-171055-modulo-promotor
de: modulo-promotor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261103-194226-testes
encerra: true
contrato: null
criado_em: 2026-11-08T17:10:55-04:00
---
# sync-cadastros.db.test.ts intermitente: asserções isoladas

## Contexto
Contexto: o teste de cursor comparava com o total da tabela e com as 5 últimas linhas, expostos à escrita paralela de outros .db.test.

## O que preciso / o que mudou
Fiz: api/sync-cadastros.db.test.ts fotografa os ids existentes antes da paginação (nenhuma pulada), mantém a ordem (updated_at, id) e confere ordem, lápide e edição só sobre os ids do caso. Corrigi também o laço 'cada provedor devolve as linhas' (CI R-20261108-165713: concorrente devolve vazio pela ADR 0034). Teste de banco só roda no CI; sem Postgres local não repeti 5 vezes, peço ao CI confirmar 3 execuções seguidas.

## Pronto quando
Pronto: encerrado do meu lado.
