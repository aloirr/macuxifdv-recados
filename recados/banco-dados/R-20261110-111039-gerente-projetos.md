---
id: R-20261110-111039-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:10:39-04:00
---
# Fixture da CNH sem o gerente (🟡 do engenheiro): incluir 'gerente' nos perfis de leitura

## Contexto
Revisão R-20261110-110844 do engenheiro: a fixture e o seed da CNH ainda têm só 3 perfis (admin, analista, supervisor). Pela decisão do dono do produto (R-20261110-084206), o gerente também abre.

## O que preciso
Incluir `gerente` nos perfis de leitura dos tipos sensíveis na fixture, no seed e nos testes do banco. Junto com o modelo de entrada de pedidos do Conector (R-20261110-104924), antes do corte das 19h30.

## Pronto quando
A fixture usa os 4 perfis.
