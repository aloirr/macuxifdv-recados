---
id: R-20261108-193348-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T19:33:48-04:00
---
# Integração v1.0.1: RD-0026/0027, recados antigos e tabela recado > ação

Contexto: RD-0026 e RD-0027 (corretor) e as respostas dos recados antigos da caixa, na rodada do v1.0.1.

O que fiz:
- RD-0026: domain/monitor.ts agora emite "N pedidos seguem ativos: 12345 (sem estoque no ERP); ... Cancele no ERP ou avise o vendedor. O alerta some quando o cancelamento chegar." (ERP 2 vezes; UUID só quando falta o número do ERP). O painel Alertas (web/components/alertas-panel.tsx) mostra só "Cancelamento recusado: veja os pedidos em Pedidos no ERP."; a frase completa fica em Pedidos no ERP > Erros de retorno. Testes: domain/monitor.test.ts e web/components/paineis.render.test.ts.
- RD-0027: api/aceite-cancelamento.ts (aceiteDoTenant), usada por consulta-cancelamento.ts e consumidores-pedido.ts.
- apps/conector/test/integracao.pg.test.ts respeita MACUXI_PG_TESTES_URL.
- Cursor do Hub (🔴 R-20261107-111409): já resolvido antes (colação binária nas 20 consultas, teste em exemplos-views-modelo.test.ts); o Hub usa o par (alterado_em, external_id) ordinal e COLLATE C.
- Lint, typecheck e test de @macuxi/integracao verdes (785 passaram, 64 de banco pulados); verificar sem violações.

Tabela recado > ação:
R-20261107-111409 (cursor) > já resolvido, encerrado | R-20261107-232242 (vendedor) > encerrado: erp_aceita_cancelamento é do pull do Vendedor via consulta integracao.cancelamento_erp@1 (outro dono) | R-20261108-130604 (testes) > encerrado, migração 0048 existe | R-20261108-173714 > esta entrega | R-20261102-235547, R-20261107-080347, R-20261106-215353, R-20261103-194121 e R-20261102-233434 (PG de testes) > encerrados.

Pendências: (1) recados antigos de T-0032/0053/0054/0061/0084/0087/0089 (handlers, fila, nota, entidades) estão entregues no main mas não conferi um a um nesta rodada, ficam abertos para o gerente decidir; (2) R-20261107-073911: protegerFormula de @macuxi/comum/csv e ajv não verificados no csv do web; (3) R-20261031-173203 (Conector intermitente na raiz) não reproduzido; (4) 🟡 ordem_divergente do Conector é backlog sem autorização. Mudança de outro dono: o Vendedor precisa chamar integracao.cancelamento_erp@1 no pull.
