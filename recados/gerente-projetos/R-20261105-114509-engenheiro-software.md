---
id: R-20261105-114509-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: alta
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T11:45:09-04:00
---
# Revisão final do delta do lote J: sem 🔴 nem 🟡 — lote J liberado; apoio ao job do CI sem superusuário (falta autorização do Alexandre)

## Contexto
Revisão final do delta do lote J depois da R-20261105-101415, com `git diff origin/main` (fb1ef19) na árvore de 05/11, por volta das 11h40. Rodei aqui:
- core: 69 testes verdes;
- vendedor (app/lib e domain): 407 verdes;
- db (dbaas.test.ts): 37 verdes;
- ui (tokens): 19 verdes.

Os testes de banco e de integração só rodam no CI.

Recados aos donos, todos com cópia para você:
- modulo-core: 3 🟢;
- modulo-vendedor: 2 🟢;
- designer-ux: 1 🟢;
- banco-dados: 1 🟢, mais a resposta ao R-20261105-111837.

## O que mudou / resultado
1. **metas.ts, `fontePorConsulta`**: passa `{ licenca: 'tenant' }`, e os 4 usos são GET (ADR 0025). O fonte-licenca-tenant.test.ts e o `it` de admin e analista estão ok. O R1 está fechado e o D-T0082a também; o R-08a já é `it`. Sem 🔴 nem 🟡.
2. **inicio.ts**: decide Integração e Vendedor por `tenant_modulo`, com o mesmo critério do `lerTenant` da API. Com o Vendedor no tenant, nunca usa as notas (RN-CORE-27). Sem 🔴 nem 🟡.
3. **farol.ts**: a fonte vem da licença. **plano-rv.ts**: o PUT de outro tenant dá 404 sem gravar nem auditar. Sem 🔴 nem 🟡.
4. **`core.cadastro_resumo@1`**: os campos são aditivos e opcionais, o emissor antigo continua válido e o teste cobre isso. Atualizei o registro em `.coord/contratos/modulos.md`. O Vendedor ainda não consome o preço mínimo, e por isso o C6 continua `it.fails`, o que está coerente.
5. **Vendedor** (só api, domain e app/lib; as telas ficam para a próxima revisão): o bloqueado real está no receber e no aparelho, o estoque vem do `estoque_saldo` e o rótulo é "Vencido". Sem 🔴 nem 🟡.
6. **db/testes**: com superusuário (CI e PC), nada deixa de rodar.
   - Os helpers só pulam com `adminIgnoraRls === false` ou `local === false`, e campo ausente conta como roda.
   - O CI usa `postgres`@`localhost`.
   - A guarda estática exige o helper.
   - O lgpd-outbox não muda nada com superusuário.
   - O A9 normaliza sem perder precedência.
   - O script tem as travas certas.
   Sem 🔴 nem 🟡.
7. **navegacao.tsx**: a Trilha ficou aditiva e o contraste está testado. Sem 🔴 nem 🟡.
8. **T-0071**: orcamento-ciclo e orcamento-equipe estão ok, com F-07, R-03b e R-08a como `it`. Os `it.fails` que sobram (C6a e C6b) são defeito aberto e coerente. Sem 🔴.

**Pedido R-20261105-111837 (job do CI sem superusuário): apoio.** Proponho que rode em todo escopo `completo`, sem filtro de caminho. Com filtro, o job ficaria `skipped` e o ci-ok ficaria vermelho, a menos que se mexa no escopo.mjs e no jq. Ele entra no `needs` do ci-ok. O custo é um runner paralelo de 6 a 10 min, fora do caminho crítico. A proteção do branch não muda. Detalhes no recado ao banco-dados. Implemento quando o Alexandre autorizar o `.github`.

Atenção no commit: durante a revisão apareceu e depois sumiu o `tests/modulos/zz-tmp-debug-t0052.test.ts`, do testes. Confira que nenhum `zz-tmp-*` entra no commit.

## Pronto quando
**Lote J liberado.** Nada bloqueia. O critério de pronto é o CI do lote verde no branch de verificação, com Postgres com superusuário. Os 🟢 ficam para a próxima rodada.
