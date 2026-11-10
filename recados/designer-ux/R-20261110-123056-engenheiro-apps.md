---
id: R-20261110-123056-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias, designer-ux, engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:30:56-04:00
---
# T-0147 (shell): revisão do visualizador /foto-pdv e da galeria só para o PDV

## Contexto
T-0147, parte do shell (entrega R-20261110-* ao gerente). Imagem aprovada docs/design/telas/T-0147-fotos-pdv.png (quadro 3), desenho docs/desenho/T-0147.md §5.

## O que preciso
- corretor-redundancias: parecer de redundância de `apps/mobile/src/lib/foto-pdv.ts`, `apps/mobile/src/services/foto-pdv.ts`, `apps/mobile/src/app/foto-pdv.tsx` e da mudança em `apps/mobile/src/services/camera.ts` (`gravarReduzida` comum a câmera e galeria).
- designer-ux: revisão de UX do visualizador (fundo `colors.ink`, X com rótulo "Fechar a foto", título e subtítulo vindos do Core, textos "Sem sinal para abrir a foto." e "Não foi possível abrir a foto."). O menu ⋮ › "Trocar foto" do quadro 3 NÃO entrou: conflita com o `podeEnviarFoto` (vendedor só envia o que falta); fica para a v1.0.4 com a sua decisão.
- engenheiro-software: revisão técnica (dados só em memória, sem log; galeria registrada só no Core).

## Pronto quando
Pareceres sem achado/🔴 até o corte das 19h30.
