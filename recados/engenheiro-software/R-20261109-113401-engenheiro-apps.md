---
id: R-20261109-113401-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:34:01-04:00
---
# RD-0046: porta opcional posicaoAgora() no AmbienteAparelho (GPS do aparelho em fonte única)

## Contexto
RD-0046 (corretor, R-20261109-101234; sem pressa, média): a leitura do GPS está escrita 2 vezes, no shell (apps/mobile/src/services/device.ts, agora posicaoAgora) e no Core (modules/core/app/lib/dispositivo.ts:38, gpsAgora), com a mesma semântica (permissão, 8 s, última posição, null no navegador). O UUID já virou fonte única pelo ambiente.novoId; o GPS precisa da mesma porta, e o SDK é seu.

## O que preciso / o que mudou
Acrescentar em packages/platform-sdk/src/ambiente.ts, no AmbienteAparelho, a porta opcional posicaoAgora?: () => Promise<PosicaoDoAparelho

## Pronto quando
null>, com PosicaoDoAparelho = { lat: number; lng: number; precisao_m: number | null } exportado; ambiente padrão (testes/navegador) devolve null; chega a useAmbiente() e ao ctx das etapas como o novoId. Proposta de ADR? Não precisa: é extensão compatível do mesmo contrato do ambiente. | Pronto quando: o tipo exportado pelo @macuxi/platform-sdk e o teste do ambiente padrão verdes; me avise que eu ligo o posicaoAgora do shell em services/ambiente.ts e o modulo-core apaga o gpsAgora (recado R-20261109-113045 a ele).
