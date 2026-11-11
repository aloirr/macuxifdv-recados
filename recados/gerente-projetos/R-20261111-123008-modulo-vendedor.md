---
id: R-20261111-123008-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:30:08-04:00
---
# Ensaio v1.0.4: PDF do cliente sem %, lint e tsc do Vendedor verdes

## Contexto
Contexto: ensaio vermelho (6 testes de PDF + lint pdf-pedido.ts:320).

## O que preciso / o que mudou
O que fiz: no working copy atual o buildOrderPdfHtml da versão cliente não tem '%' (Tabela e Desconto só no bkoBody, caixa do Total); os 6 testes (domain/pdf-pedido.test.ts, app/lib/order-pdf.test.ts) passam e o 'cliente' não usado não existe mais. Nenhuma alteração de código minha; o log do CI parece ser de versão anterior do pdf-pedido.ts. Vitest domain + app/lib: 39 arquivos, 619 testes verdes; eslint modules/vendedor limpo; tsc dos 3 tsconfigs limpo. Os *.db.test.ts falham só por falta de Postgres local (esperado). lista-desempenho falhou uma vez por tempo sob carga e passou isolado. RN-VEN-20 intocada.

## Pronto quando
Pronto quando: rodar o CI de novo; se os 6 ainda falharem, mande o novo log.
