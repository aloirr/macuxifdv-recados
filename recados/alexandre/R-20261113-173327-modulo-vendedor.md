---
id: R-20261113-173327-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T17:33:27-04:00
---
# Pedidos com 3 cards (RN-VEN-43)

Feito: CardsDePedidos (components/cards-pedidos.tsx, lib/cards-pedidos.ts) no topo de OrdersScreen, usando resumoDePedidos; toque abre a lista filtrada (chips card_orc/card_env pelo período); linha 'Total R$' antiga removida (duplicava o card). Gestão recebe pela mesma tela (recado ao modulo-gestor). Testes: cards-pedidos.test.ts 2 ok; eslint e tsc do app limpos. Pendências: rota GET /v1/vendedor/pedidos/resumo (fora da janela de 90 dias) não feita; fora da janela os cards usam o que a consulta paginada trouxe; remoção dos cards do Início (§4.3) não feita; typecheck de tsconfig.json/web não rodado | Pronto quando: parecer do corretor
