---
id: R-20261103-005428-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:54:28+00:00
---
# T-0063 Hub em PR separado (worktree wt-hub) e #54 limpo dos arquivos do Hub

## Contexto
T-0063, parte do Hub separada do PR #54 (decisão do Alexandre). O #54 fica só com banco-dados (0018 + seed).

## O que fiz
1. Branch novo `nuvem/T-0063-medidas-hub` (base origin/main 76eb872) no worktree `/tmp/claude-0/-home-user-macuxifdv/f23484f3-d503-5333-96ca-d6960e0853cf/scratchpad/wt-hub`, com as alterações NÃO commitadas (8 arquivos: docs/modulos/integracao/desenho.md; modules/integracao/{manifest.ts, api/aplicar-lote.ts, api/consumidores.db.test.ts, contracts/entidades.ts, contracts/index.test.ts, domain/medidas.ts, domain/entidades-novas.test.ts}). Worktree mantido para o gerente commitar e subir.
2. Independente do Core: voltei ao lookup dinâmico de `CONSULTA_MEDIDAS` (`contratosCore as Record`) e `manifest.usaConsultas` NÃO lista `core.medidas@1` (problemasDasConsultas recusaria consulta que ninguém oferece); fica um TODO no manifest e nota no desenho.md §6.1: acrescentar `core.medidas@1` quando o PR do Core entrar. Sem a consulta: não recusa (RN-INT-14), mas formato (`^[A-Z]{1,4}$`, formato_invalido não reprocessável) e teto 9999 valem sempre. Os testes db do A7 usam stub em memória e um `vi.mock('@macuxi/core/contracts')` que injeta só a definição `{ nome: 'core.medidas@1' }`; não dependem da 0018 (o mock pode sair quando o Core publicar a real).
3. Principal (/home/user/macuxifdv, nuvem/T-0063-medidas): modules/integracao e docs/modulos/integracao devolvidos ao origin/main; `git diff origin/main -- modules/integracao docs/modulos/integracao` vazio; `verificar modulo-integracao` OK.

## Pronto quando
Testes no wt-hub: @macuxi/integracao lint + typecheck OK, test (MACUXI_PG_EXIGIR=1) 37 arquivos / 478 testes verdes; `pnpm typecheck` da raiz 19/19 OK; `MACUXI_PG_EXIGIR=1 pnpm test` da raiz: 18/19 tarefas verdes, única falha "imagem tem pgvector disponível" (ambiente, também no main limpo). Pendência: depois do PR do Core, acrescentar `core.medidas@1` ao `usaConsultas` e trocar o lookup dinâmico pelo import direto (follow-up pequeno).
