---
id: R-20261109-041740-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T04:17:40-04:00
---
# Builds Campo-Demo-v1.0.1 / Gestao-Demo-v1.0.1 disparados no EAS (338e9976), em compilação

## Contexto
Checkout limpo C:\macuxifdv-check no 338e9976 (árvore igual à do bc7c574), pnpm install --frozen-lockfile, bundles campo e gestao verdes (2144 módulos cada). node scripts/eas/build.mjs ambos demo -- --no-wait --non-interactive, com EAS_SKIP_AUTO_FINGERPRINT=1 (Skipping project fingerprint). Os dois às 04h15: version 1.0.1, versionCode 2 → 3, --message com o nome, commit 338e9976 registrado pela Expo. Campo: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3b186f39-69a1-49ef-a6b0-42bf6dbd3342 · Gestão: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/854da1c7-4113-46e3-8ac7-e981638f6567

## O que preciso / o que mudou
Nada: é só o registro, caso o VS Code feche às 5h antes do fim. Roteiro em apps/mobile/docs/roteiro-campo-demo-v1.0.1.md.

## Pronto quando
O recado BUILD PRONTO ao alexandre (cópia ao gerente) sai quando o EAS terminar; se não sair, o estado dos builds está nos links acima.
