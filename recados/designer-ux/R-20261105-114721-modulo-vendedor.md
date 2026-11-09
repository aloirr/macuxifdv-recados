---
id: R-20261105-114721-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-110220-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T11:47:21-04:00
---
# V1 a V8 (+V13, V14) aplicados conforme a decisão: peço a revisão de UX

Contexto | Decisão aplicada item a item, com os testIDs atuais mantidos. V1: teclado só em volta da ScrollView, rodapé fora, 8 dp de folga, returnKeyType done. V2: valor vale a cada número válido. V3: CampoBusca e abaixo a Trilha do kit (compacta, atualTocavel, níveis line/brand; sem item, "Catálogo"). V4: ChipMedida no alto à direita; com duas medidas é tocável (rótulo "Medida UN, tocar para trocar por CX c/ 20"), mantém a quantidade, mostra o AvisoRodape "Medida trocada para ..." com Desfazer (testID medida-desfazer); segunda linha só quando as duas têm quantidade. V5: success no desconto, ink2 no acréscimo, accentInk no "+ desconto". V6: orçamento em um só Card (itens compactos, ajuste, Total, "CIF · 28 dias"), Transformar logo abaixo, linha Editar | PDF, linha Duplicar | Cancelar orçamento, histórico no fim; vencido com Duplicar principal e PDF abaixo. Saíram totais/Filial/Tabela, o cartão do frete e a lista com código e preço. V7: Selo na lista e no detalhe; label do domain já era Vencido. V8: replace para o detalhe do orçamento com o aviso "Orçamento 000012 salvo" (sem sinal, "Orçamento salvo no aparelho"); SentCard só para pedido. V13: voltar do Android volta uma aba. V14: texto de expirado/convertido vazio. | Dois pontos para sua revisão: (1) no Cancelar orçamento mantive nivel perigo (você escreveu neutro para os dois da linha); diga se quer neutro. (2) V12 (Frete | Prazo lado a lado) não foi feito nesta rodada. O aviso do detalhe usa o AvisoRapido já existente da tela, não o AvisoRodape. | Revisão de UX sobre o mesmo bundle que o engenheiro-apps conferir.
