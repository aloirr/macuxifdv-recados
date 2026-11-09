---
id: R-20261031-004609-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:46:09-04:00
---
# T-0001 Fase A entregue: raiz, platform-sdk, fronteiras, shells e mapa dos 277 testes

## Contexto
T-0001, Fase A (engenheiro-software) concluída. Desenho: `docs/desenho/T-0001.md`; decisões: `docs/decisoes/0001-monorepo-modular-e-fronteiras.md` e `0002-dinheiro-e-calendario-em-packages-comum.md`.

## O que preciso / o que mudou
**Feito**
- Raiz: `package.json` (lint = turbo lint + `pnpm fronteiras`), `pnpm-workspace.yaml` (apps/*, packages/*, modules/*), `turbo.json`, `eslint.config.mjs`, `.dependency-cruiser.cjs`, dotfiles, `.github/workflows/ci.yml`, `scripts/fronteiras.mjs`, `scripts/contar-testes.mjs` (contagem estática, não executa nada).
- `packages/config`: tsconfig base/web/mobile, ESLint, `dependency-cruiser.cjs` (7 regras de erro, inclui `import type`) + `fronteiras.test.ts` com fixtures: `violacao` FALHA com exit 7, `ok` passa.
- `packages/platform-sdk`: `defineModule` (Zod estrito), `validarConjunto`, `modulosEfetivos` (RN-CORE-01 já com o esclarecimento "exceção só remove" + RN-CORE-03), registro de extensões, barramento de eventos `<modulo>.<entidade>.<fato>@vN` com outbox e consumo idempotente, registro/cursor/push de sync, `verificarAcesso`/`ErroApiSchema`; subcaminho `/web` (cliente HTTP + sessão da Fase M). Manifestos de referência dos 8 módulos validados.
- `packages/comum` (money + calendar da Fase M) e `packages/ui` (kit web + kit mobile da Fase M, faróis).
- Shells: `apps/web` (Next 16: layout, fontes, tema, providers) e `apps/mobile` (Expo 57: `app.config.ts` com variantes campo/gestao, `eas.json` com perfis, layout, assets, serviços).
- Recados: Fase B para modulo-core (45 testes) e modulo-vendedor (37); Fase C para catalogo, promotor, gestor, pesquisa, treinamento, integracao; aviso de copiar da árvore de trabalho. Respondi o pedido do testes (T-0006).

**Verificação**: `pnpm install`, `pnpm lint` (+ fronteiras sem violação), `pnpm typecheck` (6/6) e `pnpm test` (107 testes; 58 vindos da Fase M) verdes. `verificar engenheiro-software` acusa só arquivos do gerente e do testes (árvore compartilhada), nenhum meu fora dos meus caminhos. Fase M sem nenhum arquivo modificado depois do início do meu trabalho.

**Contagem real na Fase M**: 277 casos em 23 arquivos (domain 92, contracts 6, web 113, mobile 48, mock-api 18), contados de forma estática (script + conferência manual dos 16 `it.each`). 13 desses arquivos estão não commitados/não rastreados lá: copiar da árvore de trabalho.

**Pendências / decisões para você**
1. O plano B → C → D não fecha os 277: faltam **B2** (telas dos módulos core/vendedor, 106 testes) e **A2** (shell: login/app-shell/auditoria, outbox/app-store e mock-api, 31 testes). Sugiro incluí-las na T-0001 ou abrir tarefas filhas (§8 do desenho).
2. Produto (contracts da Fase M) foi provisoriamente para o vendedor; ADR de produto (catalogo × vendedor × core) pendente.
3. Item 6 do testes (`verificar` com merge-base no CI) e `master`×`main` dependem do Alexandre (T-0005).
4. Nada commitado (sem pedido do Alexandre).

## Pronto quando
Você atualiza quadro/plano da T-0001 (B2/A2) e libera B e C; eu reviso as entregas da B e da C.
