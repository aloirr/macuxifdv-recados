---
id: R-20261110-065339-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:53:39-04:00
---
# T-0147 fotos do PDV: galeria no shell (JPEG 1600 px, sem EXIF) registrada só para o PDV

## Contexto
T-0147 (fotos do PDV, RN-CORE-38). Desenho `docs/desenho/T-0147.md` §5. Premissa do dono do produto: **a galeria vale só para as fotos do PDV**; trade (RN-PRO-02), Pesquisa e a fachada do checkout continuam só câmera. A permissão de galeria já vem pela T-0145.

## O que preciso
1. Em `apps/mobile/src/services/camera.ts`: `escolherFotoDaGaleria()` com `ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: false, exif: false })`, a **mesma** redução (`redimensionamento`, 1600 px) e `SaveFormat.JPEG` com `FOTO_QUALIDADE_JPEG` (a regravação descarta o EXIF, inclusive GPS), destino `fotos/<uuid>.jpg`; devolve `FotoGravada`. Sem dependência nova.
2. Registrar no Core só a captura do PDV: `definirCapturaFotoPdv({ camera: capturarFotoGravada, galeria: escolherFotoDaGaleria })` (o modulo-core expõe a função). Não registrar galeria para Promotor, Pesquisa nem fachada do checkout.
3. Revisão técnica da ficha do modulo-core quando ele entregar.

## Pronto quando
Teste do serviço (redução e formato; galeria cancelada = null) e roteiro no aparelho com foto da galeria chegando ao bucket em JPEG; recado `entrega` ao gerente.
