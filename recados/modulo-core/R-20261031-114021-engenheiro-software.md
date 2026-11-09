---
id: R-20261031-114021-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0003
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:40:21-04:00
---
# T-0003 Fase 2 liberada: createApp pronto; o Core fornece autenticar, carteira, login e provedores de sync

## Contexto
T-0004 entregou o `createApp` (`apps/api`) e o contrato das rotas no SDK (`packages/platform-sdk/src/api.ts`, ADR 0006, desenho `docs/desenho/T-0004.md` §3–6). A Fase 2 da T-0003 pode começar: o que falta na API é do Core. `GET /v1/me/modulos` JÁ está pronto na plataforma (usa o seu `MeusModulosRespostaSchema` e `erroModuloInativo`; licenças de `plataforma.*` lidas por requisição) — você não precisa implementá-lo.

## O que preciso
Em `modules/core/api/index.ts`, `export const moduloApi = definirModuloApi({ manifesto, rotas, sync, rotasPublicas, servicos })`:
1. `servicos.autenticar(cabecalhos, banco)` → `{ id, tenant_id, perfil } | null` (JWT de acesso 15 min do doc 04; `null` = 401). Sem isso a API inteira responde 401 (falha fechada).
2. `servicos.carteira(usuario, banco)` → `Set<cliente_id> | 'tenant'` (RN-CORE-04 com `escopoDoPerfil`: carteira, equipe, equipes abaixo, tenant), por `banco.comTenant(usuario.tenant_id, ...)`. Sem isso, só analista/assistente/admin veem clientes.
3. `rotasPublicas`: `auth/login` e `auth/refresh` com `limite` (ex.: 5 tentativas/5 min por IP + código da empresa; a API responde 429 `MUITAS_TENTATIVAS`). Pendência 4 da T-0002 §6: use `banco.semTenant` para `plataforma.tenant_por_codigo` e NÃO devolva `nome`/`fuso` do tenant antes de validar a senha; mesma mensagem para código, e-mail ou senha errados.
4. Provedores de pull das entidades do Core (`sync: [{ entidade, puxar }]`): filtrar `updated_at < pedido.ate` (horizonte seguro, §5) e `(updated_at, id) > desde`, ordenar, `limit pedido.limite`, formatar `updated_at` com microssegundos (`to_char(updated_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')`), incluir removidos e filtrar pela carteira (`ctx.carteira()`). Modelo no teste `apps/api/test/banco.test.ts`. O índice `carteira_usuario_sync_ix` foi pedido ao banco-dados.
5. Rotas: escrita sempre com `acao` do manifesto; leitura de cliente com `carteira: (e) => cliente_id` ou `'filtrar_no_dominio'`; erro de regra `ErroRegraNegocio('RN-CORE-..', msg)` → 422; inexistente/fora do escopo `ErroNaoEncontrado` → 404.
Testes: monte `createApp({ modulos, autenticar, licencas, carteira, banco })` como em `apps/api/test/apoio.ts` (fakes) e `banco.test.ts` (Postgres, fixture dois-tenants). Atenção: `modules/core/contracts/**` está travado pela nuvem (T-0007); `api/` não.

## Pronto quando
Login e refresh funcionando na API com os testes de 429 e de "tenant não vaza antes da senha"; `/v1/me/modulos` respondendo com o usuário real do token; T-0003 critérios 1–3 demonstrados.
