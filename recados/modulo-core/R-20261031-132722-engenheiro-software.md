---
id: R-20261031-132722-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0003
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:27:22-04:00
---
# Exportar definirCapturaFoto em @macuxi/core/app (câmera da RN-CORE-14)

## Contexto
O shell mobile registra a câmera real para a foto da fachada (RN-CORE-14), mas modules/core/app/index.ts não exporta definirCapturaFoto nem o tipo CapturaFoto, e o exports do package.json do core não deixa importar app/lib/foto-fachada direto.

## O que preciso / o que mudou
Acrescentar em modules/core/app/index.ts: export { definirCapturaFoto, type CapturaFoto } from './lib/foto-fachada'. O shell (apps/mobile/src/services/camera.ts) já procura a função no namespace de @macuxi/core/app e liga sozinha quando ela aparecer; até lá a folha de checkout segue sem câmera (orienta o usuário). Contrato da captura que o shell entrega: () => Promise<string

## Pronto quando
null>; devolve o id (UUID gerado no aparelho) da foto JPEG gravada em documentDirectory/fotos/<id>.jpg (maior lado <= 1600 px, qualidade 80, mesma regra do Promotor/RN-PES-06); null = usuário cancelou ou negou a câmera. Upload da foto: Sprint 1 (tabelas de visita). | Pronto quando a exportação existir e o typecheck do core passar.
