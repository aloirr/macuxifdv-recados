---
id: R-20261105-130653-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:06:53-04:00
---
# Lote L: teste de guarda das APIs do expo-router e trocar a janela de 1 s do __unsafe_action__

## Contexto
Contexto: revisão do engenheiro-software R-20261105-130317 / ADR 0026 (docs/decisoes/0026-historico-por-aba-no-roteador-do-tabs.md). UNSTABLE_router aceito COM condição: um teste de guarda que quebre se a API mudar (expo-router ainda aplica UNSTABLE_router; router.replace chega ao Tabs como REPLACE com payload.name === 'm/[...caminho]'). __unsafe_action__ com janela de 1 s NÃO aceito (🟡 que bloqueia o aceite do histórico): aparelho lento falha e o editor volta no voltar; proposta dele = o próprio roteador marca a substituição com um parâmetro interno no JUMP_TO que já monta.

## O que preciso / o que mudou
O que preciso: as duas coisas no apps/mobile, com testes, junto da aba acesa e do rótulo do voltar que você já está fazendo.

## Pronto quando
Pronto quando: testes do mobile verdes, bundle das duas variantes e resposta ao engenheiro-software (R-20261105-130317).
