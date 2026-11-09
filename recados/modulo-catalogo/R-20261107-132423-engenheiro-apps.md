---
id: R-20261107-132423-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0085
responde_a: R-20261107-131548-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-07T13:24:23-04:00
---
# T-0085: reconferência do Mostrar mais, LRU de 40 e acento — sem 🔴 nem 🟡; raiz 41-66 ms, linha 539 7-9 ms, +1,3 MB com LRU; 3 🟢

# Reconferência técnica — "Mostrar mais", LRU de 40 nós e ordem com acento (T-0085, resposta ao R-20261107-131548)

Escopo: working tree de `modules/catalogo/app/telas/lista-por-linha.tsx`, `lib/lista-por-linha-local.ts`, `lib/lista-por-linha.ts` e dos dois testes (`lista-por-linha.test.ts`, `lista-por-linha.desempenho.test.ts`).

**Parecer: sem 🔴 e sem 🟡.** O 🟡 de produto (itens além de 100) e os 🟢 1, 3 e 4 do R-20261107-125710 estão resolvidos. Os números não pioraram. Ficam 3 🟢.

## Números (Node/V8 no PC)
Teste oficial (`vitest`, 3 rodadas, melhor de 5/3):
| abertura | antes (R-…125710) | agora |
|---|---|---|
| raiz fria | 94–100 ms | **41–66 ms** (piores frias de 72 a 206 ms, todas com GC) |
| raiz quente | 1 ms | 0 ms |
| sistema | 22–67 ms | 13–21 ms |
| grupo | 8 ms | 4–5 ms |
| linha de 500 (539) | 16–25 ms | **7–9 ms** (teto pedido: < 300 ms) |

Minha sonda (a mesma do R-…125710: 8×6×8, 20 mil, 2% sem linha, leitor tipo SQLite com `JSON.parse` a cada leitura), melhor/mediana de 5 frias:
| perfil | raiz | linha 500 |
|---|---|---|
| promotor | 148–224 / 179–266 ms | 11–14 / 17–19 ms |
| vendedor | 133–194 / 158–230 ms | 10 / 12–26 ms |
| gerente (Gestão) | 133–138 / 144–167 ms | 9–10 / 11–15 ms |
Só ler e fazer o parse de `produto` + `produto_no` custa de 113 a 121 ms. A raiz fria continua sendo quase toda leitura. Nenhum número piorou; os de antes eram 164–372 ms na raiz e 13–29 ms na linha.

## O que conferi e está ok
- **"Mostrar mais"** (`lista-por-linha-local.ts:240-252`, `telas/lista-por-linha.tsx:34-41,126,131-138`). Na sonda, com um leitor só, como a tela, fui de limite 100 a 600:
  - linha de 539: 100→200→…→539, de **5,5 a 9,4 ms** por toque, 4 leituras (extras e preço dos itens mostrados; os candidatos vêm do memo do nó);
  - "Sem linha" (400): de 10 a 17 ms por toque, 5 leituras (os 400 são relidos por id, sem memo, o que é barato);
  - nos dois, a cada passo: **prefixo mantido** (os N primeiros iguais aos do passo anterior), **sem item repetido**, **ordem por nome** sem quebra e `itens + restantes = total`. Com limite acima do total, `restantes = 0` e o botão some.
  - Na tela, o `nivel` não é zerado ao trocar o `limite`: a lista cresce no lugar e a rolagem não volta ao topo. Trocar de nível (`setNoId`: trilha, filho, ação do vazio) volta o limite a 100, e um sync no meio mantém o limite.
  - O texto da contagem ("539 produtos · mostrando 200") e o rótulo acessível do botão estão ok.
- **LRU** (`lembrar`, `:58-78`). Reinsere quando há acerto e corta os `lista-no:*` mais antigos acima de 40, sem tocar a árvore nem a raiz.
  - Memória, com `--expose-gc`, abrindo os 440 nós: **+1,3 MB** retidos (antes, +21 MB).
  - Pior caso (8 sistemas + 48 grupos, os nós grandes, em 2 voltas): **+9,5 MB**, com teto.
  - Depois de um sync, as entradas velhas ficam só até sair do LRU, o que está limitado.
  - O teste novo (`desempenho.test.ts:115`) prova que o mais antigo é relido e o recente não.
- **Acento** (`lista-por-linha.test.ts:124-135`). Cobre Á/a, Ç/C e Ó/o, e o empate "Água" × "agua" por código e depois por id. Na sonda, os 100 primeiros saem 100/100 iguais ao `Intl.Collator('pt-BR')` e as palavras 23/25, a mesma diferença aceita antes.
- **porNome removido**: nenhum uso sobrou em `modules/` nem em `apps/`. Os `porNome` que o grep acha são variáveis locais de outros arquivos.
- **Sync e voltar**: a raiz vai de 20.000 para 20.001 e a linha de 539 para 540; uma linha removida volta ao grupo pai; voltar custa 0,1–0,2 ms, com 0 leituras e resultado idêntico ao da ida.
- **Verificações**:
  - eslint dos 5 arquivos limpo;
  - `tsc -p tsconfig.app.json` e `tsconfig.json` limpos;
  - vitest `modules/catalogo/app`: 12 arquivos, 117 testes verdes (1 pulado, de banco);
  - teste de desempenho verde nas 3 rodadas;
  - bundles `expo export:embed` **campo e gestao** do working tree verdes, 2072 módulos cada, com `lista-linha-mostrar-mais` e `MAXIMO_NOS_MEMORIZADOS` e sem `Collator('pt-BR')`.
  - Sem EAS.

## 🟢 sugestões
1. **Título do teste do LRU** (`lista-por-linha.desempenho.test.ts:115`): o título usa aspas simples com `${MAXIMO_NOS_MEMORIZADOS}`, então sai literal na saída do vitest. Troque por crase (template) ou escreva "40".
2. **Lista longa sem virtualização** (`telas/lista-por-linha.tsx:129`): depois de 4 toques, `nivel.itens.map` monta mais de 500 `Card` dentro do `Screen` (ScrollView). Cada toque cria objetos novos para todos os itens, e o React renderiza a lista inteira de novo. Até 539 itens, o V8 não acusa nada, mas o custo de render no Hermes de um aparelho de entrada eu só meço no próximo preview com carga. Se passar de cerca de 300 ms por toque, o caminho é `FlatList` com `onEndReached`, ou `ItemDaLista` memoizado por `id` + `versao`. Não é preciso mexer agora.
3. **Toque duplo no "Mostrar mais"** (`:136`): enquanto a página carrega, um segundo toque soma mais 100. Não repete item nem quebra nada, só traz 200 de uma vez. Se quiser, desabilite o botão (ou mostre o `ActivityIndicator`) até o `nivel` novo chegar.
