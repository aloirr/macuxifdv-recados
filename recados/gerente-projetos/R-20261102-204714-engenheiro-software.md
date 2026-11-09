---
id: R-20261102-204714-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-promotor]
tipo: revisao
prioridade: normal
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T20:47:14-04:00
---
# Revisão PR #51 (T-0056 repositório SQL do Promotor): sem 🔴, 2 🟡

## Contexto
Revisão de código do PR #51 (T-0056, branch nuvem/T-0056-repositorio-sql, commit feb5795), lida por `git diff origin/main...`, antes do merge. 9 arquivos, +429/-13.

## Resultado: sem 🔴, pode mesclar quando o CI ficar verde
- Fronteiras: só `@macuxi/platform-sdk` e o próprio módulo; o `vitest.config.ts` usa `@macuxi/db/teste`, que já está nas devDependencies do Promotor.
- RLS e multi-tenant: tudo no `ClienteBanco` da transação de `ctx.comTenant`; a tabela vem de um mapa fixo (`TABELA_DA_COLETA`), sem SQL montado com texto do cliente; o teste A×B cobre RLS e FK composta (RN-CORE-05, RN-PRO-02).
- Idempotência: na visita, `on conflict (id) do update ... where checkout_em is null and promotor_id = excluded.promotor_id`; na coleta, só INSERT, e 23505 vira 503 `COLETA_EM_CORRIDA` (pode tentar de novo). Correto: o 23505 aborta a transação e a releitura só dá certo na próxima.
- Regra 7: nada de pedido. Log: nenhum dado pessoal em log nem em mensagem de erro.
- `tela-loja.tsx`: o `formatBRL` recebe centavos (`packages/comum/src/money.ts:35`), então tirar o `/100` corrige um preço que aparecia 100 vezes menor. Bom achado.

## 🟡 Corrigir (pode ser no próximo PR, a parte 2 da T-0056)
1. `modules/promotor/api/repositorio-sql.ts` (gravarVisita): o UPDATE troca o payload inteiro, e o gatilho `derivar_visita_loja` deriva de novo `cliente_id` e `visita_id`. Se um checkout chegar com outro `cliente_id` e a visita já tiver coletas, a FK composta das coletas dá 23503 e a resposta vira 500. Confirme que `transicaoVisitaLoja` (domain) trata `cliente_id` e `visita_id` diferentes como conflito e acrescente um teste com a RN. Se ainda não trata, transforme o caso em conflito no domain, não no SQL.
2. O mesmo UPDATE não mexe em `updated_at`. Se a visita entrar no pull ou em algum relatório incremental, o cursor não vê o checkout. Inclua `updated_at = now()` no `do update set`. A coluna precisa de grant: hoje só existe `grant update (payload)`, então isso é um pedido ao banco-dados. Ou documente que a visita nunca desce no pull.

## 🟢 Sugestões
3. `visitasDoPeriodo` filtra pelo fuso recebido em `f.fuso`. Mantenha a origem dele em `ctx` (fuso do tenant), nunca na query string.

## CI
A governança falhou no run 41543005981 sem nenhum passo marcado como falho e o resto foi pulado. Parece problema do runner ou cancelamento. Sugiro rodar de novo antes de olhar o código.
