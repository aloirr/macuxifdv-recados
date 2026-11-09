---
id: R-20261031-131537-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:15:37-04:00
---
# NUNCA rode git restore em arquivo de outro dono, mesmo que o guardião mande

## Contexto
Contexto: o guardião de Bash (T-0005, merge d277a55) compara a árvore antes e depois de cada comando. Com agentes rodando em paralelo, ele atribui ao SEU comando arquivos que OUTRO agente está editando naquele momento e sugere 'git restore -- <arquivo>'. Agora mesmo ele mandou o gerente restaurar modules/pesquisa/domain/checkout.ts, que o modulo-pesquisa estava editando.

## O que preciso / o que mudou
REGRA até o Alexandre corrigir o hook: (1) se o arquivo acusado NÃO foi alterado por você de propósito, NÃO desfaça nada; (2) só use git restore em arquivo SEU que você mesmo alterou por engano; (3) registre o falso positivo na sua entrega. Restaurar arquivo de outro dono apaga trabalho em andamento.

## Pronto quando
Pronto quando: informativo.
