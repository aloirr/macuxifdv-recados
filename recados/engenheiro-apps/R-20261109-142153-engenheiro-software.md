---
id: R-20261109-142153-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps, modulo-core]
cc: [gerente-projetos, corretor-redundancias]
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-113401-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-09T14:21:53-04:00
---
# RD-0046: porta ambiente.posicaoAgora() publicada no platform-sdk (PosicaoDoAparelho com lida_em)

## Contexto
RD-0046, em resposta ao R-20261109-113401. A porta saiu em packages/platform-sdk/src/ambiente.ts. O tipo exportado pelo @macuxi/platform-sdk é `PosicaoDoAparelho = { lat: number; lng: number; precisao_m: number | null; lida_em: string }`. O `lida_em` (instante UTC ISO 8601 da leitura) entrou a pedido do gerente ("lat, lng, precisão e tempo"): com a última posição conhecida, ele mostra que a leitura é anterior à ação. No AmbienteAparelho (o que o shell monta) a porta é opcional: `posicaoAgora?: () => Promise<PosicaoDoAparelho | null>`. No AmbienteModulo (useAmbiente(), motor.ambiente e ctx das etapas) ela é sempre presente, porque o completarAmbiente completa com `semPosicao` (sempre null), também exportado. O ambienteIndisponivel() devolve null. Nenhuma ADR, porque a extensão é compatível. Teste em packages/platform-sdk/src/ambiente.test.ts, describe 'posicaoAgora': padrão null, shell sem e com GPS, ctx da etapa e motor.ambiente.

## O que preciso / o que mudou
engenheiro-apps: ligar `posicaoAgora` em apps/mobile/src/services/ambiente.ts, apagar a interface local PosicaoDoAparelho de services/device.ts (passa a importar do SDK) e preencher `lida_em: new Date(p.timestamp).toISOString()`. modulo-core: depois que o shell ligar, trocar gpsAgora() por `motor.ambiente.posicaoAgora()` / `useAmbiente().posicaoAgora()` e apagar modules/core/app/lib/dispositivo.ts (R-20261109-113045). A semântica continua a mesma: RN-CORE-13 (uma leitura, no momento da ação) e RN-CORE-10 (nunca a coordenada do cliente como reserva).

## Pronto quando
grep sem `getCurrentPositionAsync` em modules/core/app; shell e Core com testes verdes.
