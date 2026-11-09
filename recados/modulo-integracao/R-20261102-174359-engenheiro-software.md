---
id: R-20261102-174359-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: revisao
prioridade: alta
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:43:59-04:00
---
# Re-revisão T-0032: 🔴 A7/A8 RESOLVIDO (20/20 × Postgres); 0🔴, 2🟡 (pedido sem chave do ERP some após 50 min; medidas sem usaConsultas), 2🟢

## Contexto
Re-revisão do 🔴 da revisão final da T-0032 (R-20261102-095157: consumidores A7/A8 ausentes), sobre a entrega R-20261102-114617 do modulo-integracao, no main (a13ee6e). Li modules/integracao/api/aplicar-lote.ts, consumidores-pedido.ts, api/index.ts, manifest.ts e domain/aplicacao.ts. Rodei com Postgres (MACUXI_PG_EXIGIR=1): `modules/integracao` api/consumidores.db.test.ts **20/20 verdes** (A7: lote válido aplicado + cursor + eventos; só inválidas → concluido_com_erros (RN-INT-01/P-1); reentrega no-op; obsoleta/inalterada não publicam; dependência espera e referencia_ausente (RN-INT-04); carga completa inativa e protege inválido; pendência >30% (RN-INT-06); multi-tenant; A8: aprovado → fila → Conector retira uma vez; retido sem de-para; cancelado antes/depois da entrega; multi-tenant).

## Resultado: 🔴 RESOLVIDO — 0 🔴, 2 🟡, 2 🟢

### Confirmação do 🔴
- api/index.ts:51 registra `consumidorLoteRecebido`, `consumidorPedidoAprovado`, `consumidorPedidoStatusAlterado`; manifest.ts:30 consome `vendedor.pedido.aprovado@1`, `vendedor.pedido.status_alterado@1`, `integracao.lote.recebido@1`.
- A7 (aplicar-lote.ts): lote travado `for update` (:82-89), reentrega = no-op pelo status (:89), efeito + `evento_consumo` na mesma transação (ADR 0007), upsert monotônico com guarda no banco (:193), erros por linha `on conflict do nothing` (:253), pendência `on conflict (tenant_id, sessao_id) do nothing` (:460). Log só com ids e contagens (:329). Os 3 critérios que faltavam (lote só de inválidas → `concluido_com_erros`; sessão completa → inativação/pendência; pedido aprovado → fila) estão demonstrados no teste de banco.
- 🟡 2-4 e 🟢 5-6 da revisão anterior: feitos (política efetiva em bko-comum.ts, textos, consultas sequenciais, vetor UTF-8). 🟢 7 ficou anotado em hub-api.md §17 — ok.
- Registro de eventos atualizado por mim: `vendedor.pedido.aprovado@1` com a Integração como consumidora declarada (.coord/contratos/eventos.md:22).

### Achados
1. 🟡 **Pedido aprovado sem chave do ERP some sem aviso** — modules/integracao/api/consumidores-pedido.ts:34-43 lança erro quando `PedidoAprovadoParaFila` falha (cliente/vendedor/produto sem external_id). A outbox repete 10 vezes (~50 min, apps/api/src/despachante.ts:79-86) e o evento PARA; se o cadastro for completado depois, o pedido nunca entra na fila e ninguém vê no monitor. Cliente novo cadastrado no app (sem external_id até o ERP devolver) cai exatamente aqui. Ajuste: em vez de lançar, `reter` com código próprio (ex.: `sem_chave_erp`) e mensagem do que falta (o caminho `reter`/`persistencia: 'inserir'` já existe em :74-90), reavaliado quando o cadastro ganhar external_id (mesmo gancho do reprocessar ao salvar mapeamento, pendência 4 do hub-api.md §17). Ajustar o teste "aprovado sem chave do ERP não entra" para esperar a linha retida. Não bloqueia o preview (a base demo tem as chaves).
2. 🟡 **Conferência de medida (RN-CORE-19) nunca vai rodar** — aplicar-lote.ts:339 lê `CONSULTA_MEDIDAS` por `(contratosCore as Record<string, unknown>)` (sem tipo) e `core.medidas@1` não está em `usaConsultas` (manifest.ts:28). Quando o Core publicar a consulta, `ctx.consultar` lança erro de programação ("não a declara em usaConsultas", packages/platform-sdk / apps/api/src/outbox.ts), que NÃO é `ConsultaIndisponivel`: cai no catch de :347-349, loga warn e devolve `null` — a conferência fica desligada em silêncio. Ajuste (T-0061): import tipado de `CONSULTA_MEDIDAS` + `usaConsultas: ['core.cadastro_cliente@1', 'core.medidas@1']` no mesmo commit em que o Core entregar; até lá, deixe o código atrás de um `if` explícito, sem o cast.
3. 🟢 aplicar-lote.ts:100-107 + domain/aplicacao.ts:61-64 — a espera por "lote anterior da mesma entidade" não tem limite de tempo (só a de dependência tem os 30 min). Se o evento de um lote esgotar as tentativas, todos os lotes seguintes da mesma (Conector, entidade) esgotam também. Vale um alerta no monitor ("lote parado há X min") ou o mesmo limite.
4. 🟢 aplicar-lote.ts:217-237 — um `ctx.publicar` (um insert) por registro que mudou. Para a carga inicial grande (dezenas de milhares de linhas) isso pesa; um `publicarVarios` no SDK é comigo, se a medição pedir. Sem ação agora.

## Pronto quando
T-0032 pode fechar quanto ao 🔴 (critérios de A7/A8 demonstrados). 🟡 1 antes de ligar o Hub num tenant real (ou backlog da Sprint 3 com prazo); 🟡 2 junto da T-0061; 🟢 no backlog.
