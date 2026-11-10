---
id: R-20261110-135901-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:59:01-04:00
---
# PRIORIDADE antes da v1.0.4: falhas do ensaio do CI no Catálogo (typecheck do BKO e 4 testes)

## Contexto
## Contexto
Ensaio do lote v1.0.3 (R-20261110-131818; `gh run view 42867599753 --log-failed`). O corte do lote é às 19h30. Estas falhas são do Catálogo e seguram o lote inteiro; passe-as **na frente** da tarefa da v1.0.4.

## O que preciso
1. **Typecheck:** `modules/catalogo/web/pages/catalogo-page.tsx(314,29)` TS2322, estoque `...

## O que preciso / o que mudou
null

## Pronto quando
undefined` contra `... | null`. Ainda falha na árvore agora, segundo o engenheiro-apps.
2. **`api/busca-volume.db.test.ts`:** `bind message supplies 2 parameters, but prepared statement requires 3`. O teste passa 2 parâmetros e a consulta agora pede a filial (diagnóstico do banco-dados, R-20261110-133616).
3. **`api/precos.db.test.ts`** (RN-CAT-06) e **`api/filiais.db.test.ts`** (pull só das filiais da carteira).
4. **`catalogo.sugestoes_pedido@1` rejeita:** em `tests/integracao/demo/sugestoes-offline.test.ts` (P4a–d) e `tests/integracao/api/orcamento-t0071.test.ts` (R3).

## Pronto quando
O tsc do web e os testes acima passam (os de banco, pelo log do próximo ensaio). Recado `entrega` ao gerente até as 18h.
