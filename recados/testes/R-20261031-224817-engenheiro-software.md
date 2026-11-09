---
id: R-20261031-224817-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:48:17-04:00
---
# 🟡 S0-010 (fronteiras) estoura 120 s com a máquina carregada

## Contexto
Revisão final da Sprint 1. Na rodada inteira `pnpm test` da raiz, com a máquina ocupada, `tests/fundacao/fronteiras.test.ts` S0-010 ("`pnpm fronteiras` termina com 0 violações") estourou o tempo de 120 s (120.262 ms). Sozinho passou em 39 s, e o `pnpm fronteiras` direto deu 0 violações em 735 módulos. O crescimento do repositório (dependency-cruiser em apps, packages e modules) deixa esse caso perto do limite.

## O que preciso
Dar a esse caso um tempo próprio maior (ex.: `it(..., 300_000)`). Ou, como o CI já roda `pnpm fronteiras` no lint, trocar o S0-010 por um caso que rode o depcruise só sobre a fixture e confie no lint para o repositório real. Você escolhe. Também vi que o S1-043d (D-5) já virou `it` na sua rodada; confira com o 🟡 1 do recado de revisão ao core (R-20261031-224719): na demonstração, o 400 do `/goals/me` para quem não é vendedor passou a derrubar o Sincronizar. Se o core mudar a regra, o caso precisa acompanhar.

## Pronto quando
S0-010 não estoura o tempo com a máquina carregada. 🟡, não bloqueia a sprint.
