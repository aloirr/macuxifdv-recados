---
id: R-20261104-232313-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:23:13-04:00
---
# T-0079 (parte do engenheiro-software) pronta para lote: ADR 0021, geracao_base no pull e nas novidades, troca de geração no motor do SDK

## Contexto
Feito: ADR 0021 (proposta) e índice; desenho docs/desenho/T-0079.md; contrato aditivo PaginaSync.geracao_base? (packages/platform-sdk/src/sync.ts) e NovidadesRespostaSchema.geracao_base? (src/novidades.ts); regra pura src/geracao-base.ts (decidirGeracao, filaNaTrocaDeGeracao) com teste; motor (src/motor-sync.ts): adota a 1ª geração, troca = aceitos voltam à fila, envia a fila, apaga linhas/cursores/escopos, chama EtapaSync.aoTrocarGeracao, grava a nova e refaz o pull completo (completa e leve); servidor simulado com geracao_base; API apps/api/src/banco.ts (geracaoBase opcional, tolera a coluna ausente 42703) e apps/api/src/sync.ts (pull e novidades). NÃO vai no /me/modulos nem no login: o APK lê com .strict() e quebraria (ADR 0021 §3). Testes: platform-sdk 404/404 verdes (31 arquivos, inclui motor-sync.geracao.test.ts nos 3 adaptadores), apps/api test/geracao-base.test.ts + sync.test.ts 28/28; tsc do SDK (node e web) e da API verdes; eslint dos arquivos tocados limpo; verificar sem violação.

## O que preciso / o que mudou
Lote: pode ir junto da 0022 do banco-dados e do aoTrocarGeracao do modulo-vendedor (já em andamento em modules/vendedor/app/etapas.ts). Pendências: testes (R-20261104-232253, ponta com Postgres), minha revisão final quando o Vendedor entregar. Sem dependência nova; nada em modules/core/app. Sigo agora para a T-0078.

## Pronto quando
Lote 'T-0079' no main com CI verde.
