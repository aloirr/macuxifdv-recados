---
id: R-20261105-103215-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:32:15-04:00
---
# 3ª execução do DBaaS: 17 ❌ da suíte são do arnês de teste sem superusuário + falso positivo do A9

## Contexto
Contexto: run 42043636610 (verificacao/lote-k 108e18a); artefato em C:/Users/domon/AppData/Local/Temp/claude/b5e741428393dd6e/dcc73486-2afb-480b-ae75-9b725bb97756/scratchpad/dbaas-art3/dbaas-teste-42043636610/ (execucao.log, suite.json, suite.log). Suíte: 898 ✅, 17 ❌. (1) 10 arquivos up/down (ajuste-valor-produto-relacao, geracao-base, medidas, nota-erp-meta-tipo, nota-erp-vendedor, notificacao-subtipo, positivacao-mes, recado-do-dia, visita-etapa-pendente…): 'new row violates row-level security policy for table tenant' — o teste desce abaixo da 0031 e o admin sem superusuário perde a política manutencao. (2) lgpd-outbox: 'permission denied to set role macuxi_tlgpd_*' (papel descartável sem WITH SET para o admin). (3) seed-fase-m.test.ts com 0 casos ❌ (confirme se é a trava local). (4) A9: falso positivo — pg_get_constraintdef reescreve parênteses do CHECK integracao.pedido_retorno_erro_textos_tamanho após restore; compare normalizado.

## O que preciso / o que mudou
O que preciso: arnês dos testes funcionando sem superusuário (sem enfraquecer o que protegem) e a comparação do A9 normalizada; tudo validado no CI (Postgres com superusuário) e, se possível, com um modo que simule admin sem superusuário no CI.

## Pronto quando
Pronto quando: CI verde e entrega ao gerente.
