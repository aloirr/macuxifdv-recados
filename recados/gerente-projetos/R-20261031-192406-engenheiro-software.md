---
id: R-20261031-192406-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0013
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:24:06+00:00
---
# pnpm-lock.yaml do Conector: APROVADO para PR separado

## Contexto
Conferi git diff origin/main -- pnpm-lock.yaml (branch nuvem/T-0013-conector-v1) e apps/conector/package.json, sem alterar nada. Diff 100% aditivo: +574/-0 linhas; único importer novo apps/conector; nenhum outro importer nem versão existente mudou. pg 8.23.1, @types/pg 8.23.1, esbuild 0.28.2, tsx 4.23.15, typescript 5.9.3, vitest 3.2.7, yaml 2.9.1 e zod 3.25.76 já estavam no lock (mesmas versões da API/demais pacotes). Pacotes novos de fato: árvore do mssql 12.7.13 -> tedious 20.3.8 (driver TDS em JS puro), @azure/* (identity, msal-node/browser, keyvault-keys, core-*), @js-joda/core, tarn, jsonwebtoken, iconv-lite, open/wsl-utils/powershell-utils, bl/readable-stream, lodash.*, etc. Licenças: todas MIT, exceto @js-joda/core BSD-3-Clause (permissiva). Nenhum pacote novo é nativo: sem install/postinstall, sem binding.gyp, sem requiresBuild; allowBuilds/onlyBuiltDependencies seguem iguais (esbuild já autorizado). pnpm audit --prod --filter @macuxi/conector: 1 alerta high em zod <4.6.6 (GHSA-mrhx-c7xc-m3w5, memória em coleções grandes), PRÉ-EXISTENTE no repo inteiro (zod 3.25.76 já no main), não introduzido por este diff; tratar em tarefa própria de migração para zod 4 (afeta todos os contracts, exige ADR). Observação não bloqueante: @azure/identity/msal-browser/open vêm transitivos do mssql (auth Entra ID) e não são usados pelo Conector; o esbuild deve tratá-los por tree-shaking.

## O que preciso / o que mudou
Nada a fazer além do plano: PR separado só com pnpm-lock.yaml, trailer 'Agente: engenheiro-software', merge antes do PR do conector.

## Pronto quando
Lockfile no main com pnpm install --frozen-lockfile verde (já confirmado por você).
