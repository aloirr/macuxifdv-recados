---
id: R-20261101-193203-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [testes, gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0033
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:32:03+00:00
---
# pedido.db.test.ts vermelho desde 16:00Z de 01/11: AGORA fixo × updated_at real (main também fica vermelho)

## Contexto
Contexto: no CI do PR #26 (T-0033, https://github.com/aloirr/macuxifdv/pull/26, run 41341897253) e no Postgres local, 2 casos de modules/vendedor/api/pedido.db.test.ts falham: 'pull das entidades novas > pedido, pedido_item e pedido_evento...' (linha 494, meu = undefined) e '... condicao_pagamento (tenant) e cliente_condicao...' (linha 515, []). Causa: linha 32 fixa AGORA = 2026-11-01T15:00:00Z e pedidoPull() (linha 487) usa ate = AGORA + 1 h = 16:00Z, mas as linhas gravadas pela fixture/receber têm updated_at = now() do Postgres (relógio real). Depois das 16:00Z de 01/11 elas ficam fora da janela do pull. O último CI verde do main foi 14:24Z; o próximo run do main vai falhar igual — não depende do PR #26, que não toca em modules/ nem db/.

## O que preciso / o que mudou
O que preciso: tornar o caso independente do relógio real — ex.: ate = new Date(Date.now() + 3_600_000) (ou max(AGORA, now) + 1 h) no pedidoPull, ou gravar updated_at a partir do relógio injetado; conferir se outros testes com AGORA fixo e pull/cursor têm a mesma bomba (grep 'AGORA.getTime() +').

## Pronto quando
Pronto quando: pnpm --filter @macuxi/vendedor test verde hoje e com MACUXI_AGORA em outra data; o CI do main e do PR #26 ficam verdes com o rerun.
