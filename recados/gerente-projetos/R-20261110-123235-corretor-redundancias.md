---
id: R-20261110-123235-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0150
responde_a: R-20261110-115831-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T12:32:35-04:00
---
# Segura: RD-0058 e RD-0064 (alçada no cartão e na gaveta), RD-0076 (faixas de sinal), RD-0079 (faixa da fila no detalhe), RD-0082 (filial 2x)

## Contexto
Reteste do R-20261110-111226 (T-0152/T-0153) e parecer do R-20261110-115831 (T-0150, fatias 1 e 2), pelo código da árvore local às 12h30. O relatório está em docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §13. Os dois 🔴 do designer (R-20261110-120838, itens 2 e 3) são os mesmos achados do RD-0079 e do RD-0058.

## O que preciso / o que mudou
**Corrigido:** o RD-0068 (aba Itens), o Resumo sem aviso solto (os avisos estão nos Alertas do topo), o selo do topo do detalhe, os chips e o "Total R$".
**Segura (5 achados):**
1. **RD-0058 (alta)** `order-detail-screen.tsx:597-599`: "Desconto X · alçada do vendedor Y" no cartão `order-approval`. O % já está nos Totais, e a alçada nunca vai para a tela. A linha sai, e Aprovar/Rejeitar vão para o rodapé (🔴 3 do designer).
2. **RD-0064 (média)** `order-drawer.tsx:95-97` (BKO): a mesma linha `pedido.decisao.alcada` repete o "Desconto (x%)" dos totais (`:125`). A linha sai; a seção Decisão fica com o título e os botões.
3. **RD-0076 (média)** `orders-screen.tsx`: saem as faixas `orders-parcial` (:351) e `orders-parcial-erro` (:354), "Buscando o restante…", "Mostrando os 1.000 mais recentes…" (vira "Total R$ 8.420 · 1.000 mais recentes") e o `ListFooterComponent` inteiro. Entra o `SeloAtualizacao` no cabeçalho, como no R-20261110-112431 do designer.
4. **RD-0079 (média, novo)** `order-detail-screen.tsx:542-548`: a faixa `pedido-faixa-fila` ("Pedido salvo · enviando") repete a etapa "Na fila" do Histórico. A faixa sai, e "Enviar agora" vai para o rodapé como principal (🔴 2 e 🟡 4 do designer).
5. **RD-0082 (baixa, novo, fatia 1)** a forma da filial está escrita no Zod (`contracts/eventos.ts:186`) e à mão no domain (`domain/aprovacao.ts:551`). Troque por `filial?: PedidoAprovadoEvento['filial']`. Em `api/aprovado-erp.ts:110`: `const filial = filialParaEvento(p.filial); ...(filial ? { filial } : {})`.
**Notas, sem RD:** (a) quando o motivo do supervisor for para os Alertas (🔴 1 do designer), ele sai da etapa Rejeitado; eu confiro que não fica nos 2 lugares. (b) `alertasDoPedido` reaproveita `alertasDaVenda`: fonte única, ok. (c) `novo-pedido-abas.tsx:17` importa `Faixa` e não usa; confiro na T-0148.

## Pronto quando
Os 5 itens no código e o recado de reteste antes das 19h30. Retesto assim que chegar.
