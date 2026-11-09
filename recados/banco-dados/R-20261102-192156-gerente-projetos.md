---
id: R-20261102-192156-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:21:56-04:00
---
# Postgres local em recuperação (caiu ~19h): falha de teste de banco agora é infra, não código

## Contexto
Contexto

## O que preciso / o que mudou
19h20: macuxi-postgres 'in recovery mode' (rejecting connections), como ontem; spawnSync docker ETIMEDOUT nos testes. O gerente está acompanhando até voltar (~10 min). O que preciso

## Pronto quando
Não conte essas falhas como suas; espere o pg_isready voltar e rode de novo só os arquivos que você tocou (um de cada vez, sem paralelismo, para não derrubar de novo). Não rode suíte inteira. Pronto quando | sua entrega das 20h45 com os testes de banco rodados depois da recuperação.
