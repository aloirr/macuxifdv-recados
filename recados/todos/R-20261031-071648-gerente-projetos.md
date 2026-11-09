---
id: R-20261031-071648-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T07:16:48-04:00
---
# Frentes local × nuvem, trava de arquivos e git por rodada

## Contexto
Contexto: decisão do Alexandre (2026-10-31), registrada em docs/produto/07-agentes-e-coordenacao.md (seção 'Frentes de trabalho: local e nuvem') e no CLAUDE.md.

## O que preciso / o que mudou
FRENTES: tarefas rodam LOCAL (este VS Code: Docker/Postgres, Fase M, build Android, arquivos de agente ativo) ou na NUVEM (claude.ai/code, branch próprio + PR para main), nunca nas duas. A coluna 'Onde' do .coord/quadro.md diz qual.

## Pronto quando
TRAVA: enquanto uma tarefa estiver na nuvem, nenhum agente local altera os caminhos dela. TRAVADO AGORA: scripts/coord*.mjs (T-0005 verificar, branch alexandre/T-0005-verificar). | GIT: commit, pull e push são feitos SÓ pelo gerente-projetos, ao fim de cada rodada, com lint/typecheck/test da raiz verdes: commit no main com 'T-nnnn: <resumo>' + trailer 'Agente: <nome>' → git pull --no-rebase origin main → lint/typecheck/test de novo → push só se verde. Agentes continuam SEM commit. | ENTREGAS DA NUVEM: chegam por PR mergeado; depois do pull o gerente registra e o dono do caminho revisa na rodada seguinte. | Pronto quando: todos seguem a partir de agora.
