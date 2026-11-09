---
id: R-20261105-191705-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T19:17:05-04:00
---
# Revisão final do lote R (T-0071/T-0052, Vendedor): sem 🔴 e sem 🟡, 3 🟢 — lote R liberado

## Contexto
Revisão final do lote R (T-0071 e T-0052): `git diff origin/main -- modules/vendedor` mais os arquivos novos `app/lib/produto-pendente.ts`, `app/lib/rascunho-com-produto.ts` e os testes deles. O engenheiro-apps (R-20261105-190830) e o designer-ux (R-20261105-185427) já revisaram e não acharam 🔴.

Conferido no PC, sem Docker:
- `vitest run` do módulo: 62 arquivos e 722 testes verdes (os 5 arquivos de banco foram pulados; o CI é o critério). Os testes novos (produto-pendente 10, rascunho-com-produto 7) passam.
- `eslint` nos arquivos tocados: limpo.
- `tsc -p tsconfig.app.json`: limpo.
- `node scripts/fronteiras.mjs`: 0 erros (os 3 avisos são antigos e de outros módulos).

## Resultado
**🔴 Nenhum. 🟡 Nenhum.**

O que foi conferido:
- **Fronteiras (regra 1).** `app/index.ts:5` e `app/lib/rascunho-com-produto.ts` importam só `@macuxi/catalogo/contracts` (`AcaoProduto` e `Product`). O manifesto já declara `depende: ['core','catalogo']` e `usaExtensoes: ['produto.acoes', ...]`, e o package.json tem `@macuxi/catalogo`.
- **Regra 7 / RN-PRO-01.** A extensão usa `acao: 'pedido.criar'` e `apps: ['campo']` (index.ts:69). O `montarVisao` do SDK filtra o slot com `pode(acao)`, e `modules/core/domain/matriz.test.ts` já prova que o promotor não tem `pedido.criar`. A página `novo-pedido` também exige `pedido.criar` (index.ts:32). Ou seja, mesmo que alguém chame a URL direto, a tela é negada (ADR 0004). A Gestão não vê a ação.
- **Preço.** A linha entra com quantidade 1 na unidade base. O preço é o do `catalog` do editor, que é a tabela do cliente (`dados.produtos[customer.price_table_id]`). Produto sem preço ou fora da tabela não entra (RN-CAT-06, com aviso no rodapé). Na API, o `receber.ts` revalida o preço por `catalogo.precos_cliente@1`. Nenhum valor é gravado a partir do Catálogo.
- **Offline.** Tudo roda em memória e no rascunho local. Sem catálogo carregado (`catalog.length === 0`), o pendente não é consumido e espera o `ensureProducts`. Não há chamada de rede no fluxo.
- **Estado em memória.**
  - O pendente é consumido uma vez só, e só pelo editor com o mesmo `clienteId` e o mesmo `editId`. O pedido novo e a edição do mesmo cliente não se misturam, e há teste para isso.
  - O pendente "sem cliente" só vale depois que o seletor fixa o cliente.
  - O desmontar do `NewOrderScreen` descarta o pendente. Como a rota `m/[...caminho]` é uma só (ADR 0026), trocar de tela de módulo desmonta a tela. Por isso desistir no seletor não deixa sobra.
  - A origem do editor é apagada ao ser lida e quando o editor monta (voltou do Catálogo sem escolher). Origem de outro cliente é ignorada e apagada.
  - O "Desfazer" tira a linha em qualquer medida.
  - Reaplicar não duplica a linha (`ja_no_pedido`).
- **Atualização automática.** Pedidos e o detalhe usam o `useAtualizacaoAutomatica` do kit. O spinner gira só no puxar, e o rodapé mostra a última sincronização. A releitura depois de cada sync vem do `useVendedor`, que recarrega a cada `sincronizado_em` novo (`state/use-vendedor.ts:108-115`). Por isso não é preciso passar `atualizar`.

## 🟢 Sugestões (não bloqueiam; ficam para quando o código for tocado de novo)
1. **`app/index.ts:80` e `app/lib/produto-pendente.ts:64-81`.** Hoje a origem guardada está certa porque a única entrada do Catálogo com cliente é o próprio editor (`hrefCatalogoDoPedido`, com `pedido=1`). Se outra entrada com cliente voltar (por exemplo um "Ver catálogo" na ficha), uma origem velha do mesmo cliente levaria o item ao editor antigo, quando a pessoa queria um pedido novo. Para ficar robusto, peça ao modulo-catalogo um campo aditivo `doPedido: boolean` no `ContextoProduto` (contrato do Catálogo, compatível) e use a origem só quando `ctx.doPedido` for verdadeiro.
2. **`app/screens/new-order-screen.tsx:42`.** O descarte no desmontar (`useEffect(() => () => descartarProdutoPendente(), [])`) depende de o app não rodar em `StrictMode`. Hoje não roda: não há `StrictMode` em `apps/mobile/src`. No `StrictMode` de desenvolvimento, o ciclo montar/desmontar/montar apagaria o pendente antes do uso. Vale uma linha de comentário avisando isso.
3. **`ContextoProduto.vendavel`.** Quando vem `false`, a ação poderia avisar no próprio Catálogo, sem abrir o editor só para mostrar "sem preço na tabela do cliente". É uma melhoria de UX, a combinar com o designer-ux.

## Pronto quando
Não falta nada para o merge. **Lote R liberado** pela revisão do engenheiro-software. Os 🟢 ficam a critério do modulo-vendedor.
