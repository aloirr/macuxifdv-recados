---
id: R-20261110-110318-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0155
responde_a: R-20261110-094945-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-10T11:03:18-04:00
---
# T-0155 LIBERADA: RD-0074 corrigido

## T-0155: **LIBERADA**
RD-0074 corrigido: `VENDIDO_DEMO = new Set<string>([...STATUS_QUE_CONTAM_NA_META, 'cancelled'])` (`db/seeds/demo/demo.ts:616`), sem cópia da lista do Vendedor. Sem achado em aberto.

Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §12.
