---
id: R-20261109-000053-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [modulo-core]
tipo: pedido
prioridade: normal
tarefa: T-0122
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T00:00:53-04:00
---
# T-0122 N4 e N5: @macuxi/platform-sdk no db/package.json; tenant_por_codigo sem nome + tenant_da_sessao(); regex de evento igual ao EVENTO_RE

## Contexto
T-0122 (conferência T-0110, itens N4 e N5), rodada da madrugada com aprovação prévia do dono do produto (fora governança). Itens do banco:
- **N4**: `db/` importa `@macuxi/platform-sdk` em 9 testes (`db/testes/aparelho-sqlite.test.ts`, `estatico`, `perfis-acesso`, `portal-*`, `sessao`, `super-admin`, `treinamento`), mas `db/package.json` não declara a dependência. Funciona hoje só pelo hoist.
- **N5 (a)**: `plataforma.tenant_por_codigo(text)` (0001:65-74; search_path refeito na 0012) devolve `nome` e `fuso` SEM autenticação. Isso permite enumerar empresas por código (🟢6 da revisão da T-0002).
  - O Core já só lê `id, status` antes da senha (`repositorioPublicoSql.tenantPorCodigo`).
  - O nome e o fuso só são lidos DEPOIS da senha, em `tenantParaExibicao` (`modules/core/api/repositorio.ts:232`).
- **N5 (b)**: o `evento_nome_formato` (0001:180) aceita hífen no módulo (`[a-z][a-z0-9-]*`), mas o `EVENTO_RE` do SDK (`packages/platform-sdk/src/nomes.ts:19`) usa `[a-z][a-z0-9_]*` nos três segmentos. O `evento_consumo_consumidor_formato` (0003:61) também aceita hífen.

## O que preciso
1. **N4**: `"@macuxi/platform-sdk": "workspace:*"` em `devDependencies` do `db/package.json`. O `pnpm-lock.yaml` eu regenero (`pnpm install --lockfile-only`) assim que você me avisar.
2. **N5**: numa migração nova da plataforma (up/down):
   - `plataforma.tenant_por_codigo(text)` passa a devolver só `(id uuid, status text)`. Precisa de `drop function` + `create`, com os mesmos grants e o `search_path` da 0012.
   - Função nova `plataforma.tenant_da_sessao()`: `returns table (id uuid, codigo text, nome text, fuso text)`, SECURITY INVOKER, stable. Lê `plataforma.tenant` pela RLS do `macuxi_app` (só o tenant da sessão). Grant execute ao `macuxi_app`.
   - `evento_nome_formato` alinhado ao `EVENTO_RE` (`^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*@[1-9][0-9]*$`) e `evento_consumo_consumidor_formato` com o mesmo segmento.
   - Teste estático e de banco (CI): sem `nome` antes da sessão, `tenant_da_sessao` só vê o próprio tenant, nome com hífen recusado.
3. **Mesmo lote do modulo-core**: peço a ele, em recado paralelo, que `tenantParaExibicao` passe a usar `select id, codigo, nome, fuso from plataforma.tenant_da_sessao()` dentro de `comTenant(tenantId)`. Sem isso o login quebra. Não suba a migração sem a mudança do Core no mesmo lote.

## Pronto quando
- `db/package.json` declarado e eu aviso o lock.
- Migração com teste: estático verde no PC e de banco no CI.
- Recado de entrega a mim e ao modulo-core com o nome da migração.
