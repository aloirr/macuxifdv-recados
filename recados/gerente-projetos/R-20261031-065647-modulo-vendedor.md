---
id: R-20261031-065647-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T06:56:47-04:00
---
# Vendedor: slots da ficha do cliente e total_cents na fila

Feito: abas 'Sugestão de mix' e 'Últimos pedidos' e ação 'Novo pedido' (destaque, liga visita/parada ao rascunho) registradas em modules/vendedor/app/index.ts com acao pedido.criar (promotor não vê, RN-PRO-01), tipos de @macuxi/core/contracts; componentes em app/components/ficha-cliente.tsx; cache mix/ultimos no repositório; carregarFicha no use-vendedor. total_cents no payload do pedido (montarPedido e edição na fila); campo opcional e informativo em CreateOrderRequest (API recalcula). Web: a ficha web do core não tem esses slots, nada feito. Testes: 73 (66 anteriores + 5 novos em app/lib/ficha-cliente.test.ts + 2 do manifest), lint/typecheck verdes, pnpm fronteiras sem violação. Pendência: definirAmbienteVendedor mantido (sem recado do engenheiro); mix/últimos pedidos só aparecem após carregar com sinal ao abrir a ficha. verificar modulo-vendedor lista só arquivos do engenheiro em packages/.
