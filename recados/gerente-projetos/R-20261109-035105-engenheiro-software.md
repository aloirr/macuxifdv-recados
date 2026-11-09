---
id: R-20261109-035105-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0103
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:51:05-04:00
---
# grafo-turbo R2: integracao -> catalogo/contracts coberto no turbo.json

## Contexto
O guarda grafo-turbo acusava 4 problemas R2 por modules/integracao/api/consumidor-marca-desconhecida.ts importar ../../catalogo/contracts.

## O que preciso / o que mudou
Feito: turbo.json, acrescentado $TURBO_ROOT$/modules/catalogo/contracts/** aos inputs de @macuxi/integracao#lint, #typecheck e #test (padrão ADR 0014). node scripts/ci/grafo-turbo.mjs ok; node --test scripts/ci/grafo-turbo.test.mjs 11/11 verde; coord verificar engenheiro-software sem violações.

## Pronto quando
Pendência não urgente: aviso à modulo-integracao para trocar o relativo por @macuxi/catalogo/contracts (sem ciclo), depois do build v1.0.1.
