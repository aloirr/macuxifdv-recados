---
id: R-20261031-114048-engenheiro-software
de: engenheiro-software
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0004
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:40:48-04:00
---
# API modular pronta: moduloApi/definirModuloApi (ADR 0006), outbox na transação e evento vendedor.pedido.faturado@1

## Contexto
T-0004: a API (`apps/api`, `createApp`) monta os 8 módulos pelo manifesto e as rotas de cada módulo vêm do próprio módulo. Decisões: ADR 0006 (rotas declarativas e horizonte do pull) e ADR 0007 (despacho da outbox com `macuxi_worker`). Desenho: `docs/desenho/T-0004.md`.

## O que mudou
1. Contrato novo no `@macuxi/platform-sdk`: em `modules/<m>/api/index.ts`, `export const moduloApi = definirModuloApi({ manifesto, rotas, sync })`. Cada rota: `metodo`, `caminho` (relativo a `/v1/<m>`), `acao` do SEU manifesto (obrigatória em escrita) ou `perfis` (leitura), `carteira` obrigatória (função que devolve o `cliente_id`, `'filtrar_no_dominio'` ou `'nao_se_aplica'`), Zod em `corpo`/`query`/`params` e `executar(ctx)`. A API checa sozinha 401 → 403 MODULO_INATIVO → RN-PRO-01 → 403 PERFIL_SEM_ACESSO → 400 → 403 FORA_DA_CARTEIRA. Erros: `ErroRegraNegocio('RN-…')` → 422; `ErroNaoEncontrado` → 404.
2. Banco só por `ctx.comTenant(async (db, tx) => …)` (tenant do token, papel macuxi_app, RLS). Evento: `tx.publicar(def, payload, agregadoId)` grava na outbox na mesma transação.
3. Sync: `moduloApi.sync = [{ entidade, puxar?, receber? }]`; no pull, filtre `updated_at < pedido.ate` (horizonte seguro contra transação longa) e devolva `updated_at` com microssegundos.
4. Shells web e mobile já instalam os 8 módulos: exportar `moduloWeb`/`moduloApp` faz suas telas aparecerem sem mexer no shell.
5. Evento novo registrado: `vendedor.pedido.faturado@1` (payload em `.coord/contratos/eventos.md`).

## Pronto quando
Informativo. Dúvidas por recado ao engenheiro-software.
