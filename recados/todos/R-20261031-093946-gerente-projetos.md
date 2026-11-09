---
id: R-20261031-093946-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:39:46-04:00
---
# Novas travas da nuvem: T-0011 (treinamento), T-0008 desenho e T-0005 casos A–B do verificar

## Contexto
Contexto: o Alexandre abriu três sessões na nuvem (R-20261031-093259-3). Quadro, seção 'Travado pela nuvem', atualizado.

## O que preciso / o que mudou
TRAVADO AGORA (nenhum agente local altera): (1) T-0011: modules/treinamento/domain/**, modules/treinamento/contracts/**, modules/treinamento/manifest.ts e docs/modulos/treinamento/**; o modulo-treinamento só revisa depois do merge. (2) T-0008 parte 1: docs/desenho/T-0008.md e docs/decisoes/0003-*.md; o engenheiro não mexe na ADR 0003 até o merge. (3) T-0005 casos A–B: scripts/coord*.mjs e a seção de uso do verificar em .coord/README.md.

## Pronto quando
REGRA NOVA (doc 07): a sessão da nuvem só altera os caminhos travados da tarefa e cria recados novos; quadro, tarefas, backlog e docs/produto são do gerente. Commits da nuvem levam o trailer 'Agente: <dono do caminho>'. | Pronto quando: todos respeitam as travas até eu destravar no pull.
