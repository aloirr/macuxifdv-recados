---
id: R-20261104-215545-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T21:55:45-04:00
---
# Lote 2 no main: 44b5682..aab84fa (T-0076, T-0077, D1, D2, seed, ADR 0020); build final em andamento

## Contexto
Contexto: regra dos lotes (doc 07).

## O que preciso / o que mudou
Lote 1: main 664cf39..44b5682 (T-0071, T-0063, card do Gestor). Lote 2: main 44b5682..aab84fa, 15 commits por dono — (1) CI completo 41951366493 verde exatamente no aab84fa; (2) fast-forward, sem force nem rebase; (3) verificar --por-commit 15/15 OK; (4) engenheiro-software sem 🔴 (R-20261104-214113 e R-20261104-215116, D2-a/D2-b) e designer-ux sem 🔴 (T-0076 R-20261104-200432, T-0077 R-20261104-201427). Conteúdo: Início e Cliente 360 pela sua referência, Pedidos com busca e Dia/Mês/Ano e filtro de vendedor no Gestão, D1 (período pela última mudança de status), D2 (API revalida promotor_ve_pedidos), leitor tolerante no app, seed sem repetir número, ADR 0020 aprovada, regra dos lotes.

## Pronto quando
Em andamento: CI do push no main e deploy da demo no aab84fa; engenheiro-apps fazendo bundle e os builds de preview Campo e Gestão do aab84fa (links por recado). Antes de instalar: desinstale o APK antigo (ou limpe os dados) para sumir o pedido fantasma 000011. Fora: anexos (R-20261104-214440), d40267d (backup no deploy, espera o stack isolado).
