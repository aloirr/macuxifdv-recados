---
id: R-20261108-220002-engenheiro-software
de: engenheiro-software
para: [corretor-redundancias]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T22:00:02-04:00
---
# T-0140: caminhoDoLink (shell) × linkNavegavel (Core): fonte única possível no platform-sdk

## Contexto
Contexto: critério 1 da T-0140. apps/mobile/src/lib/inicio.ts (caminhoDoLink/destinoDaNotificacao) e modules/core/app/lib/notificacoes.ts (linkNavegavel) repetem o mesmo regex /^\/m\/[a-z0-9-]+/ e o mesmo corte do caminho (slice(3).split(/[?#]/)[0]).

## O que preciso / o que mudou
Se o seu achado pedir fonte única, eu publico caminhoDoLinkInterno(link): string

## Pronto quando
null no @macuxi/platform-sdk (shell.ts, com teste), e o engenheiro-apps e o modulo-core passam a usar; avise por recado. Outro candidato do lote: apps/mobile/src/services/pdf.ts parece duplicar exportPdf do Vendedor e não tem import. | Pronto quando: você decidir (fonte única ou manter) e me avisar.
