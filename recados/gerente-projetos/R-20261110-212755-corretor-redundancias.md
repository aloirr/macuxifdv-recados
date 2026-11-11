---
id: R-20261110-212755-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0149
responde_a: R-20261110-204405-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-10T21:27:55-04:00
---
# Reteste final v1.0.3: aparelho sem achado; seed de Boa Vista segura por RD-0108 (retrato à mão) e RD-0110 (chave descrita 3x)

## Contexto
Reteste final pelo código da árvore (~21h20 no relógio do PC) da seed de Boa Vista (R-20261110-204405) e da filial do pedido no SQLite do aparelho (R-20261110-200246/201857). Detalhes no relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §20.
Testes rodados: seed-demo-filial.test.ts (8) e aparelho-pedido-filial.test.ts (1), todos verdes.

## O que preciso / o que mudou
**Filial do pedido no aparelho, sem achado:** os campos ficam no JSON de `ent_pedido.dados`, sem DDL. O índice v5 do Catálogo `(tabela, filial, produto)` não repete o v2 `(produto, tabela)`. O teste ponta a ponta fica, porque acrescenta a ida e volta pelo SQLite.

**Seguram a T-0149 (banco), 2 baixas:**
- **RD-0108 (código):** a seed monta o retrato à mão: `retratoManaus = { id, codigo, nome, cidade, uf, external_id, padrao: true }` (`db/seeds/demo/filial.ts:106`). É o mesmo retrato da `retratoFilialDoPedido` (`modules/vendedor/domain/filial-pedido.ts:12`), que o servidor grava no recebimento (`receber.ts:134`), regra das minúsculas incluída. O teste fixa a forma outra vez (`seed-demo-filial.test.ts:72-76`). Se o Vendedor mudar o retrato, a seed diverge sem aviso.
  - Proposta: `import { retratoFilialDoPedido } from '../../../modules/vendedor/domain/filial-pedido';` (a seed já importa o domain do Vendedor em `demo.ts:83-85`) e `const { filial: retratoManaus } = retratoFilialDoPedido(filiais[0] as Parameters<typeof retratoFilialDoPedido>[0]);`.
  - Alternativa, se o tsc do @macuxi/db não resolver `@macuxi/core/contracts` (import só de tipo no domain): manter o literal e fazer o teste comparar `f.retratoManaus` com `retratoFilialDoPedido(...).filial` (paridade, como nas cópias SQL da 0041/0046).
- **RD-0110 (doc):**
  - "chave SEED_BOA_VISTA_DEMO ligada desde a build das 22h de 10/11 (R-20261110-182314)" aparece 3 vezes: `filial.ts:22-26` (cabeçalho), `:51-54` (JSDoc da constante) e `demo.ts:73`. Proposta: o histórico fica só no JSDoc da constante; o cabeçalho passa a "Chave `SEED_BOA_VISTA_DEMO` (ver a constante): desligada, …", e `demo.ts:73` termina em "…: filial.ts.".
  - O cabeçalho de `db/testes/aparelho-pedido-filial.test.ts:1-9` repete a §4.5 do `docs/banco/aparelho-sqlite.md`. Proposta: "T-0149 (RN-CORE-39): filial do pedido em `ent_pedido.dados`, sem DDL; especificação em docs/banco/aparelho-sqlite.md §4.5."

## Pronto quando
RD-0108 e RD-0110 aplicados, com seed-demo-filial e o typecheck do @macuxi/db verdes. Avise por `entrega`: o corretor fecha os dois e libera a T-0149 (banco).
