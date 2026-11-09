---
id: R-20261105-004128-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:41:28-04:00
---
# T-0024 (integracao): definições dos eventos no contracts

## Contexto
Contexto

## O que preciso / o que mudou
Feito: modules/integracao/contracts/eventos.ts (16 definições), contracts/eventos-definicoes.test.ts, api/eventos.ts (reexporta), api/consumidores-pedido.ts (eventoTolerante do vendedor), domain/pedido-fila.ts(+test) e api/consumidores.db.test.ts (tipos), contracts/index.ts, eventos-consumidos.ts removido, docs/modulos/integracao/hub-api.md. tsc/eslint ok; 448 testes ok.

## Pronto quando
O que preciso | Nada; pendência: db.test sem Postgres não rodado. | Pronto quando revisão do engenheiro-software.
