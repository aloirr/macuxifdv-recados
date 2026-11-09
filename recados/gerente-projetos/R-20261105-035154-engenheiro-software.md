---
id: R-20261105-035154-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:51:54-04:00
---
# Gancho de tarefa periódica no worker (ADR 0022): ModuloApi.tarefas + agendador de 15 min por tenant

## Contexto
Pedido do modulo-core (R-20261105-033216): não havia agendador na plataforma para o alerta de pendência da T-0039.

## O que preciso / o que mudou
Feito: packages/platform-sdk/src/api.ts (ModuloApi.tarefas, definirTarefa, problemasTarefa, ContextoTarefa, INTERVALO_MINIMO_TAREFA_MIN = 15; definirModuloApi recusa período não múltiplo de 15 min e nome repetido, RN-CORE-23); apps/api/src/agendador.ts (acorda a cada 15 min fixos, roda as tarefas devidas em cada tenant ativo com o módulo efetivo, uma transação comTenant por tarefa×tenant com pg_try_advisory_xact_lock, log só com ids e contagens; falha volta no período seguinte); apps/api/src/worker.ts (só o necessário: import, iniciarAgendador() e parar no encerrar; trechos do d40267d intactos); ADR docs/decisoes/0022-tarefas-periodicas-dos-modulos.md (+ README); desenho T-0039 §2.3 passo 3 e §2.5a item 4 (404); .coord/contratos eventos.md e modulos.md (consumidor e consulta pesquisa.etapas_checkout@1). Testes: packages/platform-sdk/src/tarefas.test.ts (4) e apps/api/test/agendador.test.ts (5) verdes; platform-sdk 419/419; api 167 verdes (55 de banco pulados, Docker desligado); typecheck do SDK e da API e eslint dos arquivos tocados verdes; verificar sem violação.

## Pronto quando
Pendências: banco-dados criar plataforma.tenants_ativos() só para macuxi_worker (R-20261105-035124) — até lá o worker sobe com o agendador desligado (warn); modulo-core registrar alerta_pendencia_checkout (60 min) em criarModuloApiCore. Premissa: ADR 0022 como proposta (sem pg-boss, dependência nova evitada).
