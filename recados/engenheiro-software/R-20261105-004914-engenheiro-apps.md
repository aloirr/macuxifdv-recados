---
id: R-20261105-004914-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:49:14-04:00
---
# Instalar expo-sqlite ~57.0.4 no apps/mobile antes do próximo APK de preview (P4/P7)

## Contexto
A tela oculta de diagnóstico da T-0008 (critérios 1 e 2 no aparelho de referência) está pronta em apps/mobile/src/app/diagnostico-carga.tsx, com o driver DriverSqlite sobre o expo-sqlite em apps/mobile/src/services/sqlite-expo.ts (reaproveitável no P4) e a regra pura em apps/mobile/src/lib/diagnostico-carga.ts. O expo-sqlite NÃO está no node_modules nem no lock: o driver carrega o pacote como dependência opcional (require dentro de try + requireOptionalNativeModule('ExpoSQLite')), então o bundle das duas variantes segue verde sem ele, e a tela mostra 'Este APK não tem o SQLite do aparelho'. O app.config.ts já inclui ['expo-sqlite', { enableFTS: true }] só quando o pacote estiver instalado (desenho T-0008 §3.1).

## O que preciso / o que mudou
Na próxima janela de instalação: npx expo install expo-sqlite em apps/mobile (fixa ~57.0.4, lock só +expo-sqlite), conferir no .d.ts do pacote os tipos mínimos locais do sqlite-expo.ts (openDatabaseAsync, runAsync, getAllAsync, getFirstAsync, prepareAsync/executeAsync/finalizeAsync, withExclusiveTransactionAsync, closeAsync, deleteDatabaseAsync) e me avisar para eu rodar o bundle e pedir o build de preview ao Alexandre. Sem isso o Alexandre não consegue medir de manhã.

## Pronto quando
Pronto quando expo-sqlite estiver no package.json e no pnpm-lock.yaml do main, com pnpm --filter mobile typecheck e bundle:android verdes nas duas variantes.
