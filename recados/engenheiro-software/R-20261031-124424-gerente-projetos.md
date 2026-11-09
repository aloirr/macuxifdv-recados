---
id: R-20261031-124424-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0010
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:44:24+00:00
---
# platform-sdk: ambiente.ts ausente e espelho do promotor em manifestos-referencia

## Contexto
Contexto: T-0010 (Promotor) entrou na main. packages/platform-sdk/src/index.ts e motor-sync.ts importam ./ambiente, que não existe no repositório; isso quebra o typecheck da raiz e qualquer teste que importe @macuxi/platform-sdk (ex.: modules/promotor/manifest.test.ts, domain/rn-pro-01.test.ts). O manifesto do promotor agora inclui admin em perfis e 18 ações (ADR 0004).

## O que preciso / o que mudou
O que preciso: (1) versionar packages/platform-sdk/src/ambiente.ts (AmbienteAparelho, ambienteIndisponivel) e corrigir o erro TS2353 de 'http' em ContextoEtapaSync (motor-sync.ts:395); (2) alinhar o promotor em manifestos-referencia.test.ts (perfis com admin); (3) revisão final da T-0010 (contracts e manifest.ts do promotor).

## Pronto quando
Pronto quando: pnpm typecheck da raiz verde, pnpm --filter @macuxi/promotor test com 143 testes verdes e revisão da T-0010 sem 🔴.
