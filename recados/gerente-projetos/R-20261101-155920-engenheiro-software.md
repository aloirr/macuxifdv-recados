---
id: R-20261101-155920-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:59:20-04:00
---
# T-0032 (desenho, ADR 0013, pedido ao banco, revisão PR #24/#25) e T-0035 item 2 (ctx.fuso) entregues; rotas esperam a migração

## Contexto
Passada do engenheiro-software na T-0032 (desenho, banco, revisões) e na T-0035 item 2 (ctx.fuso), como pedido: parei no desenho, no ctx.fuso e nas revisões. Nenhuma rota do Hub foi implementada (espera a migração do banco-dados). Não toquei caminho travado pela nuvem (T-0033) nem apps/mobile, apps/web, packages/ui.

## O que fiz
1. **ctx.fuso() (T-0035)**: `ContextoBase.fuso(): string` no platform-sdk; `fusoDoTenantOuPadrao`/`FUSO_PADRAO_TENANT` (America/Manaus, nunca lança) em `packages/platform-sdk/src/fuso.ts`; a API lê `plataforma.tenant.fuso` junto com as licenças (`apps/api/src/licencas.ts`) e entrega no contexto (`apps/api/src/app.ts`). Sem dependência nova (o SDK não depende de @macuxi/comum; mesmo valor do DEFAULT_TZ). Recado ao modulo-vendedor (cc testes): R-20261101-154851.
2. **Desenho T-0032**: `docs/desenho/T-0032.md` (ordem, quem mexe em quê, pipeline, rotas A2–A6, consumidores A7/A8, BKO A9 com a decisão da inativação passo a passo, parâmetros, banco, matriz de testes por critério, pendências).
3. **ADR 0013 (proposta — preciso do seu OK)**: `docs/decisoes/0013-rotas-de-conector-chave-por-conector.md` — `ModuloApi.conector = { autenticar, antes, rotas }`, montado em `/<modulo>/v1` por plugin encapsulado; plataforma: falhas por IP, teto de corpo/elementos, licença do tenant, Zod, erros no formato do Hub; módulo: chave/IP, taxa, tamanho por parâmetro, 426 como pausa. Outbox como fila (`integracao.lote.recebido@1`), pepper no .env com falha fechada, OpenAPI depois.
4. **Registro**: `integracao.lote.recebido@1` (interno) em `.coord/contratos/eventos.md`.
5. **Banco**: R-20261101-154937 ao banco-dados (cc modulo-integracao): spec do R-013336 renumerada para 0010/0011 + `conector.entidades`, unique parcial do P-7, `autenticar_chave` com entidades, ids inválidos por sessão, external_id ≤ 200, `inativacao_auditoria` append-only (+ `inativadas`), `pedido_retorno_erro` (+ `pedido_retorno_id`), `pendencia_inativacao.decidida_por_perfil`.
6. **Revisão PR #24 (T-0027) e PR #25 (T-0031)**: 🟢 sem 🔴 nos dois (R-20261101-155028, cc você). 🟡: external_id > 200 nos erros do Hub; corpo do 409 de topologia em `detalhes`; `inativadas` na auditoria. **Decisão para você/Alexandre**: sequência repetida em `itens_faturados` ainda recusa o retorno inteiro (400), contra o espírito da P-4.
7. Respostas ao modulo-integracao: R-20261101-155052 (desenho do Hub / ADR) e R-20261101-155058 (rotas A5/A9).

## Arquivos
packages/platform-sdk/src/{fuso.ts,fuso.test.ts,api.ts,index.ts}; apps/api/src/{app.ts,licencas.ts}; apps/api/test/{app.test.ts,banco.test.ts}; docs/desenho/T-0032.md; docs/decisoes/0013-rotas-de-conector-chave-por-conector.md; .coord/contratos/eventos.md; .coord/diario/engenheiro-software.md.

## Testes
platform-sdk: typecheck, lint e 301 testes verdes (fuso.test.ts novo). api: typecheck, lint e testes verdes (bloco ctx.fuso no app.test.ts; banco.test.ts confere A = America/Manaus, B = America/Sao_Paulo com Postgres). `coord verificar engenheiro-software`: sem violações.

## Pendências
- OK do gerente no desenho T-0032 e na ADR 0013 (status "proposta").
- Próxima onda (depois da migração): tipos do SDK + pipeline em apps/api (eu), handlers (modulo-integracao), testes (testes).
- Premissas: padrão do fuso America/Manaus (antes, o Vendedor caía em America/Sao_Paulo; a coluna é not null, então só muda com fuso inválido); a migração fica com os números 0010/0011 se ninguém usar antes; a regra "uma entidade por Conector" fica na API com advisory lock por tenant (sem constraint de array no banco); OpenAPI fora da T-0032.
