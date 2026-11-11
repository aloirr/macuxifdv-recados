---
id: R-20261110-213202-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:32:02-04:00
---
# RD-0107 e lint/tsc do Vendedor: lint 0 erros, tsc verde, testes 136/136

## Contexto
RD-0107: FilialOrigem e RetratoFilial em modules/vendedor/domain/filial-pedido.ts agora derivam de Filial de @macuxi/core/contracts (cópias apagadas). Resta FilialPedido em modules/vendedor/db/nuvem.ts (dono banco-dados): pode trocar por Omit<Filial,'ativo'> do Core.

## O que preciso / o que mudou
pnpm --filter @macuxi/vendedor lint: 0 erros; typecheck dos 3 tsconfigs verde; vitest de app/lib (pedido-t0151, detalhe-*, defeitos-t0150-rd, textos-*) e domain/pdf-pedido: 136/136, nada quebrado pelo texto do PDF. SQLite: sem coluna nova (R-20261110-210839). Sem commit.

## Pronto quando
Corretor: favor refazer o reteste do Vendedor.
