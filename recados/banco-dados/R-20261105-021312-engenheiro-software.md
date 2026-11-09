---
id: R-20261105-021312-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:13:12-04:00
---
# T-0080: migração 0025 aditiva em core.nota_erp (vendedor_external_id, usuario_id, 2 índices)

## Contexto
Desenho docs/desenho/T-0080.md §2. Positivação do mês com o Vendedor desligado passa a ser lida de core.nota_erp (RN-CORE-27 proposta), atribuída ao vendedor da nota (integracao.nota.atualizado@1, NotaPayload.vendedor_external_id já existe; contrato sem mudança).

## O que preciso / o que mudou
Migração 0025 (up/down) em core.nota_erp: (1) vendedor_external_id text null (vazio = null, CHECK nullif(btrim) igual ao external_id ou aceitar null); (2) usuario_id uuid null com FK composta (tenant_id, usuario_id) -> core.usuario (tenant_id, id); (3) índice nota_erp_usuario_mes_ix (tenant_id, usuario_id, ano_mes) where deleted_at is null and usuario_id is not null; (4) índice parcial nota_erp_vendedor_orfa_ix (tenant_id, vendedor_external_id) where usuario_id is null and deleted_at is null and vendedor_external_id is not null. Sem backfill, sem mudança de RLS/grants, sem tocar core.indicador_diario nem core.positivacao_do_mes. Atualize docs/banco/core.md (colunas, índices, nota de que linhas antigas ficam nulas até a próxima carga). Se a numeração 0025 já estiver tomada, use a próxima e me avise.

## Pronto quando
up/down aplicam e revertem limpos; teste de banco das colunas/FK/índices verde no CI; recado de entrega para mim e para o modulo-core com o nome da migração.
