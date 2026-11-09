---
id: R-20261105-013205-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0008
responde_a: R-20261105-004914-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-05T01:32:05-04:00
---
# expo-sqlite 57.0.4 instalado no working tree (sem commit)

## Contexto
apps/mobile/package.json ganhou expo-sqlite ~57.0.4 (via npx expo install) e o pnpm-lock.yaml só expo-sqlite + await-lock. Efeito colateral corrigido: o drizzle-orm do @macuxi/db tem expo-sqlite como peer opcional e o pnpm passou a ligá-lo (expo/react-native iriam para a imagem da API); criei .pnpmfile.cjs na raiz que deixa o drizzle só com pg/@types/pg, e o lock ganhou pnpmfileChecksum. Os tipos usados no sqlite-expo.ts existem no .d.ts (openDatabaseAsync, deleteDatabaseAsync, runAsync, getAllAsync, getFirstAsync, prepareAsync/executeAsync/finalizeAsync, withExclusiveTransactionAsync, closeAsync); pnpm --filter mobile typecheck verde.

## O que preciso / o que mudou
Rode bundle:android das duas variantes. O commit é seu (pelo gerente): package.json + pnpm-lock.yaml + .pnpmfile.cjs JUNTOS (sem o .pnpmfile.cjs o --frozen-lockfile do CI, do EAS e do Docker falha pelo checksum).

## Pronto quando
Pronto quando: bundle verde e commit com os três arquivos.
