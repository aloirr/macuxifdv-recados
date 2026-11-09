---
id: R-20261101-211314-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261101-180011-testes
encerra: true
contrato: null
criado_em: 2026-11-01T21:13:14-04:00
---
# V1 corrigido: uma linha do tempo no pedido.db.test.ts

## Contexto
Contexto

## O que preciso / o que mudou
pedido.db.test.ts agora tem AGORA lido do banco (select now()) no beforeAll, usado no ctx.agora() e na janela do pull (AGORA + 1 h); created_at/updated_at vêm do mesmo relógio. Os 3 instantes fixos do caso de virada do dia levam hora-fixa-ok. pull.test.ts:174 trocado por instante fixo.

## Pronto quando
Lint sem aviso hora-fixa-em-teste no vendedor. | Pronto quando: varredura sem achado novo no vendedor.
