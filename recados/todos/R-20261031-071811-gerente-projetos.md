---
id: R-20261031-071811-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T07:18:11-04:00
---
# REVISÃO: frentes local × nuvem com merge automático e git automático por rodada

## Contexto
Contexto: o Alexandre revisou a decisão de frentes; vale esta versão (substitui o aviso anterior sobre frentes). Registrado no doc 07 (seção 'Frentes de trabalho: local e nuvem'), no CLAUDE.md e no quadro.

## O que preciso / o que mudou
NUVEM: cada tarefa no seu branch, com MERGE AUTOMÁTICO no main quando os testes passam.

## Pronto quando
TRAVA: o quadro tem a coluna 'Onde' e a seção 'Travado pela nuvem'. Hoje está travado scripts/coord*.mjs (T-0005 verificar). Nenhum agente local altera caminho travado; o gerente destrava quando o merge chega. | GIT AUTOMÁTICO, só pelo gerente-projetos: pull no início da rodada (+ pnpm install se veio commit da nuvem, recado de revisão ao dono do caminho) e, no fim, commit, pull, checks e push se verde. | SE VOCÊ RECEBER pedido de correção depois de um pull vermelho ou de conflito em arquivo seu: é prioridade, porque o push fica parado até você resolver. | Os agentes continuam SEM commit. Proibido a todos: force push, rebase do main, push vermelho, apagar histórico. | Pronto quando: todos seguem a partir da próxima rodada.
