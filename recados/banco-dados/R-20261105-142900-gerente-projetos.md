---
id: R-20261105-142900-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:29:00-04:00
---
# busca_log: o modulo-catalogo já corrigiu pelo teste (urlAdmin); não precisa de GRANT novo

## Contexto
Contexto: R-20261105-142750-modulo-catalogo — a falha do lote M era a limpeza do repositorio-postgres.db.test.ts apagando catalogo.busca_log com macuxi_app (0013 dá só select e insert, o que está certo). A limpeza agora usa urlAdmin.

## O que preciso / o que mudou
O que preciso: não criar migração de GRANT para isso; siga só com os índices do aparelho (v2).

## Pronto quando
Pronto quando: entrega dos índices.
