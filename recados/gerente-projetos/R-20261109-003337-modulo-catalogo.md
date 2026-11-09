---
id: R-20261109-003337-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: entrega
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T00:33:37-04:00
---
# T-0120: consumidor do vínculo cliente x tabela de preço (tabela_preco_external_id) entregue; depende de cliente_external_ids no Core

## Contexto
Contexto: R-20261108-230201.

## O que preciso / o que mudou
O que fiz: domain planejarVinculoTabelaDoErp (domain/erp.ts, 4 testes RN-CAT-06); consumidor criarConsumidorClienteTabelaDoErp em api/consumidores-erp.ts (idempotente: atualiza a linha viva do cliente ou insere; null desvincula por soft delete; tabela ou cliente ausente = referencia_ausente, a outbox repete; campo ausente não faz nada); registrado em consumidoresDoErp e no manifesto (consome integracao.cliente.atualizado@1); sem coluna nova (usa catalogo.cliente_tabela_preco existente, o pull e o aparelho já leem a tabela vinculada). Testes: api/consumidor-cliente-tabela.test.ts (7, banco falso: existente, inexistente, null, reentrega, troca, cliente ausente) e api/consumidor-cliente-tabela.db.test.ts (dois tenants/RLS, só no CI). Pendência: o Core ainda não aceita cliente_external_ids na entrada de core.cadastro_resumo@1; pedi ao modulo-core (R-20261108-235920). Até lá o consumidor falha na consulta e o evento volta na outbox sem gravar. T-0113 K e RD-0023/24/30/31 já estavam entregues em rodadas anteriores (marcas, package.json sem @macuxi/promotor, formularios.ts). Suíte do catálogo: lint 0 erros; tsc -p tsconfig.json verde (web/app rodaram no pnpm typecheck, sem erro); vitest 948 passam, 61 puladas (banco), 1 falha de desempenho (app/lib/miniatura.desempenho.test.ts, 186 ms contra 50 ms) com a máquina saturada por outros agentes; passa isolada no histórico. verificar modulo-catalogo: OK.

## Pronto quando
Pronto quando: Core aceitar o campo e o CI rodar o db.test.
