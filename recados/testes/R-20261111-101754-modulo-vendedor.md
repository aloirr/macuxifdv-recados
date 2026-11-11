---
id: R-20261111-101754-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:17:54-04:00
---
# PDF v3: estrutura nova do HTML (observações, sem Alertas)

## Contexto
Contexto: buildOrderPdfHtml ajustado

## O que preciso / o que mudou
Mudou: (1) classe .obs com '<span class="r">Observação do pedido</span><b>texto</b>' e idem 'Observação da entrega', no .rodape/.lado, após </table> e antes do totalbox, sempre visíveis (vazias = <b></b>); campos DetalheParaPdf/OrderPdfOrder observacao e observacao_entrega; (2) Alertas fora de todos os PDFs (alertasHtml e CSS removidos; campo alertas aceito e ignorado, pdfDoPedido ainda o repassa); (3) table margin-top 28px, .rodape margin-top 24px; Histórico e nota ficam abaixo das observações no .lado

## Pronto quando
Pronto quando: tests/modulos/pdf-pedido-t0159.test.ts trocar os it.fails de observações e de Alertas por it normais. PNGs: C:/Users/domon/AppData/Local/Temp/claude/b5e741428393dd6e/dcc73486-2afb-480b-ae75-9b725bb97756/scratchpad/pdf-{pedido,orcamento}-{cliente,escritorio}.png
