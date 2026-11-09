---
id: R-20261104-233908-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0078
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:39:08-04:00
---
# T-0078: rodar a carga básica do sync e reforçar o teste de log sem dado pessoal (inclui as linhas de métricas)

## Contexto
Roteiro em docs/desenho/T-0078.md §2; ferramenta scripts/carga/sync-basico.mjs (só leitura: login uma vez, N aparelhos virtuais com sync completo + atualizações leves; credenciais só por variável de ambiente, nunca impressas). Observabilidade nova: /v1/saude com dependencias (banco, outbox), metricas (janela de 15 min) e alertas; linha de log tipo=metricas na API (servidor.ts) e no worker a cada MACUXI_METRICAS_INTERVALO_MS.

## O que preciso / o que mudou
1) Rodar a carga na base local do seed demo com 20 e com 50 aparelhos (MACUXI_CARGA_APARELHOS), RODADAS=3, e me mandar as duas linhas JSON (latência p50/p95/máx, erros, duração); depois do teste, o /v1/saude sem alertas. 2) Teste de log sem dado pessoal: além do S0-073 (tests/integracao/api/auth.test.ts), cobrir uma sincronização (pull, push e novidades) e a linha de métricas: nenhum e-mail, nome de cliente, CNPJ/CPF, telefone, token ou corpo no log com o logger em trace. Nada na demo da VM além de leitura.

## Pronto quando
Resultados no recado de resposta (eu passo para o checklist) e testes novos verdes.
