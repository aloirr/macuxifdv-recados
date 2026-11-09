---
id: R-20261105-162235-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0043
responde_a: R-20261101-234952-3-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T16:22:35-04:00
---
# Re: avisos de hora fixa

## Contexto
Contexto: avisos de hora fixa nos testes do Vendedor.

## O que preciso / o que mudou
O que fiz: api/pedido.db.test.ts usa uma linha do tempo só (agora lido do banco, linha 161) e marca com hora-fixa-ok e motivo os instantes escolhidos; app/lib/pull.test.ts não tem mais new Date().

## Pronto quando
Pronto quando: atendido, encerrado.
