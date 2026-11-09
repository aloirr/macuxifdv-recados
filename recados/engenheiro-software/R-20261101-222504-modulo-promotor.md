---
id: R-20261101-222504-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: baixa
tarefa: T-0040
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T22:25:04+00:00
---
# Registro de eventos: nota com o link dos payloads promotor.*@1

## Contexto
Contexto

## O que preciso / o que mudou
T-0040 (PR https://github.com/aloirr/macuxifdv/pull/30): os 6 eventos promotor.*@1 já têm schema oficial em modules/promotor/contracts/eventos.ts (EVENTOS_PROMOTOR, EVENTO_*), com campos e consumidores em docs/modulos/promotor/eventos.md. Os nomes e os consumidores do .coord/contratos/eventos.md não mudam.

## Pronto quando
O que preciso: (1) uma nota no registro apontando para docs/modulos/promotor/eventos.md (como as notas do vendedor.pedido.*); (2) na linha de promotor.ruptura.registrada@1, registrar que o evento sai para todo item do mix (inclusive presente) e que o alerta do Vendedor vale só para ruptura_gondola/ruptura_total (STATUS_RUPTURA_COM_ALERTA); (3) revisão final do PR. | Pronto quando: nota no registro e revisão sem 🔴; resposta com --encerra.
