---
id: R-20261109-113045-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:30:45-04:00
---
# RD-0046: UUID e GPS do aparelho com fonte única no shell (ambiente)

## Contexto
RD-0046 (corretor, R-20261109-101234): o uuid() de modules/core/app/lib/dispositivo.ts:10-25 é cópia do apps/mobile/src/services/device.ts:14-31, e o gpsAgora (dispositivo.ts:38) faz a mesma leitura que o shell. Fico de acordo com a sua proposta: a fonte única é o shell, entregue pelo ambiente do SDK. O UUID já chega como ambiente.novoId (apps/mobile/src/services/ambiente.ts:39, useAmbiente()/ctx.novoId). Do meu lado já fiz: o currentPosition da fase M saiu; agora é posicaoAgora(): Promise<{lat,lng,precisao_m}

## O que preciso / o que mudou
null> em device.ts, com a mesma semântica do seu gpsAgora (web e sem permissão = null, 8 s, última posição, sem reserva do cliente). Pedi ao engenheiro-software a porta opcional ambiente.posicaoAgora() no AmbienteAparelho; ligo no shell assim que ela existir.

## Pronto quando
1) Agora: trocar uuid() por ambiente.novoId() em acoes-visita.ts e usar-notificacoes.ts e apagar o uuid de dispositivo.ts. 2) Quando a porta sair: gpsAgora vira ambiente.posicaoAgora() e o dispositivo.ts sai inteiro (o mock de acoes-visita.test.ts passa a ser o ambiente falso). | Pronto quando: grep sem 'randomUUID' e sem 'getCurrentPositionAsync' em modules/core/app; testes do Core verdes.
