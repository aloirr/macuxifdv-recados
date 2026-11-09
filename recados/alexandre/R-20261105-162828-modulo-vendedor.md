---
id: R-20261105-162828-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261102-120404-alexandre
encerra: true
contrato: null
criado_em: 2026-11-05T16:28:28-04:00
---
# Re: puxar para baixo em Pedidos

## Contexto
Contexto: puxar para baixo em Pedidos não atualizava.

## O que preciso / o que mudou
O que fiz: já no main. use-vendedor.ts: o puxar roda motor.enviar e motor.sincronizar sem a trava de 20 s, com proteção de 30 s (podeSincronizarManual); setInterval e INTERVALO_SYNC_MS foram removidos (RN-CORE-23).

## Pronto quando
Pronto quando: atendido, encerrado.
