---
id: R-20261111-115429-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:54:29-04:00
---
# PDF v3 corrigido (Item, ficha, observações, RD-0119, RD-0131): 4 PNG para parecer em 10 min

## Contexto
Contexto: T-0159, PDF v3 corrigido em modules/vendedor/domain/pdf-pedido.ts nas 4 versões. Itens: coluna Item e ordem pelo código (itensEmOrdemDoCodigo); ficha do escritório em 2 linhas (grade 42/29/29, Vendedor e Tabela lado a lado, classe .duo); rótulo da observação acima do texto (cinza, 10,5 px, maiúsculas; texto 15 px em 600); Desconto sem laranja; valor do Total em 800; traço de 1,5 px sob a tabela; código 14 px com linha de base comum; larguras do §6.4. RD-0119: branch_name saiu de OrderPdfOrder, DetalheParaPdf, pdfDoPedido e do app. RD-0131: alertas saiu do tipo, de pdfDoPedido, da gaveta do BKO (order-drawer.tsx) e do detalhe do app. Exceção: a tabela ficou em 277 mm, não 100%, porque o teste 'não mostra nenhum percentual' (versão do cliente sem '%') proíbe o sinal no HTML.

## O que preciso / o que mudou
PNG e HTML (4): C:/Users/domon/AppData/Local/Temp/claude/b5e741428393dd6e/dcc73486-2afb-480b-ae75-9b725bb97756/scratchpad/pdfs/T-0159-v3-{pedido,orcamento}-{cliente,escritorio}.png (dados fictícios; pedido com CAF-500, ACU-1K, AGU-1500).

## Pronto quando
O que preciso: parecer em 10 min. | Pronto quando: parecer sem 🔴 para o build da v1.0.4.
