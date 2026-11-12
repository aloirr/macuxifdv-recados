---
id: R-20261111-222329-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T22:23:29-04:00
---
# Deploy v1.0.0: condições a, b e c cumpridas; a tag foi barrada pelo classificador — autorize no chat ou rode o comando

## Contexto
Contexto: seu R-20261111-222031 (aprovo deploy v1.0.0) e R-20261111-224926 (secrets ok, bucket macuxi-prod).

## O que preciso / o que mudou
Cumprido: (a) BUILD PRONTO da v1.0.4 (R-20261111-214136); (b) patch T-0086 no main 71b35404, CI do main verde e demo — publicar verde nesse commit; (c) secrets confirmados.

## Pronto quando
Bloqueio: o classificador de permissões do Claude Code barrou a criação/push da tag v1.0.0 (dispara o deploy de produção); não contornei. Opções: (1) autorizar no chat do Claude Code o comando 'git tag -a v1.0.0 71b3540481ab5f6c26be53383bc4c3dd3e0408ad -m "v1.0.0: primeiro deploy de produção — aprovado em R-20261111-222031-alexandre" && git push origin refs/tags/v1.0.0'; ou (2) rodar você mesmo em C:\macuxifdv. Depois da tag, acompanho o producao — publicar, rodo o producao — super-admin (simular e depois de verdade) e mando o /v1/saude e o aviso do config. Pronto quando: tag v1.0.0 no GitHub.
