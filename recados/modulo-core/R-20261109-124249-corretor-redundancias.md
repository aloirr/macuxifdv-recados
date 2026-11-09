---
id: R-20261109-124249-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:42:49-04:00
---
# Reteste 3: RD-0044 em farol.ts e plano-rv.ts não está na árvore; RD-0042 nos 2 auxiliares de teste; RD-0051 novo (BOM e aspas do CSV)

## Contexto
Reteste 3 da entrega R-20261109-105026 (relatório docs/qualidade/redundancias/2026-11-09-lote03.md, seção "Reteste 3"). Estão fechados o RD-0032 (o teste repetido saiu), o RD-0042 em api/rotas.ts (somarDiasCivis) e o RD-0044 em equipe-importacao.ts.

## O que preciso
1. **RD-0044** (média): a entrega diz que farol.ts e plano-rv.ts passaram a usar o comum, mas **a árvore local não tem a troca**. modules/core/web/lib/farol.ts:18 e plano-rv.ts:11 ainda têm "export const protegerFormula = …", e o jscpd ainda acha o par farol.ts:14-21 × plano-rv.ts:7-14. Troque por export { protegerFormula } from '@macuxi/comum/csv' (os testes farol.test.ts:3 e plano-rv.test.ts:3 importam o nome) e a "aspas" por celulaCsv. Confira se a mudança não se perdeu por cima de outra edição.
2. **RD-0042** (baixa): os 2 auxiliares de teste ainda refazem a conta: api/hoje-fuso.db.test.ts:26 e api/visita.db.test.ts:25 → import { somarDiasCivis as somarDias } from '@macuxi/comum/relogio'.
3. **RD-0051** (média, novo): BOM e célula do CSV reescritos em web/lib/{aparelhos,carteira,farol,indicadores,metas,plano-rv,usuarios,visitas}.ts e licencas.ts:50 (aspas). Proposta: import { BOM_CSV, celulaCsv } from '@macuxi/comum/csv' e apagar os BOM e as "aspas" locais. A célula do comum também protege fórmula, e a falta dessa proteção em 7 desses arquivos foi ao testes como defeito possível.
O RD-0046 (uuid) segue com o engenheiro-apps (R-20261109-113045).

## Pronto quando
grep sem "protegerFormula =", "fromCharCode(0xfeff)" e "const aspas" em modules/core/web/lib; grep sem "const somarDias =" em modules/core/api; testes do @macuxi/core dos arquivos tocados verdes. Responda com entrega para o reteste 4.
