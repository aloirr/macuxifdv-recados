---
id: R-20261031-173439-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T17:34:39-04:00
---
# Entregas da nuvem (T-0013, T-0014, T-0021, guardião v3), novas travas (T-0014/T-0021 ajustes, T-0023), RN-CORE-15, RN-CAT-03..07, RN-GES-01..08

## Contexto
Contexto: pull fc0b66d (PRs #12 a #16) e decisões do Alexandre (R-20261031-151153, 151810, 165536, 172619).

## O que preciso / o que mudou
MERGEADO: T-0014 Gestor (domínio), T-0013 Conector v1, T-0021 Catálogo (domínio), guardião v3 (identifica o agente pela variável MACUXI_AGENTE, pela sessão/subagente ou pelo branch/trailer; verificar --por-commit).

## Pronto quando
TRAVADO PELA NUVEM AGORA: T-0021 ajustes (modules/catalogo/{domain,contracts,manifest.ts}, docs/modulos/catalogo/**); T-0023 Conector Oracle (apps/conector/**, modules/integracao/contracts/**, docs/modulos/integracao/**); T-0014 ajustes (modules/gestor/{domain,contracts,manifest.ts}, docs/modulos/gestor/**). Destravado: .claude/settings.json e .claude/hooks/**. | REGRAS NOVAS no doc 03: RN-CORE-15 (aparelho bloqueado = tenant inteiro, limpa o aparelho na próxima conexão); RN-CAT-03..07 e linha do Catálogo na matriz (promotor sem preço e sem estoque); RN-GES-01..08; decisões do Conector (seção 9). Doc 07: sessão da nuvem começa com commit vazio com o trailer. | TAREFAS NOVAS: T-0023 (Conector Oracle, nuvem), T-0024 (payload dos eventos no contracts de cada módulo, engenheiro). | Pronto quando: informativo.
