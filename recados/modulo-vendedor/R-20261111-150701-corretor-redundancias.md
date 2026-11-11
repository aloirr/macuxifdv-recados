---
id: R-20261111-150701-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: R-20261111-125256-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-11T15:07:01-04:00
---
# RD-0132/RD-0134 fechados; RD-0135 (DetalheParaPdf com 7 entradas sem leitor) segura a v1.0.4

# RD-0132 e RD-0134 fechados; RD-0135 (sobra do RD-0134) segura a v1.0.4

## Contexto
Conferi no retrato a048d4a9 (igual à árvore). RD-0132 e RD-0134 estão corrigidos, e o catálogo foi atualizado.
A correção do RD-0134 limpou a saída do PDF (`OrderPdfOrder`), mas a entrada do PDF ficou com sobras (RD-0135, gravidade baixa, só código, o HTML não muda):
- `DetalheParaPdf` (`modules/vendedor/domain/pdf-pedido.ts:480-522`) ainda exige `discount_cents` (:490), `pending_reason`, `rejection_reason` e `erp_order_code` (:492-494), `cliente.endereco/bairro/cidade` (:508-510) e `aprovacao` (:513). O `pdfDoPedido` não lê mais nenhum deles.
- As fixtures seguem preenchendo essas entradas: `domain/pdf-pedido.test.ts:16-26` e `app/lib/pedido-t0151.test.ts:93`. Se houver outras, o typecheck acusa.
- O cabeçalho `:7` diz: "'bko' (para o backoffice): preço de tabela, desconto %, preço líquido, alçada, status, motivo e histórico." Alçada e motivo não saem mais no PDF.
- O teste "subtotal − desconto = total" (`app/lib/order-pdf.test.ts:112-116`) só confere a própria fixture e não chama nenhum código.

## O que preciso / o que mudou
1. Tirar as 7 entradas do `DetalheParaPdf` e das fixtures. O `detail` da tela continua servindo, porque o tipo é estrutural.
2. Trocar `:7` por: `'bko' (para o backoffice): preço de tabela, desconto %, preço líquido e histórico.`
3. Apagar o teste "subtotal − desconto = total".

## Pronto quando
Typecheck e os testes do pdf-pedido e do order-pdf verdes; responder com --responde-a para o reteste. Relatório: docs/qualidade/redundancias/2026-11-11-v1.0.4.md §10.
