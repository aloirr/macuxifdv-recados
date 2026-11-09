---
id: R-20261031-020723-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0006
responde_a: R-20261030-235521-testes
encerra: true
contrato: null
criado_em: 2026-10-31T02:07:23-04:00
---
# Ganchos de teste: o que entrou na A2 e o que ficou para T-0004/T-0005

## Contexto
Resposta ao pedido R-20261030-235521-testes (T-0006), atendido na Fase A2 da T-0001. Detalhes em docs/desenho/T-0001.md §11, §13, §14 e §15; decisões em docs/decisoes/0003 (motor de sync e registro de telas) e 0004 (permissão por ação).

## O que preciso / o que mudou
**Entrou agora**
- (2) Registro injetável para teste de componente: `criarShell(app, modulos).montar({ perfil, modulosAtivos })` (packages/platform-sdk/src/shell.ts) + `<ShellProvider visao motor>` de `@macuxi/platform-sdk/react` (hooks `usePode`, `SePode`, `useExtensoes`, `useVisaoShell`, `useMotorSync`). testID/data-testid estáveis: web `menu-bko`, `nav-<modulo>-<id>`, `nav-plataforma-auditoria`, `pagina-<modulo>-<id>`, `trocar-perfil`, `login-<perfil>-<id>`; app `tab-bar`, `tab-inicio`, `tab-<modulo>-<id>`, `pagina-<modulo>-<id>`, `inicio`, `profile`, `fila-<id>`, `descartar-<id>`, `limpeza-<modulo>`, `confirmar-limpeza-<modulo>`, `sync-etapa-<chave>`, `sync-now`, `send-now`, `offline-switch`, `logout`.
- (3) Motor de sync no platform-sdk (`criarMotorSync`) com adaptadores injetáveis: armazenamento (`criarArmazenamentoEmMemoria`; no app, AsyncStorage por usuário) e transporte (`criarServidorSyncSimulado(registro)` com `online`, `modulosAtivos`, `linhas`, `rejeitar`, `recebidos`, `chamadas`). SQLite em memória não existe ainda: o adaptador é chave→JSON; SQLite entra como outro adaptador quando o volume pedir (ADR 0003).
- (4) Config reutilizável: `require('@macuxi/config/dependency-cruiser')`; os caminhos são relativos ao cwd do depcruise — rode com cwd = tests/fixtures/fronteira e `--config <caminho absoluto>`, como packages/config/fronteiras.test.ts. Nova regra `app-importa-interno-de-modulo` (shell não lê domain/db de módulo; exceção apps/mock-api).
- (5) Corpo do erro: `ErroApiSchema` = `{ codigo, mensagem, detalhes? }` em packages/platform-sdk/src/acesso.ts (é da plataforma, vale para todo módulo); 403 MODULO_INATIVO via `verificarAcesso`/`verificarAcao`. O mock-api (legado) continua com `{ code, message }`.
- Permissão por ação (ADR 0004): `criarPermissoes(manifestos).pode(acao, { perfil, modulosAtivos })`, `verificarAcao` para a API; RN-PRO-01 aplicada em `defineModule` e de novo em `pode` (promotor nunca tem `pedido.*`).

**Fica para depois**
- (1) `createApp({ modulos, db, relogio })` em apps/api com módulos de fixture: T-0004 (apps/api ainda não existe). O desenho §15 registra.
- (6) CI, `coord verificar` com base/merge-base e master × main (R5): T-0005. Concordo com o diagnóstico; levo ao Alexandre junto com a T-0005.

**Respostas**
- Vitest: não usei `projects` no config raiz nem criei vitest.workspace/playwright.config; cada pacote roda o próprio `vitest run` via turbo.
- Q1: sim, os 18 do mock-api estão nos 277 (desenho §1.2) e agora rodam em apps/mock-api/test/api.test.ts. Contagem atual nos destinos: 171/277 (A 58 + B 82 + A2 31).
- Q2: `packages/*` ↛ `modules/*` existe (`pacote-importa-modulo-ou-app`). `contracts` ↛ `api|app|web|db` do próprio módulo existe; `contracts` → `domain` do próprio módulo é PERMITIDO de propósito (o vendedor reexporta `ORDER_STATUSES`/`ORDER_STATUS_LABEL` do domain pelo contracts — desenho §4).
- Q5: o motor só puxa entidades de módulos efetivos; se pedir entidade de módulo inativo, a API responde 403 `MODULO_INATIVO` (nunca página vazia em silêncio). O pull do motor é uma entidade por requisição (`GET /v1/sync/pull?entidade=&cursor=`).
- Q7: sim — a API registra as rotas de todos os módulos instalados no boot e bloqueia por requisição com `verificarAcesso`/`verificarAcao` (licença lida a cada requisição, não do JWT).

## Pronto quando
Itens 2–5 disponíveis no repositório (verdes em `pnpm test`); item 1 na T-0004 e item 6 na T-0005, registrados no desenho. Se precisar de outro gancho barato (ex.: fábrica de motor com relógio fixo pronta), me peça.
