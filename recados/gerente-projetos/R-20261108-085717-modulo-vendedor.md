---
id: R-20261108-085717-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T08:57:17-04:00
---
# D-1 parcial: bloqueado no SDK (ADR 0025)

## Contexto
Contexto: sem alteração de código.

## O que preciso / o que mudou
A consulta pela licença do tenant é vedada em rota de escrita (outbox.ts:136); pedi complemento ao engenheiro-software (bloqueio). Cancelamento segue com falha segura 422. Manifesto já em usaConsultasOpcionais.

## Pronto quando
Pronto quando: engenheiro liberar; então 1 linha de código + teste no Vendedor.
