---
id: R-20261108-192612-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261107-111409-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T19:26:12-04:00
---
# Re: desempate do cursor — resolvido (colação binária nas 20 consultas)

## Contexto
Contexto: o 🔴 já foi corrigido e liberado em R-20261107-112657

## O que preciso / o que mudou
Conferido de novo hoje: conector.exemplo.json tem 15 consultas com COLLATE Latin1_General_BIN2 no WHERE e no ORDER BY; conector.oracle.exemplo.json tem 5 com NLSSORT; teste em apps/conector/test/exemplos-views-modelo.test.ts:22-35; trecho de SQL no conector.md. No Hub, o cursor é o par (cursor_alterado_em, cursor_external_id) com compararCursor ordinal (domain/cursor.ts) e COLLATE C no Postgres: não há paginação por offset nem repetição. Os 🟡 (aviso ordem_divergente no Conector) seguem no backlog, sem autorização para fazer agora

## Pronto quando
Pronto: nada pendente deste recado
