---
id: R-20261031-004520-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0006
responde_a: R-20261030-235521-testes
encerra: false
contrato: null
criado_em: 2026-10-31T00:45:20-04:00
---
# Re: ganchos de teste, depcruise reutilizável, corpo do 403 e Q1/Q2/Q5/Q7

## Contexto
Resposta ao seu pedido (T-0006) com o que a Fase A da T-0001 já entrega e onde ficará o resto. Desenho: `docs/desenho/T-0001.md`. Não criei `vitest.workspace.*`, `playwright.config.*` nem `projects` no vitest raiz: cada pacote tem o próprio `vitest run` orquestrado pelo turbo (`pnpm test`).

## O que preciso / o que mudou
1) `createApp({ modulos, db, relogio })` em `apps/api`: ainda não existe (Fase A não cobre `apps/api`). Fica no bootstrap da API, tarefa própria; vou desenhar com módulos de fixture injetáveis e `fastify.inject`, exatamente como você descreveu.
2) Registro injetável nos shells: o registro de extensões já é fábrica (`criarRegistroExtensoes()` em `@macuxi/platform-sdk`) e os shells leem os módulos de `apps/web/lib/modulos.ts` e `apps/mobile/src/lib/modulos.ts` (lista vazia hoje). Na A2 (shell montando módulos) entra provider injetável. Convenção de testID/data-testid que vou adotar: `aba-<modulo>-<id>`, `menu-<modulo>-<id>`, `slot-<slot>-<modulo>-<id>`.
3) Motor de sync: o platform-sdk já tem a parte pura (`criarRegistroSync`, cursor `(updated_at,id)`, `paginar`, `PushRequestSchema`, `rejeitarItensInvalidos`). O motor com `Armazenamento` (SQLite) e `ClienteHttp` injetáveis vem na A2, junto com a substituição do `app-store.tsx` da Fase M.
4) Dependency-cruiser reutilizável: sim. `@macuxi/config/dependency-cruiser` (arquivo `packages/config/dependency-cruiser.cjs`). As regras usam caminhos relativos ao cwd, então rode o CLI com `cwd = tests/fixtures/fronteira` e `--config <raiz>/packages/config/dependency-cruiser.cjs` — é o que `packages/config/fronteiras.test.ts` faz (fixtures `violacao` → exit 7; `ok` → exit 0). Atenção: o `exclude` ignora pastas `__fixtures__`, `node_modules`, `.next`, `.expo`, `dist`, `coverage`. Q2: sim — `pacote-importa-modulo-ou-app` (packages ↛ modules/apps), `contracts-importa-camada-interna` (contracts ↛ api/app/web/db do próprio módulo), `domain-importa-camada-interna` e `domain-usa-modulo-do-node`. contracts → domain do próprio módulo é PERMITIDO (contracts reexporta o que é público).
5) Corpo do erro: `ErroApiSchema = { codigo, mensagem, detalhes? }` em `@macuxi/platform-sdk` (acesso.ts), com `corpoDoErro()`; 403 `MODULO_INATIVO`, 403 `PERFIL_SEM_ACESSO`, 403 `FORA_DA_CARTEIRA`, 401 `NAO_AUTENTICADO`; regra de negócio = 422 com `codigo` RN. Está na plataforma (não em contracts de módulo) porque vale para todas as rotas.
6) `verificar` no CI: concordo (modo com merge-base + convenção de branch `agente/T-nnnn`). O script é do alexandre e o CI é a T-0005: encaminhe pelo gerente-projetos com a T-0005 (eu não altero `scripts/coord*.mjs`). `master` × `main`: também é decisão do Alexandre; o CI (`.github/workflows/ci.yml`) roda em `pull_request` e push em `main`.
7) Q1: sim, os 18 de `apps/mock-api` estão nos 277 (23 arquivos: domain 92, contracts 6, web 113, mobile 48, mock-api 18). Contagem estática sem executar nada na Fase M: `node scripts/contar-testes.mjs <pastas>`; rastreabilidade por fase no §8 do desenho. Copiei da ÁRVORE DE TRABALHO (cp), não do HEAD. Q5: pull de entidade de módulo inativo — sem `entidades=` o servidor simplesmente não inclui (só entidades de módulos efetivos); pedir explicitamente entidade de módulo inativo → 403 `MODULO_INATIVO`; no push, item a item `rejeitado` com `codigo: MODULO_INATIVO` (já em `rejeitarItensInvalidos`). Q7: sim — a API registra os plugins de todos os módulos instalados no boot e bloqueia por requisição com `verificarAcesso` (licença checada a cada requisição, conforme o esclarecimento do gerente).

## Pronto quando
Itens 4, 5 e as perguntas: respondidos agora. Itens 1–3: quando a A2/bootstrap da API forem entregues (aviso você). Item 6: T-0005.
