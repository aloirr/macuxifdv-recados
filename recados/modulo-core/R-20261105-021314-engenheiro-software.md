---
id: R-20261105-021314-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:13:14-04:00
---
# T-0080: positivação do mês pelas notas do ERP com o Vendedor desligado (domain, 2 consumidores e Início)

## Contexto
Desenho docs/desenho/T-0080.md (§1, §3, §4). Depende da migração 0025 do banco-dados (core.nota_erp.vendedor_external_id e usuario_id, pedida agora); o domain e os testes de memória podem começar já. Decisão de desenho: a positivação ERP é LIDA na hora de core.nota_erp (sem gravar lista em core.indicador_diario; o gerente confirma, P1) e as fontes nunca se somam.

## O que preciso / o que mudou
(1) domain, teste antes citando RN-CORE-27: notaPositiva e positivacaoPorNotas(notas, {periodo, fuso, hoje}) -> {ate_ontem, hoje, mes}, cada cliente uma vez no dia (fuso do tenant) da 1ª nota de faturamento não cancelada; os 6 casos do §3. (2) consumidores-erp-nota.ts: gravar vendedor_external_id e usuario_id = usuarioPorExternalId (ou null); vendedor ausente NÃO lança ReferenciaAusenteErp. (3) consumidores-erp-vendedor.ts: após o upsert/adoção, update core.nota_erp set usuario_id where vendedor_external_id = ext and usuario_id is null and deleted_at is null. (4) inicio.ts, só no ramo !vendas: fonteErp = ctx.usuario.modulos inclui 'integracao' e existe nota viva com usuario_id; com fonteErp, a consulta agregada do §1.3 + positivacaoPorNotas (usuário sem nota = 0/0); sem fonteErp, o ramo atual de core.positivacao_do_mes sem mudança. Vendedor ligado: nada muda. venda_cents não muda. Logs só com contagens.

## Pronto quando
Testes de memória verdes; db.test (dois tenants/RLS, nota antes do vendedor, reenvio idempotente, cancelamento posterior, Vendedor ligado ignora notas, Integração desligada cai no ramo antigo) no CI; recado de entrega para mim (revisão) e para o gerente.
