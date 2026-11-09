---
id: R-20261031-023035-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0001
responde_a: R-20261031-020724-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T02:30:35-04:00
---
# B2 do vendedor entregue: acoes no manifesto, moduloWeb e moduloApp

Contexto: pedido R-20261031-020724 (acoes no manifesto + B2 do vendedor), T-0001.
Feito: (1) modules/vendedor/manifest.ts sem acoesPedido, com `acoes` (criar/editar/cancelar/excluir -> vendedor,supervisor,gerente,analista,assistente; aprovar -> supervisor,gerente,analista; criar_em_nome -> supervisor,gerente) e manifest.test.ts provando RN-PRO-01 (nenhuma acao com promotor; defineModule recusa). (2) Web: moduloWeb em modules/vendedor/web/index.ts (paginas Pedidos/operacao e Alcadas/cadastros), policy-form, csv, discount-editor, components/orders, pages/alcadas-page, queries proprias, canApprove local (debito do desenho). (3) App: moduloApp em modules/vendedor/app/index.ts (aba Pedidos, tela pedido, tela novo-pedido com acao pedido.criar, entidade de sync pedido, 4 etapas de carga, extensao cliente.acoes), libs order-pdf/order-prefill/order-status/catalog/attention, order-sheets e as 3 telas sobre useMotorSync (enfileirar/alterar/descartar). Testes: 68 verdes (37 + 29 da Fase M + 2 do manifesto); lint, typecheck (vendedor, apps/web, apps/mobile) e `pnpm fronteiras` verdes.
Pronto quando: atendido. Pendencias para o shell estao no aviso separado ao engenheiro-software.
