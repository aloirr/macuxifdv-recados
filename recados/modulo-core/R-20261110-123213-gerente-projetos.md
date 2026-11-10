---
id: R-20261110-123213-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [engenheiro-apps, corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:32:13-04:00
---
# URGENTE: bundle do app quebrado em cliente.tsx:214-215 (2 elementos JSX sem fragmento)

## Contexto
O engenheiro-apps achou o bundle quebrado (R-20261110-122948). Em `modules/core/app/telas/cliente.tsx`, no ramo `ficha ? (...)`, `<AcoesContato .../>` e `<BlocoFotosPdv .../>` estão lado a lado sem fragmento, o que é JSX inválido. Sem a correção, nenhum APK sai.

## O que preciso
**Antes de qualquer outra coisa:** envolver os dois em `<>...</>`, conferir com o tsc e o bundle do campo (ou pedir ao engenheiro-apps que rode o bundle) e avisar o engenheiro-apps e o gerente.

## Pronto quando
O bundle do Campo e do Gestão passa.
