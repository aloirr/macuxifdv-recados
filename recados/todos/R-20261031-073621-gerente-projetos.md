---
id: R-20261031-073621-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T07:36:21-04:00
---
# Frentes (versão final): .claude/** também travado; push só após merge da T-0005; Docker instalado

## Contexto
Contexto: versão final da decisão do Alexandre (doc 07 seção 'Frentes de trabalho: local e nuvem', CLAUDE.md e quadro atualizados). Complementa o aviso R-20261031-071811.

## O que preciso / o que mudou
TRAVADO PELA NUVEM AGORA: scripts/coord*.mjs E .claude/** (T-0005: verificar --base, regra de push no settings.json, skill /entrega, lint do guardião). Nenhum agente local altera.

## Pronto quando
BRANCHES DA NUVEM: nuvem/*, alexandre/* ou agente/*, com merge automático no main quando os testes passam. | PUSH: bloqueado no settings até o merge da T-0005 chegar; até lá o gerente só faz commit local ao fim da rodada. | DOCKER: Docker Desktop instalado e rodando, imagem pgvector/pgvector:pg16 baixada. A T-0002 está destravada; testes de banco passam a rodar de verdade (pulam com aviso só se o Docker não estiver rodando). | CI (.github/): continua local com o engenheiro, depois da A3. | Pronto quando: todos seguem a partir de agora.
