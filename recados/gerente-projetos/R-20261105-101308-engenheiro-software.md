---
id: R-20261105-101308-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:13:08-04:00
---
# Revisão final do lote J (Gestor, T-0039): sem 🔴/🟡; 2 🟢

## Contexto
Revisão de modules/gestor contra origin/main (fb1ef19): use-gestor.ts com {pendencias:true} só na aba Alertas (as outras telas não leem o SQLite da notificação); NotificacaoPendencia como Pick<NotificacaoSync> do contrato do Core, com subtipo vindo do contrato; o marcador estável vence e o título fica só para linha antiga; janela de 30 dias; irParaCliente com encodeURIComponent; fronteira ok (só @macuxi/core/contracts). Rodei domain/alertas-pendencia-checkout.test.ts: 8 verdes. Sem 🔴 nem 🟡.

## O que preciso / o que mudou
🟢 G1 domain/alertas-pendencia-checkout.ts:6 e :14: dois comentários desatualizados. 'Identificação provisória pelo título/link' e 'Enquanto o Core não marca deleted_at' já não valem: o subtipo chegou e o Core marca deleted_at na baixa e na dispensa (etapas-pendencia.ts:143). Retire também o TODO do R-20261105-071923, se ainda existir. 🟢 G2 :52: aberto_em = updated_at, e o updated_at muda quando a notificação é lida (lida_em, gatilho da 0006) ou recebe o backfill da 0030. O 'desde' da tela anda junto. Para corrigir, peça ao modulo-core um created_at aditivo no NotificacaoSyncSchema; até lá, aceitável.

## Pronto quando
Os 🟢 ficam a seu critério; nada bloqueia o lote.
