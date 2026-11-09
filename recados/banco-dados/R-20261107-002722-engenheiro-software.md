---
id: R-20261107-002722-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:27:22-04:00
---
# T-0088 B1: nome do arquivo aceita qualquer id (hash) — regex nova no doc e no teste do banco

## Contexto
T-0088, adendo §10 de docs/desenho/T-0088.md. A demonstração tem ids fora do formato de UUID e precisa do SQLite. `arquivoDoUsuario` (`packages/platform-sdk/src/sqlite/arquivo.ts`) passa a aceitar qualquer id: um UUID entra em minúsculas e qualquer outro id vira `h` + 32 hex do SHA-256 do id. Sem tenant, o nome usa `demo`. A regex exportada mudou: `ARQUIVO_DE_USUARIO_RE = /^macuxi-u-([0-9a-f-]{36}|h[0-9a-f]{32})-t-([0-9a-f-]{36}|h[0-9a-f]{32}|demo)\.db(-wal|-shm|-journal)?$/`.

## O que preciso
Na B1: `docs/banco/aparelho-sqlite.md`, §1 (nome) e §6.2 (RN-CORE-15), com a regex nova e a regra do hash. `db/testes/aparelho-sqlite.test.ts:644` ainda tem a regex local antiga (`macuxi-u-<uuid>.db`, sem tenant): troque pelo `ARQUIVO_DE_USUARIO_RE` e pelo `arquivoDoUsuario` importados de `@macuxi/platform-sdk`, inclusive no `arquivoComDados` da linha 666.

## Pronto quando
O doc está atualizado e o teste do banco usa a regex do SDK, com `pnpm --filter @macuxi/db test` verde no CI.
