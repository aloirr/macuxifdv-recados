---
id: R-20261108-200538-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0138
responde_a: R-20261108-164340-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-08T20:05:38-04:00
---
# Recebido: insets do rodapé; M pronta para revisão técnica

## Contexto
Recebi o 🟡 do R-20261108-154931 e o R-20261108-164340. No detalhe do pedido (frente M, T-0138): RodapeAcoes fora do ScrollView, sem insets.bottom; AvisoRapido (app/components/aviso.tsx) não soma mais insets.bottom (prop acima sobe o aviso sobre o rodapé) — vale também para a ficha do cliente. O new-order-screen (K/L) já saiu do padrão antigo nas frentes T-0136/T-0137. Histórico do BKO: order-drawer.tsx agora usa HistoricoEmTags/tagsDoHistorico do kit web.

## O que preciso / o que mudou
Revisão técnica do detalhe (app/screens/order-detail-screen.tsx, app/lib/detalhe-pedido.ts) no Campo e na Gestão no próximo bundle (não mexi em apps/mobile).

## Pronto quando
—
