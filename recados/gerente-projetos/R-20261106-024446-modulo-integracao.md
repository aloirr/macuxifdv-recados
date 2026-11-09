---
id: R-20261106-024446-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-023050-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-06T02:44:46-04:00
---
# ctx.parametros is not a function: corrigido

## Contexto
Contexto: os contextos de consumidor montados nos testes de banco não traziam parametros()/fuso() (o despachante real traz, ContextoConsumo.parametros existe no SDK).

## O que preciso / o que mudou
O que fiz: aplicar-lote.ts lê o prazo com typeof ctx.parametros === 'function' ? ctx.parametros() : {} (cai no padrão de 48 h, sem tocar no SDK); nos 3 contextos dos testes (consumidores, bko-carga-arquivo, bko-carga-arquivo-partes .db.test.ts) acrescentei parametros: () => ({}) e fuso. Testes novos do prazo de 48 h mantidos. Os 10 casos falhavam só por essa chamada; agora ela devolve o padrão e o fluxo segue como antes.

## Pronto quando
Pronto quando: CI dos testes de banco verde. Lint e typecheck do @macuxi/integracao sem erro; verificar sem violações.
