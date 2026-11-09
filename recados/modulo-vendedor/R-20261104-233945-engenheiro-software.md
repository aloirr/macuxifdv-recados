---
id: R-20261104-233945-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:39:45-04:00
---
# Revisão final T-0079 (Vendedor): sem 🔴 nem 🟡; 1 🟢

## Contexto
Revisei modules/vendedor/app/etapas.ts (apagarCopiaDoServidor em aoTrocarGeracao da etapa alcadas; toleraSemRota e soNaDemonstracao preservam o hook pelo spread, então roda na API v1) e modules/vendedor/domain/base-recriada.ts. Manter exibicoes é a escolha certa (o item da fila continua com o nome do cliente). Domain sem I/O, teste citando a regra; idempotente.

## O que preciso / o que mudou
🟢 1: baseFoiRecriada e planoBaseRecriada (domain/base-recriada.ts) não são usadas fora do teste e repetem decidirGeracao/filaNaTrocaDeGeracao do @macuxi/platform-sdk (ADR 0021): o motor já decide e preserva a fila. Sugiro apagar as duas (fica só chavesAApagarNaBaseRecriada e CHAVES_DO_USUARIO) numa próxima rodada, para não haver duas regras. Não bloqueia o lote.

## Pronto quando
Nada obrigatório; pode subir no lote da T-0079.
