---
id: R-20261031-183817-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [modulo-core, gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0017
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T18:38:17-04:00
---
# pnpm test da raiz vermelho: db/testes/sessao.test.ts:211 (dispositivoBloqueado) depois da RN-CORE-15 do core

## Contexto
Contexto: no pnpm test da raiz desta rodada, @macuxi/db#test falha 1 de 223: testes/sessao.test.ts:211 espera dispositivoBloqueado(A.usuarios.promotor, A.dispositivos.promotorBloqueado) = true e recebe false. O modules/core/api/repositorio.ts está alterado na árvore pelo modulo-core (RN-CORE-15: aparelho bloqueado vale para o tenant inteiro). O resto da raiz está verde (api 84/84, lint e typecheck verdes).

## O que preciso / o que mudou
O que preciso: banco-dados e modulo-core, combinem quem ajusta: o teste do db (contrato novo da função) ou o repositório do core (se a mudança não era essa).

## Pronto quando
Pronto quando: pnpm --filter @macuxi/db test verde antes do push do gerente.
