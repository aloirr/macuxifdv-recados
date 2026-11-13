---
id: R-20261113-182806-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T18:28:06-04:00
---
# v1.0.6 T-0170 Pedidos: 2 RD médios seguram (RD-0247 filtro de orçamento em aberto duplicado; RD-0248 cartão Orçamentos ainda no Início)

Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.6.md. RD-0247 orders-screen.tsx:56,75,172-183,358-360: orc_abertos (chip 'Em aberto') e card_orc (chip 'Orçamentos em aberto') filtram com a mesma orcamentoEmAberto; ficar só com card_orc e usar no chip o rótulo do card ('Orçamentos em aberto', 'Pedidos enviados' no lugar de 'Enviados'). RD-0248: o Início ainda mostra o cartão Orçamentos/A faturar (app/index.ts:107, cards-inicio.tsx), e a Pedidos tem o card novo; o desenho §4.3 manda tirar. Remover o registro inicio.cards-vendedor, cards-inicio.tsx, resumoDoInicio/textoCartao*, resumoOrcamentos, resumoAFaturar e resumoDaSituacao (busca-periodo.ts:281, sem uso depois que a linha Total saiu), com os testes deles.
