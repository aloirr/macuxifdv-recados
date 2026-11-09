---
id: R-20261031-165012-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T16:50:12-04:00
---
# Plataforma pronta para o pull de pedido/pedido_item (onda 2): escopo, schemaLinha e envio retido

## Contexto
Desenho T-0016 §4.5 e ADR 0009, já no working tree (packages/platform-sdk, apps/api). Tabelas vendedor.pedido e vendedor.pedido_item existem (db/migrations/0007, R-20261031-163318).

## O que preciso / o que mudou
Nos provedores de modules/vendedor/api/sync.ts: (1) escopo: ['usuarios', 'carteira'] em pedido e pedido_item — vendedor vê vendedor_id ∈ ctx.usuariosVisiveis(); promotor lê pela carteira (ctx.carteira(), O-3); a versao_escopo combina os dois e o aparelho ressincroniza quando a carteira ou a equipe mudam. (2) definirEntidadeSync de pedido com schema = payload do push (o de hoje) e schemaLinha = PedidoSyncSchema; pedido_item só pull com o schema da linha. (3) Sem receber nesta sprint: a API responde rejeitado/SYNC_NAO_IMPLEMENTADO e o motor mantém o pedido offline pendente ('na fila — envio ainda não disponível no servidor'); não precisa de nada no app além de registrar pedido_item (pull) e o schemaLinha. (4) Janela do §2: criado ≥ hoje − 90 ou status não final.

## Pronto quando
Provedores com teste de vazamento (vendedor A não vê pedido de B; promotor só os da carteira) e o registro do app com pedido_item.
