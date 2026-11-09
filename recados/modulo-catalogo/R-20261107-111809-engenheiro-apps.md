---
id: R-20261107-111809-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0085
responde_a: R-20261107-105954-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-07T11:18:09-04:00
---
# T-0085: revisão técnica do atalho 'Ver por linha' e da lista por linha — sem 🔴; 1 🟡 de desempenho com 20 mil produtos (antes do piloto), 4 🟢

# Revisão técnica — atalho "Ver por linha" e lista por linha (T-0085, RF-CAT-09)

Escopo: `modules/catalogo/app/telas/catalogo.tsx` (working tree), `app/lib/atalho-por-linha.ts` e teste, e a lista por linha que entrou no #95 (`telas/lista-por-linha.tsx`, `rotas.ts`, `lib/lista-por-linha.ts`, `lib/lista-por-linha-local.ts`).
Parecer: **sem 🔴**. O atalho pode ir para o main e para o build de preview. Há um 🟡 de desempenho com 20 mil produtos, que precisa estar resolvido antes do piloto (a demo tem cerca de 48 produtos, então não aparece no preview).

## O que conferi e está ok
- Navegação: `irParaListaPorLinha(clienteId, noId)` monta `/m/lista-por-linha?cliente=…&no=…`, e o `?` some sem parâmetros (há teste). A página `lista-por-linha` está em `moduloApp.paginas` (index.ts:54) com `acao: 'produto.consultar'` e `apps: ['campo','gestao']`, e o shell a resolve por `/m/[...caminho]` pela `visao.pagina`, sem rota nova no shell. O `BackLink` e o voltar do Android desempilham pelo histórico da aba (T-0071). Sem histórico, o fallback é `hrefCatalogo(clienteId)`.
- `noId` velho ou inexistente: a lista trata com `noInexistente` + "Voltar um nível", e nunca deixa a tela sem saída.
- Offline (T-0088): tudo passa pelo motor (`linhas`, `linhasPorIds`, `linhasPorCampo`, `versaoLinhas`) sobre o SQLite, sem rede. No SQLite, `linhasPorIds` lê em lotes de 500 e `linhasPorCampo` usa `json_each` (sem limite de parâmetros).
- Regra 7 e RN-CAT-05: não há ação de pedido. O promotor recebe o item sem preço e sem estoque, porque o `contextoLocal` já vem vazio.
- Gestão: a página e o atalho valem nas duas variantes. `dentroDoPedido` é sempre falso no Gestão, então o atalho aparece na vitrine. Bundle do gestao verde.
- Condição do atalho (`mostrarAtalhoPorLinha`) é função pura com teste, e o atalho usa o `LinhaAtalho` do kit.
- Verificações: vitest `modules/catalogo/app` com 110 verdes; eslint dos 7 arquivos limpo; `tsc -p tsconfig.app.json` e `tsconfig.web.json` limpos. Bundles `expo export:embed` campo e gestao verdes (2072 módulos), com o testID do atalho presente no bundle.

## 🟡 corrigir antes do piloto: desempenho com 20 mil produtos
Medi com uma sonda em Node/V8 no PC: 20 mil produtos, 8 sistemas × 6 grupos × 8 linhas, 2% sem linha, perfil promotor (sem preço):
| abertura | tempo |
|---|---|
| raiz fria (1ª vez depois do sync) | **1.422 ms** |
| raiz quente (memo) | 105 ms |
| sistema (~2,5 mil produtos) | 97 ms |
| grupo | 22 ms |
| linha | 18 ms |
No Hermes de um Android médio isso costuma ficar várias vezes mais lento. Como é cálculo síncrono numa cadeia só, a thread JS congela por segundos, justamente no caminho mais comum: o atalho na vitrine sem nó (`noId` nulo) abre a raiz. Causas e correções:
1. `lib/lista-por-linha.ts:97-117` (`porNome` com `Intl.Collator`): `montar` ordena os produtos diretos de **todos** os nós já na raiz, onde só as contagens importam. No meu cenário são cerca de 86 mil comparações (224 ms no V8). No Hermes Android, o `Intl.Collator.compare` passa pelo JNI a cada comparação, o que é muito lento. Correção: não ordenar em `agruparPorLinha`, só em `finalizar` (que já ordena os candidatos), e trocar o Collator por uma **chave de ordenação calculada uma vez por produto** (minúsculas, sem acento, `normalize('NFD')` + remover `\p{M}`), comparada com `<`. O empate por sku e id continua.
2. `agruparPorLinha`/`coletar` (`lista-por-linha.ts:115-130`): `montar` chama `coletar(f)` em cada filho, e `coletar` desce de novo pela subárvore, recriando os conjuntos a cada nível. Montar de baixo para cima devolvendo o conjunto uma vez só resolve. Na raiz, `listaPorLinhaLocal` (`lista-por-linha-local.ts:158`) recalcula o `total` com `coletar` de todos os sistemas a cada abertura. Esse total deveria ficar dentro do memo `lista-raiz`, e é ele que explica os 105 ms da raiz quente.
3. Nível sistema e grupo (`lista-por-linha-local.ts:167-180`): não há memo, então cada toque relê vínculos e produtos da subárvore e reagrupa. Se o memo `lista-raiz` estiver válido para as versões atuais, derive o nível dele; se não, memorize por `noId` com `versaoLinhas`.
4. Índices no aparelho (pedido seu ao banco-dados, dono de `db/aparelho.ts`): `linhasPorCampo('produto_no','no_id',…)` e `linhasPorCampo('produto_relacao','produto_id',…)` não têm índice de expressão. Hoje cada toque varre a tabela inteira com `json_extract`. Faltam `CREATE INDEX … ON ent_produto_no (json_extract(dados, '$.no_id'))` e `… ON ent_produto_relacao (json_extract(dados, '$.produto_id'))`, com o texto da expressão igual ao do SDK.
5. Teste de desempenho como o `desempenho-busca.test.ts` (`MACUXI_N`, 20 mil): abrir raiz fria, sistema e linha com teto, para não regredir.
Pronto quando: raiz fria abaixo de cerca de 300 ms no V8 com 20 mil produtos, sem `Intl.Collator` em ordenação de milhares de itens, e o teste de desempenho no CI. Eu meço no aparelho no roteiro do próximo preview com carga.

## 🟢 sugestões
- `telas/lista-por-linha.tsx:186`: até 100 `Card` dentro do `Screen` (ScrollView) renderizam de uma vez. Hoje passa, mas vale avaliar `FlatList` (virtualizada) se o teto subir.
- A navegação entre níveis é por estado (`setNoId`), então o voltar do Android numa linha sai da lista inteira em vez de subir um nível. É o mesmo comportamento da vitrine; fica como decisão de UX (designer-ux), sem mudança agora.
- `atalho-por-linha.test.ts:31-35`: o teste por regex no fonte (`readFileSync` de `catalogo.tsx`) é frágil a qualquer formatação. Basta como trava, mas um teste de render com o `LinhaAtalho` seria mais robusto.
- `BackLink` fallback `hrefCatalogo(clienteId)`: sem histórico (ex.: link direto), volta à raiz da vitrine e perde o `no`. Dá para passar `{ noId: params.no }` se fizer sentido.
