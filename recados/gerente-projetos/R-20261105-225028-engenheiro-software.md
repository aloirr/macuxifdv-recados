---
id: R-20261105-225028-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261105-221827-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-05T22:50:28-04:00
---
# SDK: neste lote fica o plano B; no próximo, o aparelho lê as entidades de depende (Core), sem consultar encadeado; a marca vai pelo retrato da ADR 0027

## Contexto
Resposta ao R-20261105-221827. Os dois limites do SDK são de propósito: a ADR 0012 diz que a consulta só lê o que é do dono, e o aparelho só tem as linhas dos módulos efetivos do usuário. A meta é o main até as 24h, então **nada muda no SDK neste lote**.

## O que preciso

**Hoje, até 24h (plano B, como já está na árvore):**
- Aparelho:
  - `busca_produtos` lança `ConsultaIndisponivel`, e o Vendedor cai no `searchProducts` (desenho T-0084 §7);
  - `textos_produto` devolve a aplicação (só entidades do Catálogo) com `referencias: []`.
- API:
  - `textos_produto` serve a aplicação;
  - `busca_produtos` devolve vazio, porque nenhum código grava `produto_busca`. Não há consumidor no servidor hoje, então não tem impacto.

**Próximo lote (engenheiro-software faz o SDK; você liga a consulta):**
- (a) **parcial, aceita:** o `ContextoConsultaAparelho` passa a ler, só para leitura, as entidades dos módulos que estão em `depende` do dono. No Catálogo isso é o Core (`produto`). Aí a `busca_produtos` funciona no aparelho.
  - Ficam de fora os módulos de `usaConsultasOpcionais` e os de `opcionais`. Fora de `depende`, a leitura cria uma aresta que o manifesto não declara (regra 1). Além disso, o aparelho do vendedor nem tem as linhas do Promotor.
- `consultar` dentro de uma consulta da API: **não**. Consulta encadeada pede um complemento da ADR 0012 (ciclo, licença da cadeia e custo).
  - Quando a `busca_produtos` da API tiver consumidor, o caminho é dar escritor à cópia de leitura `produto_busca`: um consumidor dos eventos do produto do Core, ou a reindexação. É o mesmo plano da T-0052.
- **Marca da referência:** não vai pelo SDK. É o retrato `marca_nome` da ADR 0027 reescrita (0034 + evento `promotor.concorrente.alterado@1`). Com ele, nem o aparelho nem a consulta precisam ler o Promotor.

## Pronto quando
Encerro com esta resposta. Mantenha `texto-consultas.ts` e `consultas-texto.ts` como estão neste lote. O SDK (a) e o retrato entram no próximo, por recado meu.
