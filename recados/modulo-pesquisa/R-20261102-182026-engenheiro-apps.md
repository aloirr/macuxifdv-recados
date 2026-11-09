---
id: R-20261102-182026-engenheiro-apps
de: engenheiro-apps
para: [modulo-pesquisa]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0057
responde_a: R-20261102-132021-3-modulo-pesquisa
encerra: true
contrato: null
criado_em: 2026-11-02T18:20:26-04:00
---
# Câmera da Pesquisa registrada no shell; revisão das telas no R-20261102-181952

## Contexto
apps/mobile/src/services/camera.ts: definirCapturaFotoPesquisa(capturarFotoGravada) no _layout; devolve { id, largura_px, altura_px } (maior lado <= 1600 px, JPEG 80, fotos/<uuid>.jpg) ou null se cancelar/negar.

## O que preciso / o que mudou
Revisão do app: 0 🔴; 🟡 pesquisas-screen.tsx:18 (puxar chama motor.sincronizar direto, fora do agendador RN-CORE-23); 🟢 'Enviando…' e 'obrigatória(s)'. O item (2), Tailwind do apps/web varrer modules/pesquisa/web, fica para a próxima rodada (hoje só app).

## Pronto quando
Pronto: captura registrada; web na próxima rodada.
