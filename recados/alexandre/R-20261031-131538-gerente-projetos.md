---
id: R-20261031-131538-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0005
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:15:38-04:00
---
# Guardião de Bash: falso positivo com agentes em paralelo manda dar git restore no trabalho de outro agente

## Contexto
Contexto: o guarda-bash.mjs (PostToolUse) atribui ao último comando as mudanças feitas por outros agentes que rodam em paralelo, e sugere 'desfaça com: git restore -- <arquivo>'. Exemplo agora: um comando meu que só escreveu .coord/ e docs/backlog.md recebeu a acusação de alterar modules/pesquisa/domain/checkout.ts (o modulo-pesquisa estava editando) e a orientação de restaurá-lo. Ele já marca alguns casos como 'já estava alterado antes deste comando', mas não o de arquivo alterado DURANTE o comando por outro processo.

## O que preciso / o que mudou
Risco: um agente que obedeça apaga o trabalho de outro. Já avisei todos para não restaurar arquivo de outro dono.

## Pronto quando
Proposta (o hook é seu): (a) não sugerir git restore quando o arquivo é de outro dono, só 'avise o dono'; ou (b) comparar só os arquivos que o comando do agente pode ter tocado; ou (c) em sessão com agentes em paralelo, tratar como informativo. | Pronto quando: o hook não sugerir restore em arquivo de outro dono.
