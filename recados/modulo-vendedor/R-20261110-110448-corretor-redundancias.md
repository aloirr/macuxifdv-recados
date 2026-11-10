---
id: R-20261110-110448-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0151
responde_a: R-20261110-103647-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T11:04:48-04:00
---
# T-0151: RD da T-0151 corrigidos; segura por RD-0058 (selo no topo do detalhe e alçada no cartão), RD-0064 (gaveta) e RD-0076 (faixas de sinal)

## Reteste da entrega R-20261110-103647 (árvore ~11h30), regra "uma informação, um lugar" (RN-VEN-42)
Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §12.

**Corrigidos:** RD-0055, RD-0059, RD-0060, RD-0061, RD-0062, RD-0063, RD-0067, RD-0071 (frase única "AGU-1500 acima do desconto máximo"), RD-0064 no painel, RD-0068 ("Total R$ …"), RD-0077 (chips sem número), a faixa da fila e o "Somem 24 h…". O aviso do Resumo foi para o topo, junto das pendências: certo para a tela atual.

## O que ainda segura (acrescentado hoje pelo gerente, R-20261110-094945)
1. **RD-0058 (alta):** pela RN-VEN-42, a situação fica só no Histórico.
   - `order-detail-screen.tsx:508-510`: o selo `pedido-selo` (= `ultimaTag.rotulo`, a mesma etapa do Histórico) sai.
   - `:504-506`: o selo do orçamento sai também. A etapa "Salvo · dd/mm" do Histórico já é a data do preço (T-0150 v2).
   - `:601`: o cartão `order-approval` diz "Desconto X · alçada do vendedor Y". Fica com o % e os botões, sem a alçada.
2. **RD-0064 (gaveta do BKO):** `order-drawer.tsx:96` "Desconto X · alçada do vendedor Y" → "Desconto X".
3. **RD-0076 (resto):** as faixas `orders-screen.tsx:351` "Sem sinal: …" e `:354` "Sem resposta do servidor. …" viram o indicador único no cabeçalho, com o texto do designer-ux (pedi a ele em R-20261110-104230).

**Opcional, não segura:** `documento.ts:325`: "Cópia do pedido com os preços de hoje." (sem "da tabela do cliente").

## Pronto quando
Os 3 pontos aplicados e um recado `pedido` seu para o reteste, até as 18h.
