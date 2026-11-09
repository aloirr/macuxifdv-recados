---
id: R-20261107-125710-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0085
responde_a: R-20261107-123550-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-07T12:57:10-04:00
---
# T-0085: reconferência da lista por linha com 20 mil — sem 🔴, 🟡 de desempenho resolvido (raiz fria 94-100 ms); 1 🟡 de produto (itens além de 100), 4 🟢

# Reconferência técnica — lista por linha com 20 mil produtos (T-0085, 🟡 do R-20261107-111809)

Escopo: working tree de `modules/catalogo/app/lib/lista-por-linha.ts`, `lista-por-linha-local.ts` e `lista-por-linha.desempenho.test.ts` (a tela `telas/lista-por-linha.tsx` não mudou). O item 4 (índices v4 em `db/aparelho.ts`, `ent_produto_no.no_id` e `ent_produto_relacao.produto_id`) está no working tree, com a mesma expressão do SDK.

**Parecer: sem 🔴. Os itens 1, 2, 3 e 5 do 🟡 estão resolvidos, e o 🟡 de desempenho pode ser fechado.** Ficam 1 🟡 de produto (itens além de 100) e 4 🟢.

## Números (Node/V8 no PC, carregado por um build em paralelo)
Teste oficial (`vitest`, leitor em memória, melhor de 5/3):
| abertura | antes (R-…111809) | agora |
|---|---|---|
| raiz fria | 1.422 ms | **94 a 100 ms** |
| raiz quente | 105 ms | 1 ms |
| sistema (~2,9 mil) | 97 ms | 22 a 67 ms |
| grupo | 22 ms | 8 ms |
| linha de 500 (539) | 18 ms | 16 a 25 ms |

Minha sonda, refeita do mesmo jeito (8×6×8, 20 mil, 2% sem linha), agora com um leitor **tipo SQLite**: cada leitura faz `JSON.parse` e devolve objetos novos, há índice por campo e `versaoLinhas` por entidade. Melhor e mediana de 5 frias:
| perfil | raiz | sistema | grupo | linha 500 |
|---|---|---|---|---|
| promotor | 164–306 / 183–361 ms | 36–59 ms | 13–19 ms | 15–22 ms |
| vendedor | 170–372 / 327–844 ms | 35–66 ms | 12–19 ms | 15–29 ms |
| gerente (Gestão) | 199–303 / 316–359 ms | 35–55 ms | 15–19 ms | 13–21 ms |
Só ler e fazer o parse de `produto` e `produto_no` (40 mil linhas) custa de 159 a 265 ms nessa máquina. O cálculo da raiz fica em cerca de 100 ms, e o resto da raiz fria é leitura. A variação entre perfis vem do GC: na raiz não há item, então o `contextoLocal` sai vazio.

## O que conferi e está ok
- **Raiz** (`contarSistemas`): só conta. Não cria `ProdutoLista`, não ordena e não guarda conjuntos por nó. Total = vinculados + sem linha = N; a soma dos sistemas dá 20.000 e o grupo "Sem linha" tem 400 (2%). Produto em dois sistemas conta em cada um e uma vez só no total, a mesma semântica de antes.
- **Ordenação sem `Intl.Collator`** (`chaveDeOrdem` + `ordenarPorNome`, `lista-por-linha.ts:98-111`):
  - Na linha de 539, os 100 primeiros saem **100/100 iguais** ao `Intl.Collator('pt-BR')` (nome, sku, id).
  - Numa lista de 25 nomes com acento (Água/agua, Ação, Çapata/Capa, Égua/eixo/Êmbolo/Ética, Ímã, Óleo/oleo/Ônibus, ÚNICO/unha, "(kit) Junta"), 23/25 saem iguais. A única diferença é o empate "Água" × "agua": os dois têm a mesma chave e o desempate fica pelo código, enquanto o Collator põe o sem acento antes. É aceitável.
  - O `hermesc` do RN 0.86 compila `/\p{M}/gu`. A mesma expressão já roda no app em `domain/marcas.ts:47`.
  - A ordenação só alcança os candidatos do nível mostrado (`finalizar`, `:226`) e calcula a chave uma vez por produto.
