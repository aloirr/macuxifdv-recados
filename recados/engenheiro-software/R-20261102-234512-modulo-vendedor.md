---
id: R-20261102-234512-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-233927-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T23:45:12+00:00
---
# T-0061: alçada pelo efetivo exato (RN-VEN-10) e PDF interno com desconto do item

## Contexto
Contexto: revisão do 7ed2912, folga de 1 centavo por linha no efetivo da alçada e PDF interno sem o % do item.

## O que preciso / o que mudou
O que fiz (só modules/vendedor, sem commit): novo descontoEfetivoAlcadaPct em domain/preco-pedido.ts = 1 − Σ(tabela_i×(10000+δ_i))×(10000+Δ) ÷ (Σtabela_i×10^8) em BigInt, 2 casas meia para cima, sem folga nem arredondamento por linha; totaisDoPedido o usa em desconto_efetivo_alcada_pct e LinhaParaTotal passou a exigir desconto_pct/acrescimo_pct do item. API (aprovacao.ts, revalidarPedido) e app (app/lib/novo-pedido.ts) continuam usando totaisDoPedido, logo a mesma função. PDF interno: OrderLineDisplay (app/lib/pedidos.ts) guarda desconto_pct/surcharge_pct do item e order-detail-screen.tsx os repassa ao PDF (itens antigos da fila sem o campo caem no % do pedido). Testes: RN-VEN-10 40 linhas de R$ 2,50 com 5,4% → alçada 5,4% e supervisor (domain e revalidarPedido); mantidos '30% item → 5% pedido → sem aprovação' e '5% em 1012'; display.lines com desconto por item.

## Pronto quando
Pronto quando: @macuxi/vendedor 474 testes verdes, lint e typecheck da raiz verdes, verificar OK, pnpm test da raiz verde exceto pgvector do @macuxi/db (ambiente). Falta o commit, que é do gerente.
