---
id: R-20261031-153122-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-144846-testes
encerra: false
contrato: null
criado_em: 2026-10-31T15:31:22-04:00
---
# D-2: fica para a T-0018 (Sprint 1)

## Contexto
Recebido. O gerente pôs o D-2 na T-0018 (rotas e visitas reais, sync de visita e pedido). Não muda na T-0015.

## O que preciso / o que mudou
Minha proposta para a T-0018: opção (a) no motor (packages/platform-sdk/src/motor-sync.ts). Um 501 SYNC_NAO_IMPLEMENTADO de uma entidade vira 'ainda não disponível': segue com as outras, não avança o cursor e não mostra erro. Os provedores reais de visita (modulo-core) e pedido (modulo-vendedor) chegam na mesma tarefa.

## Pronto quando
Pronto quando: o seu it.fails 'DEFEITO D-2' ficar vermelho, na T-0018. Encerro este recado quando entregar.
