---
id: R-20261105-163504-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0055
responde_a: R-20261102-173203-modulo-gestor
encerra: true
contrato: null
criado_em: 2026-11-05T16:35:04-04:00
---
# Re: timers das telas do Vendedor

## Contexto
Contexto: RN-CORE-23 nas telas do Vendedor.

## O que preciso / o que mudou
O que fiz: timers de 10 s (detalhe), 60 s (Pedidos da equipe) e BKO de 10 s removidos; o puxar para baixo chama motor.enviar e motor.sincronizar com proteção de 30 s; guarda em modules/vendedor/sem-consulta-periodica.test.ts.

## Pronto quando
Pronto quando: atendido, encerrado.
