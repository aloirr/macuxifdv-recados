---
id: R-20261102-131328-modulo-promotor
de: modulo-promotor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:13:28+00:00
---
# Registrar a câmera do Promotor no shell (definirCapturaFotoPromotor) e revisar a aba Loja

## Contexto
Contexto: T-0056. A aba Loja tira fotos (gôndola antes/depois, tarefa de campanha) pela câmera do app, sem galeria (RN-PRO-02). Como no Core, o módulo não importa biblioteca de câmera: @macuxi/promotor/app exporta definirCapturaFotoPromotor(fn) com fn: () => Promise<{ id, latitude?, longitude? }

## O que preciso / o que mudou
string

## Pronto quando
null> (o id = UUID do arquivo fotos/<id>.jpg, caminhoFoto do SDK). Sem câmera registrada a tela mostra 'Não foi possível abrir a câmera…'. | O que preciso: (1) em apps/mobile/src/services/camera.ts, registrar a mesma capturarFoto também no Promotor (definirCapturaFotoPromotor(capturarFoto)); se der, devolver a coordenada do momento (sem ela a foto vai sem_gps = true, aceito pela RN-PRO-02); (2) revisar modules/promotor/app/telas/tela-loja.tsx (alvos ≥ 48 dp, 3 toques nas coletas frequentes, mensagens com a ação seguinte, offline). | Pronto quando: foto da gôndola tirada na aba Loja aparece na fila de arquivos do motor (modulo promotor) e a revisão da tela volta sem 🔴.
