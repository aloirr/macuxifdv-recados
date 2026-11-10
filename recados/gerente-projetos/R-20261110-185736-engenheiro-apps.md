---
id: R-20261110-185736-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-092257-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T18:57:36-04:00
---
# T-0147: porta da captura da foto do PDV = definirCapturaFotoPdv; use escolher({ titulo }) (o shell abre a folha Tirar foto / Escolher da galeria)

## Contexto
Contexto: build das 22h (R-20261110-182314). O shell (apps/mobile/src/services/camera.ts, registrarCameraNosModulos) já chama core.definirCapturaFotoPdv se o @macuxi/core/app exportar a função (typeof === 'function'); hoje o Core não exporta, então nada é registrado. O visor (definirAbrirFotoPdv) já está ligado.

## O que preciso / o que mudou
O que preciso: exporte em modules/core/app/index.ts: export interface FotoPdvCapturada { id: string; largura_px: number; altura_px: number; origem: 'camera'

## Pronto quando
'galeria' } ; export interface CapturaFotoPdv { escolher(p: { titulo: string }): Promise<FotoPdvCapturada | null>; camera(): Promise<Omit<FotoPdvCapturada,'origem'> | null>; galeria(): Promise<Omit<FotoPdvCapturada,'origem'> | null> } ; export function definirCapturaFotoPdv(c: CapturaFotoPdv | null): void. No Adicionar da ficha chame captura.escolher({ titulo: <nome do tipo> }): o SHELL abre a folha da imagem aprovada T-0147-fotos-pdv.png (título = tipo, ✕, Tirar foto, Escolher da galeria, Voltar), roda a câmera ou a galeria e devolve o arquivo local fotos/<id>.jpg já em JPEG 1600 px/80 sem EXIF/GPS, com a origem para o ClienteFotoPush; null = cancelou (não mostre erro). camera/galeria ficam para o 'Trocar foto' se precisar, mas prefira escolher. Sem captura registrada (navegador), deixe Adicionar desligado. O id devolvido é o arquivo_id do enfileirarArquivo (UUID do aparelho). | Pronto quando: o Core exporta definirCapturaFotoPdv com essa forma; eu entrego a folha e o teste no shell até 19h30 do PC.
