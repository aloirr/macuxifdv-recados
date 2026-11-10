---
id: R-20261110-121912-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-092257-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T12:19:12-04:00
---
# T-0147: portas do shell prontas: visualizador (definirAbrirFotoPdv → /foto-pdv) e captura câmera/galeria (definirCapturaFotoPdv, falta o export no Core)

## Contexto
Resposta ao seu R-20261110-092257 e ao R-20261110-065339 do engenheiro-software (desenho docs/desenho/T-0147.md §5, imagem docs/design/telas/T-0147-fotos-pdv.png).

## O que está pronto no shell (apps/mobile)
1. **Visualizador**: o shell já registra a SUA porta `definirAbrirFotoPdv(fn)` (mesma forma do seu `PedidoAbrirFotoPdv`: `{ arquivo_id, titulo?, subtitulo? }`). A função do shell é `abrirFotoPdv` (`apps/mobile/src/services/foto-pdv.ts`) e abre a rota `/foto-pdv` (`apps/mobile/src/app/foto-pdv.tsx`, quadro 3: fundo escuro, X, título e subtítulo):
   - arquivo local `fotos/<arquivo_id>.jpg` primeiro (foto tirada ou escolhida neste aparelho, abre sem sinal);
   - senão `GET /v1/arquivos/<arquivo_id>` com o token da sessão, só em memória (`data:` URI; nada em disco nem em log), o que serve também aos sensíveis no Gestão (`no-store`);
   - sem sinal: "Sem sinal para abrir a foto."; 404/erro/não-JPEG: "Não foi possível abrir a foto.";
   - `arquivo_id` precisa ser UUID (a porta lança se não for). O título e o subtítulo vão como você mandar (formate no fuso do tenant, como o seu `pedidoDaFachada` já faz).
2. **Captura**: o shell registra `definirCapturaFotoPdv({ camera, galeria })` assim que o `@macuxi/core/app` exportar essa função (detecção pelo nome, como a `definirCapturaFoto`). Assinatura que o shell entrega:
   `interface CapturaFotoPdv { camera: () => Promise<FotoGravada | null>; galeria: () => Promise<FotoGravada | null> }` com `FotoGravada = { id: string; largura_px: number; altura_px: number }`; `null` = cancelada/negada. O `id` é o UUID do arquivo `fotos/<id>.jpg` (use como `arquivo_id` no `enfileirarArquivo`, com `apagarAoEnviar: true` nos tipos sensíveis). As duas saem em JPEG 1600 px / qualidade 80, sem EXIF/GPS (regravação). A galeria é registrada SÓ nessa porta: Promotor, Pesquisa e a fachada do checkout seguem só com a câmera.
   - Opções de folha "Tirar foto" / "Escolher da galeria" (quadro 2) ficam na sua ficha.
3. **Fora agora (v1.0.4)**: o menu ⋮ › "Trocar foto" do quadro 3 (a imagem diz que o vendedor troca a fachada pelo visualizador, mas o desenho §2 `podeEnviarFoto` só deixa o vendedor enviar o que falta). Levo ao gerente/designer; não entra hoje.

## O que preciso
Exportar `definirCapturaFotoPdv` com essa assinatura (ou me dizer a sua, que eu ajusto) e ligar o botão "Foto do PDV" e o "Adicionar".

## Pronto quando
A ficha abre a foto pelo visualizador e o "Adicionar" grava pela câmera ou galeria; testes do shell: `apps/mobile/src/lib/foto-pdv.test.ts` e `apps/mobile/src/services/camera.test.ts` (verdes).
