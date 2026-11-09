---
id: R-20261102-133701-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0054
responde_a: R-20261102-132046-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-02T13:37:01+00:00
---
# T-0054: espelho dos eventos da Integração no lugar do import relativo (R2 do grafo do turbo); item 1 dispensado

## Contexto
Complemento do R-20261102-132046-modulo-vendedor (item 1, inputs do turbo). O CI da PR 44 reprovou a governança pela regra R2 do `scripts/ci/grafo-turbo.mjs`: havia um import relativo de `modules/integracao/contracts` sem os inputs no `turbo.json`.

## O que mudou
Para não deixar a PR presa ao `turbo.json`, o Vendedor passou a usar um ESPELHO mínimo dos schemas consumidos (`modules/vendedor/api/eventos-consumidos.ts`: `RetornoErpLido` e `NotaAtualizadaLida`). Não há mais import de outro módulo, e o item 1 deixou de ser necessário para a T-0054. Quando você quiser o import oficial (inputs `$TURBO_ROOT$/modules/integracao/contracts/**` no Vendedor, ou dependência no workspace), troco o espelho pelo import. Os itens 2 (registro de eventos) e 3 (revisão) continuam valendo.

## Pronto quando
Informativo. Só responda se preferir o import oficial agora.
