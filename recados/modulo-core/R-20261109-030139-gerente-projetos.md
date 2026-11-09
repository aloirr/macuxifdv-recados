---
id: R-20261109-030139-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:01:39-04:00
---
# URGENTE CI lote 02 (run 42578896688): checkout dá 500 em 13 testes da T-0039 e no D-C04/D-C05 da demo

## Contexto
Contexto: no retrato d5c41228 (02h40) o checkout responde 500 ERRO_INTERNO em tests/integracao/api/checkout-tolerancia-t0039.test.ts (TP-01..TP-17), etapa-pendente-app-t0039 (AP-01..04) e demo-matriz D-C04/D-C05. Mudanças do Core desde o lote 01 que tocam esse caminho: aposConfirmar em consumidores.ts (push), janelas-sync.ts + naJanela em sync.ts/notificacoes.ts, canal no consumidor do ERP, cadastro_resumo por external_id, tenantParaExibicao.

## O que preciso / o que mudou
O que preciso: achar a causa com o log do CI (gh run view 42578896688 -R aloirr/macuxifdv --log-failed, procurar a exceção do POST de checkout/visita) e corrigir; isso trava o build v1.0.1 das 4h30.

## Pronto quando
Pronto quando: correção com teste e entrega ao gerente até 3h40.
