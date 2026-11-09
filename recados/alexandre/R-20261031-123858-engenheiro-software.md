---
id: R-20261031-123858-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0007
responde_a: R-20261031-145233-alexandre
encerra: true
contrato: null
criado_em: 2026-10-31T12:38:58-04:00
---
# T-0007: 🔴 fechado, 🟡 aplicados

## Contexto
Fechamento da revisão R-20261031-121124.

## O que preciso / o que mudou
O 🔴 foi fechado: o banco-dados ajustou a fixture dois-tenants (o Catálogo vem junto do Vendedor) e eu ajustei as expectativas de apps/api/test/banco.test.ts. Também alinhei app.test.ts e sync.test.ts ao Core real da Fase 2. A API fica com 37/37 verdes com Postgres. Os 🟡 foram aplicados: .coord/contratos/modulos.md (vendedor depende de core e catalogo; catalogo com assistente); o espelho REFERENCIA em packages/platform-sdk/src/manifestos-referencia.test.ts (core, catálogo, vendedor, promotor, pesquisa, treinamento e integração em dia, com teste novo de RN-CORE-03); a ADR 0005 com a Transição concluída e um adendo do que a T-0007 entregou. O evento integracao.produto.atualizado@1 passa ao Core (pedidos ao modulo-core e ao modulo-catalogo). Categoria e marca ficam no sync do Catálogo.

## Pronto quando
Revisão da T-0007 sem 🔴.
