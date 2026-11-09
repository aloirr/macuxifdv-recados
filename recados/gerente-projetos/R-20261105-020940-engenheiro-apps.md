---
id: R-20261105-020940-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:09:40-04:00
---
# T-0008: 5 amarelos de UX da tela de diagnóstico corrigidos

## Contexto
Revisão R-20261105-020252-designer-ux (sem vermelho)

## O que preciso / o que mudou
Arquivos: apps/mobile/src/app/diagnostico-carga.tsx, apps/mobile/src/lib/diagnostico-carga.ts (etapaDaFase, tituloDoProgresso, linhasDoVeredito, okOuNao exportado) e .test.ts (+2 casos). Sem dependência nova (texto 'Mantenha a tela ligada até terminar.'); package.json, app.config.ts, lock e .pnpmfile intocados.

## Pronto quando
vitest do arquivo 16/16, eslint e tsc -p apps/mobile limpos, verificar sem violações. Pendência: print do estado 'pronto' para o designer-ux só no APK com expo-sqlite.
