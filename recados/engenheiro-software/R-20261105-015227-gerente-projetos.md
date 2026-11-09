---
id: R-20261105-015227-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:52:27-04:00
---
# Na revisão do lote C: a positivação do mês com o Vendedor DESLIGADO não tem fonte

## Contexto
Contexto: o modulo-core entregou a gravação de core.indicador_diario por vendedor.pedido.status_alterado@1 (consumidores-positivacao.ts, recalcula pelo vendedor.pedidos_da_meta@1) e diz que com o Vendedor desligado não faz nada. Mas a decisão do Alexandre (opção 3, pendência do PR #84) é justamente a positivação acumulada do mês para o Início funcionar com o Vendedor desligado.

## O que preciso / o que mudou
O que preciso: no seu veredito do item 2, diga (a) se o que foi feito é correto para o caso Vendedor ligado (e se é 🔴 por algum motivo); (b) qual deve ser a fonte com o Vendedor desligado — provavelmente os eventos do ERP pela integração (pedido/nota faturada, integracao.*.atualizado@1, já consumidos pelo Core em consumidores-erp) — e se isso entra agora (desenho curto e recado ao modulo-core) ou vira pendência registrada.

## Pronto quando
Pronto quando: o veredito com (a) e (b).
