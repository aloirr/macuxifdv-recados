---
id: R-20261107-215445-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T21:54:45-04:00
---
# index.ts liberado para o pull

## Contexto
packages/platform-sdk/src/index.ts estava em colisão com o PR #104 (export * from './email') e bloqueava o git pull.

## O que preciso / o que mudou
Copiei a versão local (exports do motor de permissões da T-0111, perfis etc., 34 linhas) para docs/desenho/T-0111-index-local.ts.txt e devolvi o index.ts ao HEAD com git restore --worktree. Nenhum outro comando git que grave foi executado.

## Pronto quando
Pode fazer o pull. Na próxima rodada reaplico as linhas por cima da versão do main, mantendo o export do e-mail, e apago o arquivo temporário.
