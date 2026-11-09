---
id: R-20261105-101243-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:12:43-04:00
---
# Revisão final dos testes do lote J: sem 🔴; 🟡 F-07 e R-03b viram vermelhos (defeitos já corrigidos na árvore) — trocar por it no mesmo lote

## Contexto
Revisão final dos testes novos do lote J, árvore de trabalho de 05/11 por volta das 10h. Os arquivos: `tests/integracao/api/farol-t0081.test.ts`, `plano-rv-t0082.test.ts` e `base-recriada-t0079.test.ts`, `tests/integracao/multitenant/onboarding-t0083.test.ts` e `tests/modulos/bko-sem-tabela-aninhada.test.ts`, mais o `esbuild.jsx` do `tests/vitest.config.ts`. Rodei aqui o `bko-sem-tabela-aninhada` (18 verdes). Os de banco só rodam no CI.

**Sem 🔴.** Os testes passam pelo caminho HTTP inteiro, cada um com controle positivo; os `it.fails` estão bem documentados e a espera do horizonte segue a ADR 0009.

- 🟡 T1: os `it.fails` vão ficar vermelhos no CI do lote. O modulo-core já corrigiu dois dos defeitos na árvore:
  - **F-07 (D-T0081a)**: `modules/core/api/farol.ts:110` e `:188` já escolhem a fonte por `plataforma.tenant_modulo`;
  - **R-03b (D-T0082b)**: `modules/core/api/plano-rv.ts:136-143` já usa `on conflict (id) do nothing` e responde 404.

  Com essas correções, os dois `it.fails` passam a falhar. Troque os dois por `it` no mesmo lote das correções; o modulo-core está corrigindo agora, então confira com ele antes.
- **R-08a (D-T0082a)** continua `it.fails`. Pedi ao modulo-core que volte a fonte do `GET rv` para a consulta (🔴 R1 no R-20261105-101212). A correção de verdade depende da plataforma (opção `licenca: 'tenant'` em `consultar`) ou de uma decisão de produto do gerente.
- 🟢 T2 `plano-rv-t0082.test.ts:301`. O R-07 depende do `PLANO_JUNHO` que o R-06 cria. Com `--sequence.shuffle` ou `.only` no R-07, ele falha por outro motivo. Vale um comentário, ou um `expect` de pré-condição no começo do R-07.
- 🟢 T3 `farol-t0081.test.ts:181`. O preparo do F-07 liga a Integração e muda a NF-1-5001 sem `finally`. Hoje ele é o último do arquivo, então não atrapalha. Se entrar caso novo depois dele, desfaça o preparo no fim.
- 🟢 T4 `onboarding-t0083.test.ts:147`. A espera do horizonte está certa (`clock_timestamp()` do fim da carga, depois o horizonte do pull de A, 20 s). O `hookTimeout` de 300 s cobre a espera.

## O que preciso
T1 antes do CI do lote. T2 a T4 ficam a seu critério.

## Pronto quando
F-07 e R-03b como `it` (se as correções do modulo-core entrarem no lote) e R-08a como `it.fails`. Responda a este recado.
