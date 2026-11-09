---
id: R-20261031-020934-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T02:09:34-04:00
---
# Fase A2 entregue: 31 testes (171/277), motor de sync, permissão por ação e shells

## Contexto
Fase A2 da T-0001 concluída. Desenho: docs/desenho/T-0001.md §13 (motor de sync), §14 (ponto de extensão da B2) e §15 (entrega). Decisões: docs/decisoes/0003-motor-de-sync-e-registro-de-telas-no-platform-sdk.md e 0004-permissao-por-acao-no-manifesto.md.

## O que preciso / o que mudou
**Testes da Fase M (31)**: apps/web/lib/audit.test.ts 7 · apps/mobile/src/lib/outbox.test.ts 6 · apps/mock-api/test/api.test.ts 18 (mock-api + planilhas em apps/mock-api/dados). `node scripts/contar-testes.mjs apps packages modules` → 250 no repo; da Fase M nos destinos: **171/277** (A 58 + B 82 + A2 31).
**Verificação**: `pnpm install`, `pnpm lint` (15/15 + fronteiras sem violação), `pnpm typecheck` (15/15) e `pnpm test` (15/15) verdes na raiz. `coord verificar engenheiro-software`: só acusa arquivos de outros agentes (falha conhecida do script); nenhum arquivo meu fora dos meus caminhos.
**platform-sdk**: `motor-sync.ts` + `sync-simulado.ts` (fila FIFO idempotente, push em lotes, pull com cursor, etapas por módulo, RN-CORE-02 com confirmação do usuário), `shell.ts` (`definirModuloShell`/`criarShell` com páginas, entidades, etapas e extensões de UI), `permissoes.ts` (campo `acoes` no manifesto, `pode`, `verificarAcao`; RN-PRO-01 no manifesto e no `pode`), `perfis.ts` (perfis por app, Q6; `perfilDaFaseM`), subpath `./react` (`ShellProvider`, `usePode`, `SePode`, `useExtensoes`, `useMotorSync`). +21 testes próprios.
**Shells**: web — login (perfis do doc 03, só BKO), app-shell com menu vindo do registro, auditoria, `(bko)/[...caminho]` para páginas de módulo, `useModulosEfetivos`. mobile — `state/plataforma.tsx` no lugar do app-store, adaptadores AsyncStorage/transporte (`fase-m` padrão e `v1`), login, sync, perfil com fila e card de módulo desativado, abas dinâmicas, `/m/[...caminho]`; services api/pdf copiados.
**Fronteira**: nova regra `app-importa-interno-de-modulo` (exceção mock-api, legado), fixture → 8 erros.
**Recados**: pedido ao modulo-vendedor (trocar `acoesPedido` por `acoes` já; contrato B2), pedido ao modulo-core (exports do package.json — tirar `./domain`, pôr `./web`/`./app`; contrato B2), resposta+encerra ao testes (itens 2–5 feitos; 1 → T-0004; 6 → T-0005), aviso a todos.
**Premissas**: login continua o de demonstração da Fase M (escolher usuário) filtrado por perfil; o login código da empresa + e-mail + senha (Q3) depende da auth da T-0003. `manager` da Fase M = `gerente`. Sem `GET /v1/me/modulos` no mock-api, os shells calculam os efetivos localmente (todos os instalados ativos + padrão do perfil). Shells instalam só core e vendedor; os demais módulos na T-0004.
**Pendências**: B2 pode começar (core e vendedor); quando o core publicar `./web`/`./app` eu ligo no shell. `next build` do web não foi executado (só typecheck/lint/test).

## Pronto quando
Gerente atualiza quadro/T-0001 (A2 ✅, 171/277) e dispara a rodada 3 (core B2, vendedor B2).
