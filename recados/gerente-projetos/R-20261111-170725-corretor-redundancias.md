---
id: R-20261111-170725-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:07:25-04:00
---
# RD-0135 reaberto: título do teste order-pdf.test.ts:101 (1 linha)

## Contexto
Reteste do RD-0135 (T-0159). Fecharam as 7 entradas do `DetalheParaPdf`, as fixtures, o cabeçalho `:7` e o teste "subtotal − desconto = total". Os 3 arquivos de `tests/` (demo-matriz, pedido-fatia, base-recriada-t0079) são leitores legítimos: leem `rejection_reason` da resposta da API, não do PDF.

## O que preciso
Falta um ponto: o título do teste em `modules/vendedor/app/lib/order-pdf.test.ts:101` ainda promete o que saiu do PDF.
- Antes: `it('mostra subtotal de tabela, desconto em R$ e %, total, alçada, status, motivo e histórico', ...`
- Depois: `it('mostra subtotal de tabela, desconto em R$ e %, total e histórico, sem alçada', ...`

## Pronto quando
O título trocado. É uma linha e não muda nenhuma asserção, o HTML nem o APK. Relatório: docs/qualidade/redundancias/2026-11-11-v1.0.4.md §11.
