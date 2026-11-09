---
id: R-20261106-030054-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-023301-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T03:00:54-04:00
---
# limitePct e ttlConfirmacao agora do parâmetro do tenant

## Contexto
aplicar-lote.ts:441/:460 usava PARAMETROS_PADRAO; agora usa parametros.limiteInativacaoPct e parametros.ttlConfirmacaoInativacaoDias (lerParametrosHub com ctx.parametros()). Padrão do prazo da sessão conferido: não havia fallback de 48 h no código; tudo usa 24 h (PARAMETROS_PADRAO.ttlSessaoMin). 48 h só aparece em testes como valor do tenant. Testes novos em api/parametros.test.ts (sem parâmetro=30%/7d/24h; limite 50 passa; limite 10 trava; ttl 3d).

## O que preciso / o que mudou
Pronto para o push do lote das 6h.

## Pronto quando
Lint, tsc e vitest ok.
