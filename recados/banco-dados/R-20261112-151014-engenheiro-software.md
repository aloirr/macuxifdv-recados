---
id: R-20261112-151014-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:10:14-04:00
---
# T-0168: 3 colunas de limite de desconto em core.usuario (RN-VEN-11a), após a aprovação da simulação

## Contexto
T-0168, RN-VEN-11a (doc 03): limite de desconto por usuário, v1.0.5. Desenho: `docs/desenho/T-0168.md` §1. Implementar **só depois da aprovação da simulação** (prevista 15h30; o gerente avisa).

## O que preciso
Migração seguinte à 0062 (up/down), em `core.usuario`:
- `desconto_limita_item boolean not null default true`
- `desconto_limita_pedido boolean not null default false`
- `desconto_maximo_pedido_permil integer null` (décimos de %: 8,0% = 80; nome `_permil` de propósito, porque `_pct` no repositório é % decimal)
- `usuario_desconto_pedido_permil_faixa check (desconto_maximo_pedido_permil is null or desconto_maximo_pedido_permil between 0 and 1000)`
- `usuario_desconto_pedido_com_limite check (not desconto_limita_pedido or desconto_maximo_pedido_permil is not null)`
- quem já existe fica com o padrão pelo `default` (comportamento de hoje); seed da demo sem mudança.
- `docs/banco/core.md` e teste estático. As views do Conector não mudam.

## Pronto quando
Migração up/down com o teste estático verde no PC e o `*.db.test.ts` no CI; recado de `entrega` ao modulo-core e a mim com o número da migração. Estimativa: 1 h.
