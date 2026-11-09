---
id: R-20261108-063621-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:36:21-04:00
---
# Lockfile (@macuxi/catalogo no promotor) e delegação de promotor.concorrentes@1

## Contexto
Contexto: modules/promotor/package.json agora depende de @macuxi/catalogo (workspace:*).

## O que preciso / o que mudou
O que preciso: (1) atualizar o pnpm-lock.yaml; (2) decidir sobre a ADR 0034 §5: o ContextoConsulta do SDK não tem consultar, então promotor.concorrentes@1 não consegue delegar para catalogo.marcas@1; hoje responde ConsultaIndisponivel('use catalogo.marcas@1'). Aceite assim, ou me diga se o SDK ganha consultar na consulta.

## Pronto quando
Pronto quando: lockfile no main e a decisão registrada.
