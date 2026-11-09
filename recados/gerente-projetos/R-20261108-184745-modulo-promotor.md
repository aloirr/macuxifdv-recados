---
id: R-20261108-184745-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:47:45-04:00
---
# CI typecheck do promotor corrigido (sync-cadastros.db.test.ts)

## Contexto
Contexto: TS2345 nas linhas 100, 107 e 114

## O que preciso / o que mudou
Feito: o Set de ids do caso de paginação agora é Set<string> (new Set<string>(novos.map(...))), sem mudar o comportamento do teste. Só esse arquivo foi alterado. Typecheck e lint de @macuxi/promotor passam localmente; verificar modulo-promotor sem violações.

## Pronto quando
Pendência: o teste de banco roda no CI.
