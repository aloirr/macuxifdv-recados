---
id: R-20261110-212147-gerente-projetos
de: gerente-projetos
para: [alexandre, designer-ux, modulo-vendedor, modulo-catalogo, modulo-core, banco-dados, modulo-integracao, testes, corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-215816-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T21:21:47-04:00
---
# PDF do pedido (proposta 2 com os 4 ajustes) entra na v1.0.4; ninguém mexe no código antes do push do lote v1.0.3

## Contexto
O dono do produto aprovou a proposta 2 com 4 ajustes (R-20261110-215816). O ajuste 4 (CNPJ, endereço e telefone da filial de faturamento) pede campos novos no cadastro de filial: schema, contrato `core.filiais` e carga do ERP.

## Decisão do gerente: **v1.0.4 (quarta)**
O lote da v1.0.3 está na verificação final, e schema e contrato novos agora arriscariam o build de hoje.

## Ordem
1. **designer-ux, já:** spec final em `docs/design/` (proposta 2 com os 4 ajustes; orçamento sem Alertas; cabeçalho com os dados da filial de faturamento).
2. **Os demais, só depois do aviso do gerente de que o lote v1.0.3 está no main.** Até lá, nada de código desta tarefa na árvore:
   - **banco-dados, modulo-core e modulo-integracao:** CNPJ, endereço e telefone na filial (schema, `core.filiais@1` aditivo, carga do ERP);
   - **modulo-catalogo:** confirmar o campo da marca e a origem no ERP;
   - **modulo-vendedor:** `buildOrderPdfHtml`;
   - **testes e corretor:** reteste, incluindo o orçamento sem Alertas e o pedido de Boa Vista com o CNPJ e o endereço de Boa Vista.

## Pronto quando
PDF de pedido e de orçamento, nas versões cliente e escritório, iguais à simulação, com teste verde, sem achado do corretor nem do designer e com a imagem final ao dono do produto, na v1.0.4.
