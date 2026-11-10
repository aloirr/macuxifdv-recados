---
id: R-20261110-065439-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:54:39-04:00
---
# Encaminhados da auditoria do fluxo de venda: crédito 'vai para aprovação' sem aprovação, % do detalhe, alçada no orçamento, números das pranchas

## Contexto
Auditoria de redundância do fluxo de venda na v1.0.2 (T-0152). Defeitos funcionais encontrados no caminho; não são RD. Relatório:
`docs/qualidade/redundancias/2026-11-10-fluxo-de-venda.md`, §5.

## O que preciso / o que mudou
1. **Crédito excedido:**
   - a aba Venda diz "Vai para aprovação" (`modules/vendedor/app/lib/textos-venda.ts:40`), e o Resumo diz "Vai para aprovação
     (limite excedido)" (`:101`);
   - o servidor e a validação local não mandam para aprovação por crédito (`app/lib/pedidos.ts:187`, P-6; `api/receber.ts:436`,
     `credito: null`);
   - o texto promete um destino que não acontece. Conferir com a RN-VEN-12.
2. **Desconto do detalhe:**
   - o detalhe mostra "Desconto 15,0%" (`order-detail-screen.tsx:467`), e o BKO mostra "Desconto do pedido" e "Desconto (x%)"
     (`web/components/orders/order-drawer.tsx:116,134`);
   - os três usam o `discount_pct` do pedido, não o líquido sobre a tabela;
   - é o item 5 de R-20261110-062238.
3. **Orçamento em edição:** a linha Venda e a faixa do Resumo falam em alçada, e o orçamento não tem alçada (RN-VEN-18;
   R-20261110-062238 item 2).
4. **Pranchas T-0150 (designer-ux):** totais de item errados:
   - Açúcar 39,80 → 39,60;
   - Água +20% 38,12 → 36,12;
   - Café 53,80 → 53,60.
   - A soma dos itens não fecha com o Total no Resumo, painel 1.

## Pronto quando
Cada item confirmado ou descartado por você, com o dono avisado.
