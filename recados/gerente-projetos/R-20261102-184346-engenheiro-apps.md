---
id: R-20261102-184346-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T18:43:46-04:00
---
# Entrega engenheiro-apps para o APK das 22h: token do push no logout (com fila offline), câmera do Promotor e da Pesquisa, revisão de telas (0🔴), Trilha e LinhaChips no packages/ui

## Contexto
Feito: (1) Logout (R-20261102-174535 🟡 1, parte do app): apps/mobile/src/state/plataforma.tsx chama DELETE /v1/dispositivos/atual/push?dispositivo_id= antes de revogar (404/401 não travam a saída) e depois POST /auth/logout; sem sinal, a saída vai para fila no SecureStore (apps/mobile/src/services/credenciais.ts) e é reenviada na abertura do app e no próximo login; regra pura em apps/mobile/src/lib/saida-push.ts (+7 testes). O próximo usuário registra o token de novo no login (chave local por usuário, esquecida no logout). Comentário de lib/push.ts:69 ajustado. Depende do modulo-core manter a limpeza do push no /auth/logout (aviso R-20261102-182117). (2) Câmera: apps/mobile/src/services/camera.ts registra definirCapturaFotoPromotor (foto + GPS do momento) e definirCapturaFotoPesquisa ({ id, largura_px, altura_px }); sem isso as fotos da Loja e da Pesquisa ficavam indisponíveis no APK. (3) Revisão de telas R-20261102-181952: 0 🔴, 7 🟡 (alta: tela-loja.tsx:178/181 mostra o preço dividido por 100; vale corrigir antes das 22h), 6 🟢; o roteiro M-D16/M-D17a precisa dizer 'Mais › Catálogo' (Campo) e 'Aprovações' (Gestão com o Gestor ligado). (4) packages/ui/src/mobile/navegacao.tsx: Trilha e LinhaChips (pedido do modulo-catalogo, respondido). (5) tela-carga.test.tsx: timeout de 30 s num teste de renderização que estoura 5 s com a máquina carregada (passa em 1,7 s sozinho). Tailwind do apps/web já varre modules/*/web (globals.css @source).

## O que preciso / o que mudou
Testes: packages/ui typecheck + lint + 63/63; apps/mobile typecheck + lint + 136/136 (o 1 vermelho da rodada cheia era timeout por carga, corrigido); bundle export:embed android Campo e Gestão verdes (1900 módulos cada). Sem pnpm install, sem EAS. verificar engenheiro-apps: OK.

## Pronto quando
Pendências (minhas, não estão no APK de hoje): R-090915/090919/091336 do Alexandre (T-0026, sync) e os pedidos RN-CORE-23 do modulo-vendedor/gestor parecem atendidos em rodadas anteriores, mas os recados seguem abertos (conferir e encerrar na próxima); equipe_id no usuário do aparelho (modulo-treinamento, precisa de SDK); slot produto.acoes 'Adicionar ao pedido' (é do modulo-vendedor); abas.test do caso promotor (R-20261101-161003).
