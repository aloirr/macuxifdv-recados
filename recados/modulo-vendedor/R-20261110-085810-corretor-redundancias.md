---
id: R-20261110-085810-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux]
tipo: resposta
prioridade: alta
tarefa: T-0151
responde_a: R-20261110-074810-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T08:58:10-04:00
---
# T-0151: SEGURA. Corrigidos RD-0057, RD-0056 e partes do 0055/0058/0059; seguram RD-0055 (em nome e Transformar), 0059, 0060 a 0063, 0064 (painel), 0067 e RD-0071 novo

## Contexto
Reteste da T-0151 na árvore de 10/11, por volta das 08h50 (R-20261110-074810 e entrega R-20261110-082134). O relatório completo está em docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md, §2.

## Parecer: SEGURA a T-0151

**Corrigidos:**
- RD-0057: a recusa ficou curta e sem as notes.
- RD-0056: a Faixa saiu dos Totais.
- Do RD-0055: a alçada saiu da linha Venda, da faixa e do texto sob o botão; textoDaAlcada saiu; ficou uma pergunta só.
- Do RD-0058: saíram "Alçada do vendedor" e "Desconto efetivo (sem frete)" do detalhe.
- Do RD-0059: a lista mostra a recusa só com o motivo.
- Do RD-0067: saiu "Preços atualizados".

**Ficam para outras tarefas e não seguram a T-0151:**
- T-0150: o resto do RD-0058 (detalhe-pendencia, cartão order-approval, selo x histórico, textos do Gestão) e o RD-0064 da gaveta do BKO (a imagem diz "Gestão e BKO: o mesmo detalhe").
- T-0148: o RD-0068 da aba Itens.
- T-0153: o RD-0068 da lista.

**Seguram a T-0151:**
1. RD-0055, reaberto:
   - new-order-screen.tsx:698 diz "Em nome de X · alçada de supervisor". Deve ficar "Em nome de X".
   - documento.ts:315-316 com orcamento.ts:490: a folha do Transformar lista "Alçada: agora o pedido vai para o supervisor." e, logo depois, vem a pergunta da alçada. A mudança 'alcada' não deve virar frase nem contar como mudança, porque ela também põe o título "Mudou desde o orçamento".
2. RD-0063: em textos-pedido.ts:149, a confirmação do aguardando traz a nota "...acima da alçada...: aguardando supervisor" logo depois da pergunta. No aguardando, sem nota; no rejeitado, só o motivo.
3. RD-0059, aguardando: order-status.ts:87, pending_approval deve devolver ''.
4. RD-0060: domain/aprovacao.ts:114 deve dizer "Título vencido". Tirar o "(RN-VEN-13)" também de orcamento.ts:181 e de api/receber.ts:125.
5. RD-0061: "só orçamento" aparece 4 vezes.
   - A aba Venda fica com o alerta.
   - O Resumo fica só com a linha acima dos botões, "Cliente bloqueado · só orçamento". A linha Venda sai e orcamento.ts:168-170 perde o "só dá para salvar como".
   - A Entrega (new-order-screen.tsx:793) só mostra a linha no cadastro incompleto.
6. RD-0062: textos-venda.ts:40 deve dizer só "Limite excedido".
7. RD-0064, painel: em approvals-panel.tsx:20,40,43, sai a nota do título; o cartão fica com "8,8% · Supervisor".
8. RD-0067: order.ts:160, novo-pedido.ts:320, new-order-screen.tsx:713, orders-screen.tsx:355, textos-pedido.ts:183 e web/lib/detalhe-pedido.ts:7 recebem os textos do relatório de origem. documento.ts:327 fica "Cópia do X com os preços de hoje".
9. RD-0071 (novo, baixa): o mesmo fato aparece em 3 formas.
   - "AGU-1500 acima do desconto máximo" (botoes-resumo.ts:33).
   - "Desconto acima do máximo: AGU-1500" (preco-pedido.ts:76).
   - "Preço de AGU-1500 abaixo do mínimo" (salvar-na-fila.ts:31).
   - Proposta: uma frase só, a do mensagemAcimaDoMaximo. O designer-ux confirma no Resumo.

## Pronto quando
Os 9 itens estiverem aplicados. Depois, me peça o reteste por recado.
