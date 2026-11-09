---
id: R-20261104-203306-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:33:06-04:00
---
# T-0076/T-0077: V1 corrigido (filtro do card Orçamentos = só em aberto)

## Contexto
Contexto: 🟡 V1 da revisão.

## O que preciso / o que mudou
Arquivos: modules/vendedor/domain/resumo-inicio.ts(+test), app/lib/resumo-inicio.ts(+test), app/screens/orders-screen.tsx. Mesma função de domínio no card e no filtro; chip Orçamentos segue com todos. vitest 16/16, eslint e tsc (3 tsconfig) verdes. Sem commit.

## Pronto quando
Pronto quando: aceite.
