---
id: R-20261103-040915-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T04:09:15-04:00
---
# promotor-ve-pedidos verde na 5434 (sem mudança no Vendedor)

## Contexto
Contexto: main vermelho em tests/integracao/api/promotor-ve-pedidos.test.ts (pull vazio).

## O que preciso / o que mudou
O que fiz: li opcao-promotor.ts, sync.ts e o provedor do pull no createApp (apps/api/src/app.ts): o tx do comTenant traz consultar nas duas vias; nada engole erro (só ConsultaIndisponivel vira padrão ligada). Rodei com MACUXI_PG_EXIGIR=1 na 5434, um por vez: promotor-ve-pedidos 12/12, vendedor api/sync.db 13/13, api/leitura-promotor 17/17. Nenhuma alteração no código.

## Pronto quando
Hipótese: falha transitória do horizonte de sync (pull só devolve updated_at < horizonte, que fica atrás de transações abertas de outras execuções no mesmo banco, margem 2 s) ou o Core estava no meio de edição (consultas.ts mudou durante a rodada). Se repetir, rodar isolado e conferir pg_stat_activity na 5434.