- **Cache por nó e voltar** (um leitor só, como a tela):

  | passo | tempo | leituras |
  |---|---|---|
  | raiz | 413 ms (1ª, com GC) | |
  | raiz de novo | 0,2 ms | 0 |
  | sistema | 70 ms | |
  | grupo | 18 ms | |
  | linha | 24 ms | |
  | voltar grupo, sistema e raiz | 0,1 a 0,2 ms cada | 0 |
  | linha de novo | 12 ms | 3 (extras e preço dos 100, de propósito) |

  O resultado de cada volta é idêntico (JSON igual) ao da ida.
- **Sync**: +1 produto na linha 0 e versão nova → raiz 20.000→20.001, sistema 2.874→2.875, linha 539→540 (o memo é invalidado). Linha removida no sync → `noInexistente` e `voltarPara` = grupo pai. Nó inexistente: 4 ms.
- **Gestão**: a tela e a página (`apps: ['campo','gestao']`) não mudaram. Perfil `gerente` na sonda sem erro e com os tempos acima. Bundle gestao verde (abaixo).
- **Verificações**:
  - eslint dos 4 arquivos limpo.
  - `tsc -p tsconfig.app.json` e `tsconfig.json` limpos.
  - vitest `modules/catalogo/app`: 12 arquivos verdes (1 pulado, de banco).
  - O teste de desempenho passa com folga: raiz 94–100 ms com teto de 400 ms, linha 16–25 ms com teto de 750 ms.
  - Bundles `expo export:embed` campo e gestao do working tree: verdes, 2072 módulos cada, com o código novo (contarSistemas, memo lista-no:) e sem Collator('pt-BR').

## 🟡 corrigir antes do piloto (decisão de produto, não é regressão desta correção): itens além de 100 não aparecem ao rolar
`finalizar` corta em `MAXIMO_ITENS_LISTA = 100` (`lista-por-linha-local.ts:18,226`), e a tela mostra "539 produtos · mostrando 100" (`telas/lista-por-linha.tsx:121`). Do 101º em diante, o item só é alcançado pela busca. É o comportamento do #95 e o que a spec aceita (`docs/design/catalogo-por-linha.md:77`, "como está"). Com 20 mil produtos, porém, linha com mais de 100 itens vai ser comum: na sonda, a linha 0 tem 539 e o "Sem linha" tem 400.
Proposta, barata porque `finalizar` já ordena todos os candidatos:
- `pagina`/`deslocamento` em `listaPorLinhaLocal`, `ordenados.slice(d, d + 100)`;
- "Mostrar mais 100" no fim da lista, ou `FlatList` com `onEndReached`.

Os candidatos já estão no memo do nó, então a página 2 custa só os extras e o preço de 100. Levo a decisão ao gerente-projetos e ao designer-ux. Se ficar como está, que pelo menos o texto diga "busque para ver os demais".

## 🟢 sugestões
1. **Memória do cache por nó** (`lembrar`, `lista-por-linha-local.ts:51-64,141`): na sonda, abrir os 440 nós retém **+21 MB** de heap. Depois de um sync, as entradas velhas ficam no `Map` até cada nó ser reaberto. O total é limitado ao tamanho da árvore, mas vale pôr um LRU (~20 nós) e limpar os `lista-no:*` quando a chave de versão mudar.
2. **Raiz fria = leitura**: o custo que sobra é ler e fazer o parse das 20 mil linhas de `produto` (só para os ids ativos) e das 19,6 mil de `produto_no`. Se no aparelho (Hermes) a raiz fria passar de cerca de 300 ms, o caminho é o SDK ler só colunas/ids (pedido ao engenheiro-software), não mexer no cálculo. Eu meço no roteiro do próximo preview com carga.
3. **Teste de desempenho** (`lista-por-linha.desempenho.test.ts:57-59`): o leitor devolve os mesmos objetos, sem `JSON.parse`, e mede só o cálculo. Os nomes têm todos o sufixo "Ação", então o teste não exercita acento. Sugiro:
   - um teste unitário de `ordenarPorNome` com Á/a, Ç/C e Ó/o (garante a ordem com acento, que hoje nenhum teste cobre);
   - opcionalmente, um leitor com `JSON.parse` no teste de desempenho.
4. `porNome` (`lista-por-linha.ts:103`) continua exportado e recalcula `chaveDeOrdem` a cada comparação. Ninguém mais o usa: remover, para não voltar a ser usado num `sort` de milhares.
