---
id: R-20261031-115533-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0004
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:55:33-04:00
---
# T-0004 entregue: createApp com os 8 módulos, shells com os 8, EAS dev client, horizonte do pull e evento faturado

## Contexto
T-0004 (caminho crítico da Sprint 0). Desenho `docs/desenho/T-0004.md`; ADRs 0006 (API modular, rotas declarativas, horizonte do pull) e 0007 (despacho da outbox com `macuxi_worker`).

## O que fiz
1. **apps/api (novo)**: `createApp` (Fastify) monta os 8 módulos pelo manifesto (`src/modulos.ts`; módulo sem `moduloApi` entra só pelo manifesto). Toda rota: 401 → licenças lidas por requisição + `modulosEfetivos` → 403 `MODULO_INATIVO` (corpo do contrato do Core) → RN-PRO-01 (promotor nunca toca rota de pedido, mesmo de leitura e em outro módulo) → ação/perfis 403 `PERFIL_SEM_ACESSO` → Zod 400 → carteira 403 `FORA_DA_CARTEIRA`; 422 com código RN; 404 sem revelar existência. Banco: `comTenant` do `@macuxi/db` com o tenant do token e papel `macuxi_app`; a API não sobe com outro papel/superusuário/BYPASSRLS. Outbox na transação (`tx.publicar`). Plataforma: `/v1/saude`, `/v1/me/modulos` (pronto aqui), `/v1/sync/pull` e `/v1/sync/push`. Portas falham fechado (sem Core Fase 2 ninguém autentica). `pnpm --filter api dev` sobe na 8100.
2. **platform-sdk**: `definirModuloApi`, `RotaModulo`, `ContextoRota`, `ProvedorSync`, `ErroRegraNegocio`, `ErroNaoEncontrado`, rotas públicas só do Core com limite de tentativas; espelho do Treinamento atualizado (admin + ações; consome `vendedor.pedido.faturado@1`).
3. **Shells**: web e mobile instalam os 8 (`lib/instalados.ts` puro + `lib/modulos.ts`); variantes Campo/Gestão só montam módulos com `apps.<variante>`; extensão de exemplo (card do Treinamento em `inicio.cards`) aparece só com o módulo ativo (teste). `next build` verde.
4. **EAS**: `campo`/`gestao` = build de desenvolvimento (dev client, APK interno; `expo-dev-client ~57.0.20`), `*-preview` = APK sem Metro, `*-producao` = AAB; ícone por variante no `app.config.ts`. Comandos no desenho §7.
5. **Pendências T-0002 §6**: (3) cursor × transação longa RESOLVIDO (horizonte = min(início da transação aberta mais antiga, now()−2 s); teste concorrente no Postgres); (4) login: rotas públicas com limite obrigatório; o Core não ecoa o tenant antes da senha; (1) e (2): SQL pedido ao banco-dados.
6. **Evento faturado**: `vendedor.pedido.faturado@1` (próprio, não `retorno_erp@1`), payload `{ pedido_id, vendedor_id, faturado_em, parcial, itens[produto_id, quantidade] }`, em `.coord/contratos/eventos.md`; recados a treinamento, vendedor e integração.
7. Inbox: revisões T-0005 (verificar), T-0008 (desenho) e T-0009 sem 🔴, respondidas com --encerra; engines '>=22.13'; ADR 0003 corrigida (ponte); comentário do ci.yml; `api#test` sem cache no turbo; `apps/mock-api/test/api.test.ts` passa a esperar "cancele no ERP" em vez de "duplique" (mudança do Vendedor pela decisão do cancelamento após envio; o 409 continua).
Testes: platform-sdk 88, api 37 (5 com Postgres), mobile 7, web 9. Raiz: lint (fronteiras ✔), typecheck e test verdes; `verificar engenheiro-software` OK.

## Pendências
- **banco-dados** (R-20261031-113939): migração 0003 — `macuxi_worker` NOBYPASSRLS com políticas, `evento_consumo`, colunas `usuario_id`/`request_id` em `plataforma.evento`, índice `carteira_usuario_sync_ix`. Depois eu ligo as colunas no `gravarEvento` e escrevo o despachante (com o primeiro consumidor real + pg-boss, ADR 0007).
- **modulo-core, T-0003 Fase 2** (R-20261031-114021): `servicos.autenticar` (JWT), `servicos.carteira` (RN-CORE-04), `rotasPublicas` de login/refresh sem ecoar o tenant, provedores de pull das entidades do Core. `/v1/me/modulos` já está pronto.
- **Contrato travado (T-0007)**: o schema e o `publica` de `vendedor.pedido.faturado@1` só entram em `modules/vendedor/contracts` e `manifest.ts` depois do merge da T-0007 (recado R-20261031-114025 ao vendedor).
- **Alexandre (com você)**: `eas login` com acesso à organização `macuxifdv` (ou `eas init` no projeto dele, trocando `owner`/`projectId`), rodar `cd apps/mobile; eas build --profile campo --platform android` e `--profile gestao`; arte do ícone da Gestão (hoje igual ao Campo). Não rodei build EAS daqui (sem conta).
- Premissas: limite de tentativas em memória (uma instância); horizonte supõe que só `macuxi_app` grava tabelas sincronizadas; `/v1/me/modulos` ficou na plataforma, não no Core.

## Pronto quando
Revisão do gerente; quadro/backlog atualizados; commit da rodada pelo gerente.
