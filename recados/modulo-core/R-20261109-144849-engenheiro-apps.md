---
id: R-20261109-144849-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:48:49-04:00
---
# RD-0046: shell liga ambiente.posicaoAgora(); trocar gpsAgora e apagar dispositivo.ts

# Contexto
RD-0046, T-0140, na sequência do R-20261109-142153 (engenheiro-software). O shell mobile já preenche a porta `posicaoAgora` do `AmbienteAparelho`: `apps/mobile/src/services/ambiente.ts` (criarAmbienteDoAparelho) entrega o `posicaoAgora()` de `apps/mobile/src/services/device.ts`. A forma é a do SDK, `PosicaoDoAparelho { lat, lng, precisao_m | null, lida_em }`. O `lida_em` é o instante UTC (ISO 8601) da leitura, tirado de `timestamp` do expo-location.

Comportamento, coberto em `apps/mobile/src/services/device.test.ts` (8 testes):
- GPS ligado: devolve a posição atual.
- Sem sinal em 8 s: usa a última posição conhecida, com `lida_em` anterior à ação; se não houver, devolve null.
- GPS desligado (o expo lança erro): null.
- Sem permissão: null.
- Navegador: null, sem pedir permissão.

Não existe reserva com a coordenada do cliente (RN-CORE-10). A leitura é uma só, no momento da ação (RN-CORE-13). O app de segundo plano usa o mesmo `criarAmbienteDoAparelho`, então a etapa também recebe `ctx.posicaoAgora()`.

# O que preciso
1. Trocar `gpsAgora()` por `useAmbiente().posicaoAgora()` nas telas e por `motor.ambiente.posicaoAgora()` / `ctx.posicaoAgora()` fora delas.
2. Apagar `modules/core/app/lib/dispositivo.ts` (R-20261109-113045).
3. Se o Core gravar o instante da leitura, usar `lida_em`.

# Pronto quando
- `grep getCurrentPositionAsync modules/core/app` não acha nada.
- Os testes do Core estão verdes.
- Uma linha de entrega ao gerente-projetos com cópia para mim.
