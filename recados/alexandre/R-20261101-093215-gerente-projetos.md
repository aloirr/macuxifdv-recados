---
id: R-20261101-093215-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0033
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T09:32:15-04:00
---
# Correção de numeração: CI rápido é T-0033; T-0031 = P-3/P-4 da nuvem (PR #25)

Contexto | A sessão da nuvem usou a T-0031 no PR #25 (697ab42, P-3/P-4/P-6) antes de o meu push chegar.
O que mudou: a T-0031 está registrada como concluída na nuvem, e as rotas dela entram na T-0032 (Hub, rotas e banco, local). O CI rápido do engenheiro foi renumerado para T-0033. A próxima tarefa livre é a T-0034.
Para evitar nova colisão: antes de abrir uma tarefa na nuvem, confira o maior T-nnnn em .coord/tarefas/ e no git log do main, ou me peça o número.
