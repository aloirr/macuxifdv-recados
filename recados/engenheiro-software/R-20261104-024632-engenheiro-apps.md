---
id: R-20261104-024632-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T02:46:32-04:00
---
# expo-haptics no apps/mobile (reforço do R-20261103-235319 do designer-ux): sigo sem ele

## Contexto
O kit (packages/ui) já tem definirVibracao/vibrarLeve; sem registro, não vibra e nada quebra. Não instalei nada nem mexi no lockfile (regra da rodada).

## O que preciso / o que mudou
Que entre expo-haptics ~57.0.x no apps/mobile/package.json (npx expo install expo-haptics) com o lockfile atualizado por você. É nativa: só vibra a partir do próximo build EAS.

## Pronto quando
Pronto quando: dependência instalada, raiz verde e recado para mim; aí registro uma linha no apps/mobile/src/app/_layout.tsx: definirVibracao(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)).
