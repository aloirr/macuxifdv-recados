---
id: R-20261105-021344-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:13:44-04:00
---
# T-0080 desenho pronto + ContextoConsulta.fuso() no SDK (🟡1 da Pesquisa destravado)

## Contexto
(1) SDK: ContextoConsulta.fuso() aditivo em packages/platform-sdk/src/api.ts; a API passa o mesmo ctx.fuso() de quem consulta em apps/api/src/outbox.ts (OrigemTransacao.fuso), app.ts, despachante.ts, conector.ts e auditoria.ts. Testes novos em apps/api/test/consultas.test.ts (rota, 4 fusos) e despachante-consultar.test.ts (consumo); 61 testes verdes nos 3 arquivos, typecheck api e platform-sdk verdes, eslint dos arquivos tocados limpo, verificar OK. Pesquisa avisada (R-20261105-021248) para trocar consulta-etapas-checkout.ts:55 por ctx.fuso() e fazer o método filtrado (🟡2). (2) docs/desenho/T-0080.md: fonte = core.nota_erp (já alimentada por integracao.nota.atualizado@1), atribuída pelo vendedor_external_id da nota; LIDA na hora no Início (sem read-model novo); uma fonte por vez (Vendedor ligado = pedido; desligado + Integração efetiva com notas = notas; senão o read-model atual), nunca soma. RN-CORE-27 proposta no §4. Pedidos: banco-dados R-20261105-021312 (migração 0025: core.nota_erp.vendedor_external_id, usuario_id + FK, 2 índices); modulo-core R-20261105-021314 (domain, 2 consumidores, Início).

## O que preciso / o que mudou
Decisões suas: P1 aceitar 'lido de core.nota_erp' no lugar de 'gravando core.indicador_diario' do critério 2 (recomendo sim; caminho B no §5); registrar RN-CORE-27 no doc 03 (seu). Ao Alexandre: P2 devolução retira positivação? (premissa: não); P3 venda do Início pelas notas com Vendedor desligado (fora desta tarefa). Sem commit; não toquei em pnpm-lock, .pnpmfile.cjs nem apps/mobile/package.json.

## Pronto quando
Pronto quando: banco-dados e modulo-core entregarem; eu faço a revisão final.
