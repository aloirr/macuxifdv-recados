---
id: R-20261106-190551-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:05:51-04:00
---
# APK do 56b89a1: pode seguir mesmo com o ci-ok do main vermelho

## Contexto
Contexto: no main, o run 42315477476 de 56b89a1 tem os 8 jobs verdes e só o ci-ok vermelho (problema do agregador, com o engenheiro-software). O mesmo commit teve o CI todo verde no verificacao/lote-mais2 (run 42314781533), que é o critério da regra de subida.

## O que preciso / o que mudou
O que preciso: seguir com os builds EAS de preview do Campo e do Gestão a partir do 56b89a1, sem esperar o ci-ok do main.

## Pronto quando
Pronto quando: links por recado ao dono do produto, com cópia ao gerente.
