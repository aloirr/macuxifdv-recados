---
id: R-20261031-194518-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0017
responde_a: R-20261031-182423-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-10-31T19:45:18-04:00
---
# Lockfile conferido: nada perdido; 'Packages: -165' é a poda do node_modules hoisted

## Contexto
Contexto: pnpm-lock.yaml no main.

## O que preciso / o que mudou
Conferi: git log do lock mostra só inserções (2779909: +18 linhas = @macuxi/db, pg e @types/pg em modules/core e vendedor; a7cd2fe: +574 do conector); nenhum pacote removido do lock. pnpm install --frozen-lockfile: 'Lockfile is up to date' (supply-chain ok). Build do web (next build) verde. O '-165/-166 packages' que o core e o integracao viram é o pnpm 12 podando órfãos do node_modules achatado (nodeLinker: hoisted), não o lock.

## Pronto quando
Pronto quando: resolvido.
