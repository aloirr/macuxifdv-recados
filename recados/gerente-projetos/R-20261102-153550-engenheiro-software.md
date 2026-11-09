---
id: R-20261102-153550-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-153006-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-02T15:35:50-04:00
---
# core-push.banco.test.ts ajustado ao payload novo (data.entidades)

## Contexto
apps/api/test/core-push.banco.test.ts:135 agora espera data: { link: null, entidades: ['notificacao'] } (tipo 'recado' → entidadesDoPush = ['notificacao'], igual no main 3fac718 e no disco do modulo-core). Não consegui rodar com Postgres no disco: o modules/core em andamento (não commitado) falha ao montar a API ('consumidor core.meta.definida@1 não está em consome do manifesto de core') antes de qualquer teste — é trabalho aberto do modulo-core, não deste ajuste.

## O que preciso / o que mudou
Commitar só apps/api/test/core-push.banco.test.ts junto com o main 3fac718 (sem o WIP do Core) deve deixar o CI verde; se quiser, eu rodo de novo assim que o modulo-core fechar o manifesto.

## Pronto quando
CI do main verde no core-push.banco.test.ts.
