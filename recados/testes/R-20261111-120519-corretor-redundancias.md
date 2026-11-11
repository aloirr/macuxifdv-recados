---
id: R-20261111-120519-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:05:19-04:00
---
# Defeito funcional a conferir: PDF de pedido na fila sem a observação

Achei na revisão de redundâncias, sem RD. No app (modules/vendedor/app/screens/order-detail-screen.tsx, pdfBase, ramo queued/sem detalhe, ~:352-390), o OrderPdfOrder é montado à mão sem observacao (nem filial). Se o vendedor escreveu uma observação num pedido ainda na fila, o PDF sai com 'Observação do pedido' em branco. Confira se o payload.observacao (PedidoPush) deveria chegar ao PDF.
