---
id: R-20261106-065737-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T06:57:37-04:00
---
# T-0084 critério 5 (SDK): busca FTS5 na consulta do aparelho, gancho versaoDocumentos (virada de ano no fuso do tenant) e teste de 20 mil produtos

## Contexto
T-0084, critério 5. Cobre os 🟡 2 (C9 sem pré-seleção FTS5) e da faixa aberta no índice local de R-20261106-042933. Só mexi em packages/platform-sdk, onde também fica o motor do app (motor-sync.ts), por causa do lote-e no CI. Não houve git nem Docker.

## O que fiz
1. `ContextoConsultaAparelho.buscarComDesfecho(indice, consulta)` (src/consultas.ts): é a mesma busca FTS5 da aba (`motor.buscarComDesfecho`), com limite (padrão 200, teto 500). Só aceita índices do próprio provedor (`<dono>.*`); índice de outro módulo dá `Error`. Sem SQLite, volta `sem_busca`. O motor liga isso em `FontesConsultaAparelho.buscarComDesfecho?`.
2. Gancho de reindexação marcada (src/busca.ts, src/busca-tipos.ts, src/sqlite/armazenamento.ts):
   - novos `IndiceBusca.versaoDocumentos?(ctx)` e `documento(chave, ler, ctx?)`, com `ContextoIndice = { agora, fuso do tenant }`;
   - `BuscaTextoSync.conferirVersoes?({ fuso })`;
   - versão diferente da guardada = marca `'versao'` e reindexa em segundo plano: a busca responde com os documentos antigos e o fim do sync espera;
   - a marca do L-1 (`true`) continua bloqueando e nunca é rebaixada;
   - índice com documentos e sem versão guardada (app atualizado) reindexa uma vez;
   - `versaoDocumentos` que lança vira `registrarErro` e não derruba a busca.
   O motor confere a versão antes de cada busca, de cada pull de entidade e do `finalizar`, usando o fuso de `usuario().fuso` (sem ele, `FUSO_PADRAO_TENANT`).
3. A consulta FTS5 do SQLite tira os `limite` melhores do FTS antes de ler a tabela de documentos: ~37% mais rápida com aplicação longa. Num empate exato no corte, fica o menor `rid`. A ordem devolvida não mudou.
4. Teste novo `src/consultas-busca.test.ts`, com 10 casos:
   - C9 igual à aba, inclusive offline;
   - índice de outro módulo e `sem_busca`;
   - virada de ano em Manaus × São Paulo;
   - a busca não espera a reindexação;
   - app atualizado;
   - L-1;
   - fuso do login;
   - busca em JS;
   - desempenho com 20 mil produtos de aplicação longa (~700 caracteres), pré-seleção com p95 < 300 ms. O teste é tolerante à máquina: os tempos são divididos pelo fator da máquina, medido num bm25 de referência fora do código testado, e vale a mediana de 5 voltas por frase. `MACUXI_FATOR_DESEMPENHO` dá folga extra.

## Testes
- SDK: typecheck e lint verdes; vitest com 41 arquivos e 557 testes verdes (a suíte inteira, com o de desempenho rodando em paralelo).
- apps/mobile: typecheck, lint e vitest (27 arquivos, 233 testes) verdes.
- modules/catalogo: typecheck e vitest de app/ (74) verdes.
- `verificar engenheiro-software`: nenhuma violação minha. As 4 apontadas são anexos novos do alexandre em `.coord/recados/anexos/` (dono: ninguém).

## Pendências
- **Para o critério 5 de verdade:** um termo denso sozinho custa ~36 ms de bm25 no node, e o `preselecionar` do Catálogo faz uma consulta por termo. Recomendei ao modulo-catalogo (R-20261106-063426 e complemento R-20261106-065630) fazer o AND de todos os termos primeiro e a união termo a termo só se faltar, além de adotar `ctx`/`versaoDocumentos` no app/indice.ts antes de 2027-01-01, com o formatador `Intl` memorizado.
- **O APK de hoje não tem SQLite no motor:** `apps/mobile/src/services/armazenamento.ts` usa AsyncStorage, sem `busca`, então a aba e a C9 varrem tudo. O FTS5 só existe na tela de medição. O p95 com 20 mil fica de pé só quando o motor do app usar o SQLite. Isso é do engenheiro-apps; vale abrir tarefa.
- **Registro do contrato, depois do lote-e** (não toquei por causa do lote): `.coord/contratos/modulos.md` (tabela "Leituras do motor") e complemento na ADR 0012 com `ctx.buscarComDesfecho`, `versaoDocumentos`/`ContextoIndice` e o top-k do SQLite.
- Chegou R-20261106-062452 (T-0087, #99/OpenAPI e protegerFormula). Ficou para a próxima rodada.

## Pronto quando
O gerente registra a entrega. O critério 5 fecha quando o Catálogo adotar a API e a medição for feita no APK com SQLite.
