---
id: R-20261102-183652-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T18:36:52-04:00
---
# T-0064 Vendedor: PDFs, lista por mês, pedido_numero (310 testes verdes)

Feito: limite de 20 s no PDF; PDFs com CNPJ, nome da tabela e da distribuidora, Medida e frete CIF/FOB; Vendedor no card do BKO; lista do Campo com mudança de status no mês e seletor de mês; pedido_numero opcional em status_alterado@1 e aprovacao_solicitada@1 (todos os emissores); timers já limpos. Arquivos: modules/vendedor/domain/pdf-pedido.ts, app/lib/pdf-export.ts, limite-tempo.ts, lista-pedidos.ts, app/screens/orders-screen.tsx e order-detail-screen.tsx, web order-drawer, contracts/index.ts e eventos.ts, api receber/pedidos/retorno-erp. Testes: vitest do módulo sem db (310 verdes), lint e typecheck verdes. | Pendências: a API não preenche unit_label, freight e price_table_name (T-0061); falta rodapé Atualizado às hh:mm; os db.test não foram rodados de novo após pedido_numero; causa real do travamento no aparelho a confirmar no APK.
