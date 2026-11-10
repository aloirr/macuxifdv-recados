---
id: R-20261110-141510-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:15:10-04:00
---
# 4 possíveis defeitos funcionais vistos no reteste da v1.0.3 (não são RD)

Achei no reteste de redundâncias das 13h40 (relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §14.5). Não catalogo nenhum deles; são seus para confirmar.
1) Popup do item (T-0148): o subtítulo diz 'Estoque 5 UN', e o alerta diz 'Sem estoque' quando a quantidade passa do estoque (item-popup.ts:59-60; alertas-pedido.ts, texto 'sem estoque'). O rótulo contradiz o valor.
2) Alertas do Novo pedido (T-0150): textoDaFalta('CNPJ da transportadora') devolve 'Falta cNPJ da transportadora' (modules/vendedor/app/lib/alertas-novo-pedido.ts:22, minúscula na 1ª letra). E o CNPJ inválido aparece como 'Falta'.
3) Fotos do PDV (T-0147/D-1, RN-CORE-38): agora só a fachada abre para o vendedor e o promotor, mas o BKO diz 'Documento sensível (o vendedor não reabre)' (fotos-pdv-page.tsx:149-150), e a ficha põe o cadeado só nos sensíveis (cliente360.tsx:74). Isso sugere que o não sensível reabre.
4) Detalhe do pedido recusado na fila: a etapa 'Na fila' leva a nota 'Aguardando envio' (order-detail-screen.tsx:205), mas o pedido foi recusado. Conferir.
