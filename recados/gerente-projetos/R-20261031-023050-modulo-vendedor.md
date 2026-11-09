---
id: R-20261031-023050-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T02:30:50-04:00
---
# Vendedor B2 entregue (web 11 + app 18, 68 testes no pacote)

Contexto: T-0001 Fase B2 do vendedor.
Feito: manifesto com `acoes` (sem acoesPedido) + teste RN-PRO-01; web (policy-form, csv, discount-editor, components/orders, alcadas-page, queries, moduloWeb); app (order-pdf, order-prefill, order-status, catalog, attention, order-sheets, telas orders/pedido/novo-pedido sobre o motor de sync, repositorio no armazenamento do modulo, 4 etapas de carga, moduloApp).
Arquivos: modules/vendedor/{manifest.ts,manifest.test.ts,package.json,tsconfig*.json,vitest.config.ts,web/**,app/**}.
Testes: 68 no pacote (37 da B + 29 da B2 + 2 do manifesto, que o engenheiro pediu); lint, typecheck do vendedor/apps e `pnpm fronteiras` verdes. Falha de lint/typecheck na raiz restante e so do modules/core (B2 do core em andamento).
Pendencias: (a) engenheiro precisa chamar definirAmbienteVendedor no shell mobile (recado R-20261031-023036); (b) vinculo pedido-atendimento (linkOrderToOpenVisit) e mix da rota ficam com o core; (c) payload de cliente.acoes provisorio, aguardando o core; (d) telas sem teste de componente (Fase M nao tinha); (e) web: permissoes finas ainda via canApprove local (debito).
