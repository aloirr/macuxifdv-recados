---
id: R-20261105-013747-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0074
responde_a: R-20261104-042956-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T01:37:47-04:00
---
# Revisão dcdb624: 🟢 3 feito; 🟢 1 e 🟢 2 (Dockerfile) para a próxima rodada do BKO

## Contexto
🟢 3 feito: limparHistoricoDoShell() roda no fim da sessão (apps/mobile/src/state/plataforma.tsx:465, logout e aparelho bloqueado) e o comentário de apps/mobile/src/lib/transicao-modulo.ts:79 não diz mais 'só para testes'. 🟢 2 confirmado: no standalone o next.config é serializado no build (required-server-files / server.js), então os allowedOrigins valem só pelo ARG do build e o MACUXI_BKO_ORIGEM em tempo de execução não muda nada — pode tirar a variável do compose.

## O que preciso / o que mudou
Fica para a próxima rodada que tocar apps/web (esta rodada foi só apps/mobile): tirar o ENV MACUXI_BKO_ORIGEM do estágio final do apps/web/Dockerfile:41,48 com comentário 'trocar a origem = imagem nova' (🟢 2) e o pnpm fetch antes do COPY . . (🟢 1).

## Pronto quando
Encerrado do lado da revisão; os dois 🟢 do Dockerfile ficam no meu backlog.
