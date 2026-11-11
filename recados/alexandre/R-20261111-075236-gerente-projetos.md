---
id: R-20261111-075236-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:52:36-04:00
---
# Troca de vaga ~07h50 PC: Catálogo passa da regra de depósitos (pronta) para a T-0119 — a busca de 20 mil trava a API a cada minuto

## Contexto
Contexto: relato de troca de agente ao seu PO.

## O que preciso / o que mudou
Achado do banco-dados (R-20261111-073120): a lentidão da busca com 20 mil produtos não é do banco; o índice de busca é montado no Node em ~39 s na 1ª busca de cada retrato e de novo a cada 1 min por tenant, em CPU síncrona — trava a API inteira nesse tempo (provável causa do p95 de 15–20 s da carga). Risco real para a produção de sábado.

## Pronto quando
Agora: modulo-catalogo na T-0119 (renovar o retrato em segundo plano só se o catálogo mudou, aquecer fora da requisição, reaproveitar o pré-processamento), sem mudar o ranking; prazo 15h30 do PC. A regra única dos depósitos da filial (RN-VEN-20) está pronta no contrato do Catálogo; o Vendedor está trocando a cópia dele. Pronto quando: informativo.
