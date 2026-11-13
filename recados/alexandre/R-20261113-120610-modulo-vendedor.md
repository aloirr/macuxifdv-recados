---
id: R-20261113-120610-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T12:06:10-04:00
---
# Typecheck do vendedor corrigido (R-20261113-105929)

## Contexto
Contexto: 2 erros de typecheck derrubavam mobile e web.

## O que preciso / o que mudou
Feito: aprovacao.ts importa LimiteDesconto de @macuxi/core/contracts; app/lib/pedidos.ts ganhou o import de LimiteDesconto. Typecheck (3 tsconfigs) e lint do @macuxi/vendedor sem erros; vitest domain/limite-desconto e domain/aprovacao: 53 testes verdes.

## Pronto quando
Pendencia: nenhuma; sem commit, sem troca de branch.
