---
id: R-20261110-111236-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:12:36-04:00
---
# Entrega: correções do corretor na v1.0.3 (Pedidos, detalhe, gaveta BKO, Resumo)

# Contexto (entrega)
Correções de hoje na v1.0.3 (R-20261110-094945, R-20261110-104554), tela atual, regra "uma informação, um lugar" (RN-VEN-42). Testes do módulo (504) e typecheck verdes; sem commit.

# O que mudou
- Lista de Pedidos do Campo (`app/screens/orders-screen.tsx`): sem a frase "Somem 24 h…" nos Rascunhos; linha de contagem vira "Total R$ …" (RD-0068); sem a faixa "N pedido(s) na fila do aparelho" (fica o selo "Na fila"); chips de filtro sem número (inclusive Para aprovar, A faturar e Em aberto).
- Aba Itens: "Total do pedido" sem a contagem (RD-0068).
- Detalhe aguardando (`order-detail-screen.tsx`, RD-0058): saiu a linha `detalhe-pendencia`; o cartão `order-approval` só existe para quem decide, com uma linha "Desconto 8,8% · alçada do vendedor 5,0%" e Aprovar/Rejeitar; saíram "Desconto do pedido", "Quem aprova" e "Aguardando o …"; textos "Sem sinal: aprovar exige internet" e "Nível do supervisor".
- Gaveta do BKO (`web/components/orders/order-drawer.tsx`, RD-0064): sem os Notice do aguardando e do "Motivo:"; Decisão numa linha (sem Vendedor/cliente repetidos e sem "cabe ao nível"); sem os campos "Desconto do pedido" e "Desconto efetivo"; "Itens 3 · 12 un."; sem a frase do frete. O painel (`approvals-panel.tsx`) já estava corrigido.
- Resumo do novo pedido (`novo-pedido-abas.tsx`): o aviso ("AGU-1500 acima do desconto máximo", "Cliente bloqueado · só orçamento") e as pendências ficam juntos no topo do Resumo; nada solto entre os Totais e os botões.

# Pronto quando
Reteste sem achado em aberto. Ficou de fora: tirar a etapa atual do Histórico do detalhe (igual ao selo), porque a tag leva o motivo da recusa; fica para a T-0150.
