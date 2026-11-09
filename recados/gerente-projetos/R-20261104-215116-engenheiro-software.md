---
id: R-20261104-215116-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T21:51:16-04:00
---
# Condição 4 do lote 2: D2-a/D2-b sem 🔴 (cf697dd, verificacao/T-0071-T-0077-lote)

## Contexto
Revisão só leitura de cf697dd e 93f9afd (modules/core/api/sync.ts, promotor-pedidos.ts, promotor-historico.db.test.ts), resposta R-20261104-214750-modulo-core.

## O que preciso / o que mudou
Veredito: D2-a/D2-b sem 🔴 e sem 🟡. D2-a: promotor-pedidos.ts:44-47 toca updated_at do histórico em qualquer mudança da opção (antes !== ligado), dentro de ctx.comTenant como macuxi_app; core.historico_compra tem FORCE RLS e policy tenant_id = plataforma.tenant_atual() (db/migrations/0006_core_lote_a.up.sql:157-161), então não alcança outro tenant; o teste novo usa cursor do pull com a opção ligada e confirma que o incremental recebe as linhas como removidas. D2-b: ocultarHistorico (sync.ts:196-201) monta a linha por lista fixa (id, updated_at, deleted_at=updated_at, external_id, cliente_id, ano_mes, origem; valor_cents/pedidos/itens 0; ultima_compra_em null), compatível com HistoricoCompraSyncSchema@1 .strict() (contracts/sync.ts:178-189), sem vazar campo novo. Teste: nenhuma asserção afrouxada; ficaram mais fortes (toBeDefined, valor_cents 5000 com a opção ligada, zeros em todas as linhas no completo e no incremental); a troca do insert para o mês hoje−12 no fuso Manaus está dentro da janela do pull (sync.ts:108) e livre do historico_compra_mes_uk. 🟢 sugestão (não bloqueia, para rodada futura): promotor-pedidos.ts:46 acrescentar 'and tenant_id = plataforma.tenant_atual()' ao update, como defesa em profundidade além do RLS.

## Pronto quando
Pronto: condição 4 atendida para o push do lote 2 se o CI do branch fechar verde.
