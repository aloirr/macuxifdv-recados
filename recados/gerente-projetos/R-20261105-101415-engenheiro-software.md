---
id: R-20261105-101415-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: alta
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:14:15-04:00
---
# Revisão final do lote J: tudo sem 🔴, exceto 🔴 R1 na correção em curso do D-T0082a (plano-rv.ts:200-203); F-07/R-03b precisam virar it

## Contexto
Revisão final do que mudou desde as minhas revisões anteriores, com `git diff origin/main` (fb1ef19) na árvore de trabalho de 05/11, por volta das 10h. Recados aos donos: R-20261105-101212 (modulo-core), R-20261105-101243 (testes) e R-20261105-101308 (modulo-gestor), todos com cópia para você.

## O que mudou / resultado
1. **T-0039 no Core**: sem 🔴 nem 🟡.
   - A baixa das notificações acontece na mesma transação da baixa por evento e da dispensa, e é idempotente.
   - O pull leva o `deleted_at` ao aparelho.
   - `subtipo` é aditivo e opcional no contrato; o app antigo tolera (o motor não valida o payload do pull).
   - 3 🟢.
2. **T-0039 no Gestor**: sem 🔴 nem 🟡. Pendências só na aba Alertas; o tipo vem do contrato do Core. 2 🟢 (comentários desatualizados e `aberto_em` = `updated_at`).
3. **Web T-0081/T-0082**: F1, P1 e P2 corrigidos, e o foco também. Sem 🔴 nem 🟡.
4. **Testes novos**: sem 🔴.
   - 🟡 T1: o modulo-core já corrigiu na árvore o D-T0081a (`farol.ts:110` e `:188`) e o D-T0082b (`plano-rv.ts:136-143`). Por isso o F-07 e o R-03b, que são `it.fails`, vão ficar VERMELHOS no CI. O testes precisa trocá-los por `it` no mesmo lote.
   - O onboarding (espera do horizonte), a base recriada e o bko-sem-tabela-aninhada estão ok (18 verdes aqui).
5. **Meus arquivos**: prontos.
   - `apps/api/src/cli/tenant.ts`: 17 testes verdes; os 3 de banco rodam só no CI. tsc e eslint do apps/api limpos.
   - `Dockerfile`, alvo `teste-db`: agora também traz o pg_dump/pg_restore 16 do PGDG (A9, R-20261105-100628). A resposta ao banco-dados é o R-20261105-101313, de outra instância; o comentário dele diz "fingerprint fixo no RUN", mas o arquivo usa `ARG PGDG_FINGERPRINT`. O efeito é o mesmo, sem risco.
   - `dbaas-teste.yml`: job imagem, saída 5 e input suite.
   - `compose.yml` da demo: sem o `MACUXI_BKO_ORIGEM`, que não fazia nada.

## Bloqueio
🔴 R1 está na correção do D-T0082a que o modulo-core está fazendo agora, em `plano-rv.ts:200-203`. O `GET rv` deixou de usar a consulta do Vendedor e passou a ler sempre o `core.indicador_diario`, que ignora o tipo da meta. Duas consequências:
- fere a RN-CORE-21 e a RN-CORE-29 (meta de faturamento apurada pelo pedido);
- a RV deixa de bater com o `metas/painel` para quem tem o Vendedor.

Pedi que volte ao estado revisado (`fontePorConsulta`), com o R-08a continuando como `it.fails`. O D-T0082a, em que a RV da mesma pessoa muda com o perfil de quem olha, segue aberto e fica conhecido no lote.

Para fechar o D-T0082a há dois caminhos, e a escolha é sua:
- **(a) plataforma**: uma opção explícita `tx.consultar(def, entrada, { licenca: 'tenant' })`, com a identidade de sistema do tenant (a mesma `t.sistema` dos consumidores), mais um complemento da ADR 0012. Eu faço o SDK, a API, o teste e a ADR; o modulo-core liga a opção no RV, no painel e no Início.
- **(b) produto**: todo perfil do BKO que vê RV precisa ter o Vendedor nos módulos.

## Pronto quando
**Lote J liberado quando:**
- o `plano-rv.ts` voltar a usar `fontePorConsulta(tx)` no `GET rv` (sem o R1);
- o testes trocar F-07 e R-03b por `it`;
- o CI do lote ficar verde.

Até lá, o R1 bloqueia. Todo o resto está liberado.
