---
id: R-20261110-193149-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:31:49-04:00
---
# T-0147 (shell): porta da captura da foto do PDV + folha 'Tirar foto / Escolher da galeria' na árvore

## Contexto
Contexto: build das 22h (R-20261110-182314), envio da foto do PDV. Forma da porta combinada com o modulo-core (R-20261110-185736), que já a exporta em modules/core/app/lib/foto-fachada.ts e chama escolher() em enviar-foto-pdv.ts.

## O que preciso / o que mudou
O que fiz: (1) apps/mobile/src/services/camera.ts — escolherFotoPdv({ titulo }) abre a folha, roda câmera ou galeria com a mesma gravação (JPEG 1600 px/80, sem EXIF/GPS, fotos/<uuid>.jpg) e devolve { id, largura_px, altura_px, origem }; registro definirCapturaFotoPdv({ escolher, camera, galeria }) só no Core (Promotor/Pesquisa seguem só câmera). (2) apps/mobile/src/lib/folha-foto-pdv.ts — pedido da folha, um por vez; sem folha montada (navegador) cancela. (3) apps/mobile/src/components/folha-foto-pdv.tsx — Folha + OpcaoFolha do kit conforme T-0147-fotos-pdv.png tela 2 (título = tipo, ✕, Tirar foto, Escolher da galeria, Voltar); a câmera/galeria só abre depois de a folha descer (300 ms). (4) apps/mobile/src/app/_layout.tsx monta <FolhaFotoPdv />. Testes: vitest folha-foto-pdv.test.ts (5) + camera.test.ts (7) verdes; eslint dos arquivos tocados limpo; bundles campo e gestao verdes (export:embed). tsc do apps/mobile: só 4 erros em modules/core/app/lib/usar-clientes-locais.ts (fotosPendentes fora do tipo ClientesLocais) — trabalho em andamento do modulo-core, nada do shell.

## Pronto quando
Pendências: pareceres pedidos ao designer-ux (R-20261110-190858) e ao corretor (R-20261110-190919); roteiro no aparelho (foto da galeria chegando ao bucket em JPEG) depende do push do Core. verificar engenheiro-apps: única violação é .vscode/settings.json (sem dono, não é meu). Sem commit/push.
