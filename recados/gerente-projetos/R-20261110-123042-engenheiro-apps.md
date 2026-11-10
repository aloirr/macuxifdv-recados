---
id: R-20261110-123042-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:30:42-04:00
---
# T-0147 (shell): galeria só para o PDV, registro no Core e visualizador /foto-pdv; testes verdes; bundle Gestão espera correção do Core

## O que fiz (shell, apps/mobile)
- **Galeria só para as fotos do PDV**: `escolherFotoDaGaleria()` em `apps/mobile/src/services/camera.ts` (`launchImageLibraryAsync`, uma foto, `exif: false`), com a MESMA redução 1600 px e regravação JPEG 80 da câmera (descarta EXIF/GPS), em `fotos/<uuid>.jpg`; câmera e galeria compartilham `gravarReduzida`. Sem dependência nova.
- **Registro só no Core**: `registrarCameraNosModulos` registra `definirCapturaFotoPdv({ camera, galeria })` e `definirAbrirFotoPdv(abrirFotoPdv)` por detecção de nome no `@macuxi/core/app`; Promotor, Pesquisa e a fachada do checkout seguem só com a câmera (teste).
- **Visualizador** (imagem aprovada, quadro 3): rota `/foto-pdv` (`apps/mobile/src/app/foto-pdv.tsx`), regra em `apps/mobile/src/lib/foto-pdv.ts`, carga em `apps/mobile/src/services/foto-pdv.ts` (ligada em `state/plataforma.tsx` e no Stack de `app/_layout.tsx`): arquivo local primeiro (abre sem sinal), senão `GET /v1/arquivos/:id` com o token, só em memória (`data:` URI de JPEG; nada em disco nem em log; serve aos sensíveis do Gestão com `no-store`); "Sem sinal para abrir a foto." / "Não foi possível abrir a foto.".
- O `apagarAoEnviar` dos sensíveis é do Core no `enfileirarArquivo` (o SDK já tem); passei a assinatura ao modulo-core (R-20261110-121912).

## Testes
- `apps/mobile/src/services/camera.test.ts` (4: galeria reduz/JPEG 80/sem EXIF/destino, galeria cancelada = null, câmera com a mesma regravação, galeria só no Core) e `apps/mobile/src/lib/foto-pdv.test.ts` (7: rota, UUID, fontes, sem sinal, base64 e JPEG).
- apps/mobile: tsc verde, eslint dos arquivos tocados limpo, vitest 48 arquivos / 454 testes verdes. Bundle Campo verde (2174 módulos). **Bundle Gestão vermelho por arquivo do modulo-core** (`modules/core/app/telas/cliente.tsx:214-215`, JSX lado a lado sem fragmento, mudança dele em curso): recado 🔴 R-20261110-122948; refaço quando ele corrigir.

## Pendências
1. Core: exportar `definirCapturaFotoPdv` e corrigir o cliente.tsx; o diário dele já diz "push de foto para v1.0.4" — então a captura câmera/galeria só aparece na ficha quando o Core ligar; o visualizador da fachada já liga (ele registrou `definirAbrirFotoPdv`).
2. Roteiro no aparelho (foto da galeria chegando ao bucket em JPEG): só com o APK.
3. Fica para a v1.0.4: menu ⋮ › "Trocar foto" do quadro 3 (conflita com o `podeEnviarFoto` do desenho §2: o vendedor só envia o que falta) — decisão do dono do produto/designer.
4. Parecer do corretor e revisão do designer-ux/engenheiro-software ainda não pedidos por mim para a T-0147 (peço agora).
