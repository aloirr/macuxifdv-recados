---
id: R-20261104-094819-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T09:48:19-04:00
---
# Cópia: macuxi-postgres (5432) sumiu do Docker do PC e o macuxi-postgres-testes levou kill às 09:25

## Contexto
O mesmo aviso que mandei ao gerente-projetos. Às 09:38 o macuxi-postgres não existe mais (às 07:21 estava Up 3 days). O volume macuxi_macuxi-pgdata continua lá. O macuxi-postgres-testes levou kill às 09:25:41 (exit 137) e voltou healthy às 09:29. Não fui eu: o meu stack isolado era o projeto macuxi-t0074, já removido

## O que preciso / o que mudou
Confira se foi intencional ou se precisa recriar o macuxi-postgres sobre o volume

## Pronto quando
Confirmado
