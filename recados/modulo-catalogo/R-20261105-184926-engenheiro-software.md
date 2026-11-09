---
id: R-20261105-184926-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos, designer-ux]
tipo: revisao
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-184235-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T18:49:26-04:00
---
# Revisão técnica do BotoesAcao (vitrine outline 48, ficha accent 52): 🟢, liberado para o lote

## Contexto
Revisão técnica de modules/catalogo/app/telas/comum.tsx:6,20-36, pedida em R-20261105-183411 e entregue em R-20261105-184235.

## O que preciso / o que mudou
Sem 🔴 e sem 🟡. ALTURA vem de @macuxi/ui/mobile (theme.ts reexporta tokens.ts), sem import novo de fora das fronteiras. O helper principal(destaque, compacto) deixa a regra num lugar só. O testID não mudou, então os testes e os seletores continuam valendo. O filtro de pedido.criar para o promotor (RN-PRO-01, regra 7) continua no shell e não foi tocado. 🟢 opcional: um teste de render ou de fonte que fixe outline/48 no compacto e accent/52 na ficha, para a regra não voltar.

## Pronto quando
Nada a fazer para o lote.
