---
id: R-20261107-092018-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: revisao
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:20:18-04:00
---
# Revisão final T-0092: sem 🔴; 1 🟡 (comentário do ajv no openapi.test.ts) e 3 🟢

## Contexto
Revisão final da T-0092 no working tree: plataforma (SDK, API, ADR 0030, lock) e módulo Integração (rota pública, §15, devDependencies). Pedida no R-20261107-085223.

## Parecer: sem 🔴. A T-0092 está liberada para o lote.
Executado agora, sem cache do turbo:
- `turbo lint typecheck` e `test` de `@macuxi/integracao`, `@macuxi/platform-sdk` e `api`: verdes, 6/6 e 3/3, sem timeout. Testes de banco pulados localmente, como de praxe.
- `pnpm install --frozen-lockfile --lockfile-only --offline`: lock em dia, sem alteração.

**Critérios**
1. 🟢 `GET /integracao/v1/openapi.json`: público, com `Cache-Control: public, max-age=3600`, ETag SHA-256, 304 por `If-None-Match` (aceita `W/`, lista ou `*`) e 429 `MUITAS_TENTATIVAS` a 60/min por IP. Não passa por token nem licença. Não sai nada de tenant nem de pessoa:
   - a rota recebe `ctx.cabecalhos` vazio e `comTenant` lança (`apps/api/src/app.ts`, `acessoSemTenant`);
   - o corpo é o `openapi-hub-v1.json` puro;
   - o `publico.test.ts` barra `tenant_id` e chave `mxc_`;
   - os exemplos usam `@example.com` e o CNPJ fictício `11222333000181`.
2. 🟢 `ajv ^8.20.0`, `ajv-formats ^3.0.1` e `tsx ^4.23.15` são devDependency do `@macuxi/integracao`, e o lock está aceito.
3. 🟢 A §15 do `docs/modulos/integracao/hub-api.md` está escrita.
4. 🟢 Os testes de documento desatualizado continuam no CI: `openapi.test.ts:371` (arquivo igual ao gerado) e `publico.test.ts:10` (rota igual ao arquivo). Ambos rodam no job `testes-pacotes` (`turbo run test`). O cache do `@macuxi/integracao#test` usa `$TURBO_DEFAULT$`, que cobre `docs/openapi-hub-v1.json` e `contracts/`. Uma mudança em qualquer um deles invalida o cache, então o teste não é pulado. O verde no GitHub só se confirma no push.

**Remoção da rota autenticada `GET /v1/integracao/openapi`:** 🟢 não quebra nada.
- Nenhum código, teste ou doc chama a rota; o `grep` só a encontra no histórico da ADR 0030.
- O portal pedia `/integracao/openapi.json`, que vira `/v1/integracao/openapi.json` e nunca existiu (404 "em breve").
- O engenheiro-apps já está trocando para `OPENAPI_HUB.viaProxy`, com rewrite própria no `next.config.ts`. Isso está no working tree e não fez parte desta revisão.
- O `tests/integracao/api/openapi-publico-t0092.test.ts`, do testes, cobre a API real com os 8 módulos: o 404 da rota antiga e o Conector intacto.

## Ajustes (dono: modulo-integracao)
- 🟡 `modules/integracao/api/openapi/openapi.test.ts:6-7`: o comentário diz que `ajv` e `ajv-formats` "NÃO estão no package.json do módulo" e que declará-las "é proposta". Isso deixou de ser verdade. Troque por "devDependency do módulo (T-0092)".
- 🟢 `docs/modulos/integracao/hub-api.md` §15: a sub-bullet "Nota" repete o limite, o ETag e o 304 que já estão em "Como baixar" e "Cache". Dá para fundir. "7 rotas do `/integracao/v1`" ficou ambíguo agora que o `openapi.json` mora no mesmo prefixo; sugiro "as 7 rotas do Hub (o próprio openapi.json fica fora)".

## Para o gerente
- 🟢 A ADR 0030 abre uma exceção à regra 6 do CLAUDE.md, que exige licença em toda rota, só para documento público de módulo. Falta registrar a ciência do dono do produto em `docs/status`, como está no histórico da tarefa.
- 🟢 Pelo proxy do BKO, o limite de 60/min por IP vale por IP real só com `X-Forwarded-For` confiável (`MACUXI_TRUST_PROXY`). Na demo já está `uniquelocal`. Sem isso, os usuários do BKO dividem a cota, o que é aceitável para um download raro.

## Pronto quando
O 🟡 é corrigido junto do lote e não precisa de nova revisão. O CI do push precisa ficar verde.
