---
id: R-20261106-063426-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T06:34:26-04:00
---
# SDK pronto: ctx.buscarComDesfecho na C9 do aparelho e gancho versaoDocumentos (faixas abertas); 🟡 2 e o 🟡 da virada do ano de R-20261106-042933

## Contexto
T-0084, critério 5 (20 mil produtos com aplicação longa, busca offline com p95 < 300 ms) e os 🟡 2 (C9 sem pré-seleção FTS5) e das faixas abertas de R-20261106-042933. O SDK ganhou as duas peças. Nada mudou no Catálogo: as duas são aditivas e opcionais, e o comportamento de hoje continua até vocês usarem.

## O que mudou no SDK (API exata)
1. **Busca no contexto da consulta do aparelho** (`packages/platform-sdk/src/consultas.ts`):
   `ContextoConsultaAparelho.buscarComDesfecho(indice: string, consulta: ConsultaTexto): Promise<DesfechoBusca>`
   - É o mesmo `motor.buscarComDesfecho` que a aba usa: FTS5 no SQLite, `bm25` com os pesos do índice, `MATCH ?` por parâmetro, até `consulta.limite` resultados (padrão 200, teto 500).
   - Só aceita índices do próprio módulo: o id precisa começar com `catalogo.`. Índice de outro módulo = `Error` de programação. Índice `catalogo.*` não registrado = `Error` "não registrado".
   - Sem SQLite (AsyncStorage/memória) volta `{ buscou: false, motivo: 'sem_busca' }`. Com `buscou: false`, varra tudo, como a aba já faz.
   - Com isso, `LeitorLocal` (app/lib/local.ts) é satisfeito pelo `ctx`. Na C9 (app/texto-consultas.ts), troque o cast por `const leitor: LeitorLocal = ctx` e passe o universo por `preselecionar(leitor, filtros.text, filtros.code?.value ?? null, sinonimos, produtos.length)`, igual ao `buscarLocal`. A regra dos 500 (LIMIAR_PRESELECAO_FTS), dos 400 candidatos e do vazio acima de 5.000 fica igual à da aba.
2. **Gancho de reindexação marcada** (`packages/platform-sdk/src/busca.ts`, `IndiceBusca`):
   - `documento(chave, ler, ctx: ContextoIndice)`: terceiro parâmetro novo, `ContextoIndice = { agora: Date; fuso: string }`. `agora` é o relógio do armazenamento; `fuso` é o fuso IANA do tenant que veio no login (`usuario().fuso`). Sem fuso no login, vale `FUSO_PADRAO_TENANT` ('America/Manaus').
   - `versaoDocumentos?(ctx: ContextoIndice): string`: versão opaca dos documentos, calculada só do `ctx`. Sugestão: `` `v3:${localIsoDate(ctx.agora, ctx.fuso).slice(0, 4)}` `` (`@macuxi/comum/fuso`), com o formato do documento e o ano civil no fuso do tenant.
   - Quando a versão muda em relação à guardada (`_busca:catalogo.produto:versao`), o SDK marca o índice e o reindexa inteiro das linhas locais em segundo plano. Isso cobre a virada de ano no fuso do tenant e um app novo com outro formato de documento. Enquanto isso, as buscas respondem com os documentos antigos e o fim do sync espera a reindexação terminar. O motor confere a versão antes de cada busca, no início de cada pull de entidade e antes do `finalizar`.
   - Índice com documentos e sem versão guardada (primeira abertura do app atualizado) é reindexado uma vez, em segundo plano.
   - Em app/indice.ts, troque `anoDoIndice()` (que usa criarRelogio) por `ctx`: `expandirAplicacao(conteudo?.aplicacao, { anoAtual: anoDe(ctx) }).textoIndice`. Declare `versaoDocumentos` com o mesmo `anoDe(ctx)`. A função precisa ser pura e barata, porque roda a cada busca.
   - **Memorize o formatador por fuso.** Um `Intl.DateTimeFormat`/`localIsoDate` por documento custou 1,5 ms por documento no teste, ou 30 s de reindexação em 20 mil. Use um formatador por fuso, ou calcule o ano uma vez por documento e só quando houver faixa aberta.
3. **Consulta FTS5 no SQLite mais barata** (sem mudança de assinatura): os `limite` melhores saem do FTS antes de ler a tabela de documentos. Num empate exato no corte, fica o menor `rid` (antes ficava a menor chave). A ordem devolvida continua `pontuacao`, `chave`.

## Desempenho medido (o que pesa no critério 5)
O custo do FTS5 é o `bm25` de cada documento que casa. Um termo denso sozinho ("uno", "gol", "2012", com ~65% de 20 mil) custa ~36 ms no node sem carga, e a união termo a termo do `preselecionar` paga isso uma vez por termo: 3 termos densos dão ~110 ms no node, ou 3 a 5 vezes mais no aparelho. O AND de todos os termos numa consulta só ranqueia a interseção e custa ~25 ms.
Sugestão para o `preselecionar` (domínio de vocês):
- primeiro todos os grupos juntos (`{ grupos, prefixoNoUltimo: true, limite }`);
- a união termo a termo só quando o AND trouxer menos que o necessário (ex.: < CANDIDATOS_POR_TERMO).
Quem casa todos os termos já vem primeiro no ranking do domain, então o conjunto final só muda quando o AND não basta. O teste do SDK mede exatamente esse caminho. Com a pré-seleção de hoje (sempre termo a termo), o p95 do teste passa de 300 ms com carga na máquina.

## Provas no SDK
packages/platform-sdk/src/consultas-busca.test.ts:
- C9 com o mesmo resultado (conteúdo e ordem) da aba, offline e com limite;
- índice de outro módulo dá erro, e o caso `sem_busca`;
- virada de ano em Manaus × São Paulo (03h30 UTC de 1º/1), em que "2027" passa a achar "2018 em diante";
- a busca não espera a reindexação;
- app atualizado reindexa uma vez;
- a marca do L-1 não é rebaixada;
- `versaoDocumentos` que lança não derruba a busca;
- o fuso do login chega à indexação;
- desempenho com 20 mil produtos de aplicação longa (~700 caracteres): pré-seleção pela consulta do aparelho, AND primeiro, com p95 < 300 ms, mediana de 5 voltas por frase e tempos divididos pelo fator da máquina, medido num bm25 de referência fora do código testado.

## Pronto quando
A C9 usa `preselecionar` com o `ctx` e o índice declara `versaoDocumentos`/usa `ctx` no `documento()`, com teste no módulo e a pendência do backlog (gancho antes de 2027-01-01) encerrada. A medição de p95 com o ranking do domain continua no APK de preview (tela de diagnóstico, engenheiro-apps). Observação: o motor do APK hoje usa AsyncStorage, sem `busca`, então a C9 e a aba varrem. O SQLite só existe na tela de medição. Respondam com --responde-a.
