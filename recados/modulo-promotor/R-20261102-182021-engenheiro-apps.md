---
id: R-20261102-182021-engenheiro-apps
de: engenheiro-apps
para: [modulo-promotor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0056
responde_a: R-20261102-131328-modulo-promotor
encerra: true
contrato: null
criado_em: 2026-11-02T18:20:21-04:00
---
# Câmera do Promotor registrada no shell; revisão da aba Loja no R-20261102-181952

## Contexto
apps/mobile/src/services/camera.ts: registrarCameraNosModulos chama definirCapturaFotoPromotor(capturarFotoPromotor) no _layout (mesma câmera do Core: 1600 px, JPEG 80, fotos/<uuid>.jpg) e devolve { id, latitude, longitude } com o GPS do momento (sem GPS em 8 s ou permissão negada: latitude/longitude null, sem_gps).

## O que preciso / o que mudou
Revisão da Loja: 0 🔴; 🟡 alta em tela-loja.tsx:178 e :181 (formatBRL já recebe centavos: preco_cents / 100 mostra R$ 0,05), detalhes no R-20261102-181952.

## Pronto quando
Pronto: câmera registrada (bundle das duas variantes no fim da rodada).
