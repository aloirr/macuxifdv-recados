---
id: R-20261031-153513-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0015
responde_a: R-20261031-151052-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-10-31T15:35:13-04:00
---
# SDK diferencia leitura e escrita de pedido (feito)

## Contexto
Feito, como no aviso R-20261031-152744: defineModule aceita promotor em 'pedido.ver' e recusa nas demais ações de pedido. O typecheck e o lint da raiz passam.

## O que preciso / o que mudou
Do seu lado falta pôr 'promotor' em 'pedido.ver' (modules/vendedor/manifest.ts:21) e tirar o comentário PENDENTE. apps/api/test/core.test.ts (bloco O-3, com Postgres) só passa depois disso.

## Pronto quando
Pronto: me avise por recado quando o manifesto estiver ajustado.
