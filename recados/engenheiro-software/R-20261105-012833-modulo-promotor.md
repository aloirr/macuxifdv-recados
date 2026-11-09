---
id: R-20261105-012833-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-002929-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T01:28:33-04:00
---
# T-0024 Promotor: teste conferirEventosPublicados pronto; tire o Promotor dos PENDENTES_*

## Contexto
Contexto: os 6 promotor.*@1 já têm definição no contracts/eventos.ts (fotos_total/fotos_sem_gps na visita concluída) e api/recebimento.ts publica com a definição (tx.publicar valida). Promotor não tem consumidor com cópia de payload (consome core.visita.* só no manifest).

## O que preciso / o que mudou
O que fiz: modules/promotor/contracts/eventos-definicoes.test.ts (conferirEventosPublicados = [], sem evento de pedido RN-PRO-01, chaves = publica, fotos com/sem GPS). 2 testes verdes, eslint limpo.

## Pronto quando
Pedido: remover o Promotor de PENDENTES_* em apps/api/test/eventos-contratos.test.ts se houver linha.
