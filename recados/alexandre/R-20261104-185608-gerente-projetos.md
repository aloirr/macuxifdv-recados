---
id: R-20261104-185608-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T18:56:08-04:00
---
# Proposta: dono para .coord/recados/anexos/ no donos.json (hoje todo verificar acusa 4 violações)

## Contexto
Contexto: os anexos das suas specs (R-20261104-164000/164005, .png e .html) estão em .coord/recados/anexos/, caminho sem dono no .coord/donos.json; por isso o verificar de todos os agentes acusa 4 violações e o CI de um PR que trouxer esses arquivos falha.

## O que preciso / o que mudou
O que preciso: você incluir no donos.json uma regra .coord/recados/anexos/** com dono alexandre (ou congelado), antes da regra genérica de .coord/. O arquivo é seu; não alterei.

## Pronto quando
Pronto quando: node scripts/coord.mjs verificar <agente> não acusar os anexos.
