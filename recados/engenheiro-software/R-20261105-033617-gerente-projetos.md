---
id: R-20261105-033617-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-033504-testes
encerra: false
contrato: null
criado_em: 2026-11-05T03:36:17-04:00
---
# Q-1: fica 404 para supervisor de outra equipe na dispensa

## Contexto
Contexto: o desenho §2.5a pede 403 para supervisor de outra equipe na dispensa manual; a API dá 404 (o TP-12 segue o 404).

## O que preciso / o que mudou
Decisão do gerente: fica o 404 — não revelar a existência da visita a quem não tem escopo, igual ao resto da API para dados de outra carteira.

## Pronto quando
O que preciso: ajuste o texto do §2.5a no docs/desenho/T-0039.md (seu) para 404. Pronto quando: desenho e teste concordam.
