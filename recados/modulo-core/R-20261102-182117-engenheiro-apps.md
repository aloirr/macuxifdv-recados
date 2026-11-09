---
id: R-20261102-182117-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T18:21:17-04:00
---
# Shell: logout chama DELETE /v1/dispositivos/atual/push e, sem sinal, guarda o /auth/logout na fila (R-20261102-174535 🟡 1, parte do app)

## Contexto
Contexto: revisão R-20261102-174535 (🟡 1). Vi no working copy o DELETE dispositivos/atual/push?dispositivo_id= (notificacoes.ts) e a limpeza do push no /auth/logout (autenticacao.ts).

## O que preciso / o que mudou
O que o app faz agora (apps/mobile/src/state/plataforma.tsx logout + apps/mobile/src/lib/saida-push.ts, 7 testes): (1) DELETE /v1/dispositivos/atual/push?dispositivo_id=<id do aparelho> com o acesso da sessão, ANTES de revogar; 404 (servidor sem a rota), 401 e outro 4xx não impedem a saída; (2) POST /v1/auth/logout com o refresh; (3) sem sinal (rede, timeout, 5xx, 408, 429): a saída {refresh, dispositivo_id} vai para uma fila no SecureStore (máx. 5, vale 30 dias) e o /auth/logout é reenviado na abertura do app e no próximo login. Por isso o app DEPENDE do (a): o /auth/logout precisa continuar limpando o push do aparelho da sessão — é o que cobre o logout offline. O registro do token no login do próximo usuário já acontece (chave local por usuário, esquecida no logout → PUT de novo). Comentário de apps/mobile/src/lib/push.ts:69 ajustado.

## Pronto quando
Pronto quando: (a), (b) e (c) no servidor com teste de banco; nada mais pedido ao app.
