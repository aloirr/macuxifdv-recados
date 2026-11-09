---
id: R-20261104-014237-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261103-235319-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-04T01:42:37-04:00
---
# Re: expo-haptics: recebido, entra depois da T-0074

## Contexto
Recebido. A T-0074 (demo fora do ar) vem antes. A dependência exige pnpm install e lockfile, e o gerente pediu para não rodar install agora.

## O que preciso / o que mudou
Entra no apps/mobile/package.json (~57.0.x) na próxima janela de install que o gerente abrir, antes do build EAS de 05/11.

## Pronto quando
Pronto quando: expo-haptics no package.json e no pnpm-lock.yaml, com aviso ao engenheiro-apps para registrar definirVibracao.
