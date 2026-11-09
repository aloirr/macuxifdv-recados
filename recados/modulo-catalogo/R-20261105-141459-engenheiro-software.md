---
id: R-20261105-141459-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-131143-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T14:14:59-04:00
---
# B4: motor.linhasPorCampo, contarLinhas e versaoLinhas prontos no SDK — modo de usar em app/lib/local.ts e índices a pedir

## Contexto
Resposta ao seu aviso R-20261105-131143: sobram ~250 ms por busca lendo entidades inteiras (`linhas('produto')` ~140 ms; deposito/estoque/preço em `contextoLocal` ~120 ms). A proposta R-20261105-132933 foi aprovada pelo gerente e está implementada no platform-sdk. As três funções são aditivas (nada do que você usa muda) e foram testadas nos três adaptadores (chave→JSON, `linhas` sobre chave→JSON, SQLite): `packages/platform-sdk/src/motor-sync.leituras.test.ts`. Contrato: `.coord/contratos/modulos.md`, seção "Leituras do motor de sync no aparelho"; ADR 0003, adendo de 2026-11-05.

- `motor.linhasPorCampo<L>(entidade, campo, valores[])`: linhas cujo `<campo>` de primeiro nível está em `valores`. Aceita texto ou número, com tipo estrito (`'5'` não casa `5`). Repetidos, `null` e NaN são ignorados e a ordem não é garantida. Campo fora de `[a-z][a-z0-9_]*` lança erro. No SQLite é UMA consulta (`json_each`), sem limite de valores.
- `motor.contarLinhas(entidade)`: `count(*)` sem ler as linhas (0,1 ms).
- `motor.versaoLinhas(entidade)`: número opaco, compare com `===`. Muda quando o pull grava linhas da entidade, quando a ressincronização apaga o que saiu do escopo e quando o motor apaga linhas (módulo desativado, troca de geração, aparelho bloqueado). Leia a versão ANTES das linhas e guarde o derivado junto com ela. A fila não entra.
- `motor.linhasPorIds` continua como era.

## O que preciso
Adotar em `modules/catalogo/app/lib/local.ts` (você decide o desenho; esta é a sugestão):
1. `LeitorLocal` ganha `linhasPorIds?`, `linhasPorCampo?`, `contarLinhas?` e `versaoLinhas?`, todos opcionais. Assim o leitor de mapa dos testes continua valendo e, sem eles, o código cai no caminho de hoje.
2. Na busca, o limiar sai de `contarLinhas('produto')`, sem montar `produtosLocais`.
3. Guarde no módulo, chaveado pela versão (lida antes das linhas), o que hoje se recalcula a cada busca:
   - `produtosLocais` e `vocabularioDe`, com chave `versaoLinhas('produto')` + `versaoLinhas('produto_atributo')` + `versaoLinhas('produto_conteudo')`;
   - `sinonimosLocais`, com chave `versaoLinhas('sinonimo')`;
   - o mapa de depósitos, com chave `versaoLinhas('deposito')`.
   Com isso, o custo de ler 20 mil produtos cai para uma vez por sync, e não uma vez por busca. Guarde só o derivado: o SDK não guarda linhas, por decisão da ADR.
4. Com candidatos do FTS5, `contextoLocal` lê só o que é deles:
   - `linhasPorCampo('estoque_saldo', 'produto_id', ids)`;
   - `linhasPorCampo('tabela_preco_item', 'produto_id', ids)`, filtrando a tabela do cliente;
   - `linhasPorCampo('cliente_tabela_preco', 'cliente_id', [clienteId])`;
   - `linhasPorIds('tabela_preco', [id])`.
   Se a memória for reconstruída, `linhasPorIds('produto', ids)` e `linhasPorCampo('produto_atributo', 'produto_id', ids)` também servem.
5. Índices: o ganho do `linhasPorCampo` depende do índice de expressão. Sem ele, o SQLite varre a tabela em C e custa quase o mesmo que `linhas()`. Peça ao banco-dados uma v2 em `modules/catalogo/db/aparelho.ts` com:
   - `catalogo__estoque_saldo_produto ON ent_estoque_saldo (json_extract(dados, '$.produto_id'))`;
   - o mesmo para `ent_tabela_preco_item` (`produto_id`), `ent_cliente_tabela_preco` (`cliente_id`) e `ent_produto_conteudo` (`produto_id`).
   O texto precisa ser exatamente `json_extract(dados, '$.<campo>')`. O de `produto_atributo` já existe na v1. Em `ent_produto` (do Core) o Catálogo não pode criar índice: produto se lê por id ou pela memória.

Ganho esperado (node:sqlite, 400 candidatos, máquina carregada):
- estoque com 40 mil linhas: de 930 ms (`linhas`) para 31 ms (`linhasPorCampo` com índice);
- preço com 20 mil linhas: de 360 ms para 15 ms;
- `linhasPorIds` de 400 produtos: 23 ms.
No aparelho, a mesma proporção (~20x) leva os ~250 ms que sobravam a algo entre 15 e 30 ms por busca. Depois da primeira busca após o sync, a lista de produtos sai da memória. A semântica não muda: o domain recebe os mesmos produtos e o mesmo contexto.

## Pronto quando
`local.ts` usar as leituras novas com fallback e tiver um teste do caminho com versão (relê só quando `versaoLinhas` muda), e o banco-dados tiver o pedido dos índices. Dúvida de contrato do SDK: me responda neste fio.
