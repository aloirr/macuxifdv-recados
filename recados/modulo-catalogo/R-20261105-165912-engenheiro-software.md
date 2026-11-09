---
id: R-20261105-165912-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:59:12-04:00
---
# Revisão: precos_cliente@1 + tabela_preco_nome, codigoCompacto único e manifest (sem 🔴/🟡, liberado)

## Contexto
Revisão final (para o próximo lote) dos itens do Catálogo que entraram na árvore durante a revisão do lote N, conferidos com `git diff origin/main`. Rodei: vitest de domain/precos-cliente, domain/ranking, app/indice e app/consultas (59 verdes), `pnpm --filter @macuxi/catalogo typecheck` (api, web e app) e eslint dos arquivos: tudo verde. Testes de banco ficam para o CI.

## Resultado
Sem 🔴 e sem 🟡.

**1. `catalogo.precos_cliente@1` + `tabela_preco_nome` (T-0061)**
- 🟢 contracts/consultas.ts:37: aditivo e compatível. O campo é `.nullable().optional()` e o schema não é strict, então consumidor antigo não quebra. Fica na mesma versão @1. Registrei a nota em `.coord/contratos/modulos.md` (linha do `catalogo.precos_cliente@1`).
- 🟢 domain/precos-cliente.ts:64: o nome só sai no ramo com `verPreco` e `tabelaId` não nulo. Os retornos antecipados (perfil sem preço e cliente sem tabela) não têm o campo. RN-CAT-05 está certa: promotor sem `promotor_ve_preco_estoque` não recebe o nome. Com o parâmetro ligado ele recebe, como recebe o id e o preço, que é o que a RN manda. O teste em precos-cliente.test.ts:19 cobre os quatro casos e o parse do schema.
- 🟢 api/consultas.ts:20 e app/consultas.ts:22: a API e o aparelho leem o nome da mesma tabela ativa e não removida (`t.nome` é `not null` na 0008), e a decisão fica no domain. O nome da tabela é dado comercial, não dado pessoal.
- 🟢 Sugestão: app/consultas.test.ts:99 já protege o promotor de forma implícita, porque o `toEqual` falharia com `tabela_preco_nome: 'Atacado'`. Um `expect(r).not.toHaveProperty('tabela_preco_nome')` explícito para o promotor deixaria a regra legível no teste do aparelho.

**2. Função única do SKU compacto**
- 🟢 app/indice.ts:34 e domain/ranking.ts:156: agora o índice e o ranking usam a mesma `codigoCompacto`. app importando o próprio domain está dentro da fronteira. O caso `null` que saiu de indice.test.ts está coberto em ranking.test.ts:321.
- 🟢 Diferença de comportamento, sem ação: a forma antiga (`normalizarBusca(...).join('')`) mantinha letras fora de a-z (`º`, `ß`, letras não latinas). A nova descarta essas letras. Com SKU comum nada muda e não é preciso reindexar o aparelho.
- 🟢 ranking.ts:157: o intervalo `[̀-ͯ]` está escrito com os caracteres combinantes literais, que ficam invisíveis no editor. Sugiro `/\p{M}+/gu` (o mesmo do SDK) ou `[\u0300-\u036f]`.

**3. manifest.ts**
- 🟢 Não há mudança de conteúdo: o blob é o mesmo em HEAD, em origin/main e na árvore (`d8e2e1d`). O `M` do `git status` é só fim de linha ou carimbo de data. Não há o que revisar e nada vai no commit.

## Pronto quando
Nada obrigatório. Liberado para o próximo lote. Os 🟢 ficam a seu critério.
