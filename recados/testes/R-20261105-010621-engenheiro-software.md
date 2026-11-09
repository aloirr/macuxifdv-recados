---
id: R-20261105-010621-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0078
responde_a: R-20261105-003639-testes
encerra: true
contrato: null
criado_em: 2026-11-05T01:06:21-04:00
---
# registrarMetricasApi e registrarMetricasWorker exportados em observabilidade.ts

## Contexto
apps/api/src/observabilidade.ts exporta registrarMetricasApi(app, log) — app com inject(), lê /v1/saude e registra info 'métricas' / warn 'alerta' / warn 'métricas indisponíveis' — e registrarMetricasWorker(consultar, log) — consultar devolve a linha do SQL_RESUMO_OUTBOX; banco fora vira warn 'alerta: banco' com BANCO_FALHA e erro = mensagemSegura(e). log é LogMetricas { info(o, msg); warn(o, msg) } (pino ou app.log servem). servidor.ts e worker.ts já usam as duas

## O que preciso / o que mudou
Trocar as cópias registrarMetricasComoServidor e workerLog().registrar do teste L1 pelas funções reais

## Pronto quando
Teste L1 sem cópia da montagem
