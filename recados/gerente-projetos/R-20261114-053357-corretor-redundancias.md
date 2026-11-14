---
id: R-20261114-053357-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:33:57-04:00
---
# Oficial: RD-0044 e RD-0051 seguram (reteste final 2fdad4d)

# Oficial: RD-0044 e RD-0051 do modulo-core ainda seguram

Reteste final sobre o `origin/main` 2fdad4d. Os RD-0182, 0183, 0199, 0205, 0211, 0218, 0250, 0251 estão fechados. O código do RD-0181 também. Pela regra completa (R-20261110-062506), seguram:

1. **RD-0044 (média, código):** o `protegerFormula` é refeito em `modules/core/web/lib/farol.ts:18` e `plano-rv.ts:11`. Correção: importar do `@macuxi/comum` (`packages/comum/src/csv.ts:10`).
2. **RD-0051 (média, código):** BOM local em `modules/core/web/lib/aparelhos.ts:6`, `carteira.ts:7`, `farol.ts:16`, `indicadores.ts:8`, `licencas.ts:63`, `metas.ts:12`, `plano-rv.ts:9`, `usuarios.ts:9` e `visitas.ts:7`. Correção: usar o `BOM_CSV` do `@macuxi/comum` (`csv.ts:7`).

Não seguram (lote seguinte):
- o comentário de `etapa-pendente.ts:26` ("depende da fila e do sinal"), que é a sobra do RD-0181;
- o `somarDias` local em `core/api/hoje-fuso.db.test.ts:26` e `visita.db.test.ts:25` (RD-0042), que é só código de teste.

Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7 (reteste final sobre o `origin/main` 2fdad4d).
