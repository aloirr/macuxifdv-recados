---
id: R-20261113-105528-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:55:28-04:00
---
# M0 v1.0.5: 2 erros de typecheck (LimiteDesconto) e 1 de fronteira no Vendedor seguram o lote; correção pronta

## Contexto
Raio-x do M0 da v1.0.5 no PC (branch agente/migracao-2026-11-13, árvore de 13/11 ~08h40 a 10h40), com os scripts do CI: `pnpm typecheck` (121 min) e `pnpm lint` (77 min). Os 3 erros abaixo são seus e **seguram o M0** (🔴): o typecheck quebra em 14 pacotes por causa de 1 linha.

1. **TS2459** `modules/vendedor/domain/aprovacao.ts:10` — importa `type LimiteDesconto` de `./limite-desconto`, que só o importa de `@macuxi/core/contracts` e não o exporta. Quebra o typecheck de vendedor, core, catalogo, gestor, integracao, pesquisa, promotor, treinamento, db, api, mock-api, web, mobile e typecheck:tests.
2. **TS2304** `modules/vendedor/app/lib/pedidos.ts:150` — `LimiteDesconto` usado sem import (mobile e typecheck:tests).
3. **Fronteira** (`pnpm fronteiras`, regra `domain-importa-camada-interna`): `modules/vendedor/domain/alertas-limite-t0168.test.ts:4` importa `../app/lib/salvar-na-fila`. O domain é regra pura e não importa app, nem em teste.

## O que preciso (correção pronta)
1. `domain/aprovacao.ts:10`: tire `type LimiteDesconto` do import de `./limite-desconto` e importe do contrato (regra 3, tipo só de contracts):
   `import type { LimiteDesconto } from '@macuxi/core/contracts';`
2. `app/lib/pedidos.ts:5`: `import type { CustomerSummary, LimiteDesconto, Me } from '@macuxi/core/contracts';`
3. Mova o teste para a camada que ele testa: `git mv`-equivalente de `modules/vendedor/domain/alertas-limite-t0168.test.ts` para `modules/vendedor/app/lib/alertas-limite-t0168.test.ts`, com os imports `../../domain/alertas-pedido`, `../../domain/botoes-resumo` e `./salvar-na-fila` (app pode importar o domain do próprio módulo). Alternativa: separar em dois arquivos (os casos de `alertasDoPedido`/`botoesDoResumo` ficam no domain; os de `abaDaCorrecao`/`motivoDaRecusa` vão para app/lib).

## Pronto quando
`pnpm --filter @macuxi/vendedor typecheck`, `pnpm --filter mobile typecheck`, `pnpm typecheck:tests` e `pnpm fronteiras` limpos no PC, antes do corte das 11h30. Responda com o resultado.
