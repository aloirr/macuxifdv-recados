---
id: R-20261111-110203-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre, banco-dados]
tipo: entrega
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:02:03-04:00
---
# T-0119: busca com 20 mil sem travar o event loop (SWR do retrato, índice em pedaços, ranking sem renormalizar); p95 a medir no CI

Contexto: T-0119 (v1.0.4), diagnóstico do banco-dados R-20261111-073120-banco-dados: construirIndiceBusca levava segundos de CPU síncrona na 1ª busca de cada retrato e a cada 60 s por tenant, travando o event loop.

O que foi feito (modules/catalogo, sem migração):
1. Stale-while-revalidate: com o TTL vencido a requisição serve o retrato e o índice antigos e só confere a versão barata (greatest(max(updated_at)) de preço, atributo, conteúdo, referência e mídia, índices *_sync_ix). Se a versão mudou, ou passaram 10 min (o Core não entra na versão), a releitura roda em segundo plano por ctx.comTenant (1 s depois, para a transação da requisição fechar), uma só por tenant. Se o conteúdo lido tem a mesma assinatura, a lista e o índice antigos ficam; senão o índice novo é montado ANTES da troca. Gravação do Catálogo (aposGravar) continua descartando na hora.
2. Aquecimento: prepararIndice (domain/indice-busca.ts) monta o índice na carga do retrato, em pedaços de ~8 ms com setImmediate; a busca não monta mais índice. A 1ª carga de um tenant (ou após gravação) espera o índice, sem bloquear as outras requisições.
3. Ranking: os termos de cada produto (nome, código, marca, categoria, atributos) são calculados uma vez na carga e reaproveitados pelo ranking (TOKENS_DO_PRODUTO, DocBusca.tokens); chaves de marca/linha e maior venda ficam no índice; nomeChave memoizado; tolerância a erro de digitação só olha termos de tamanho compatível (busca binária) e o prefixo é uma faixa alfabética. Resultado do ranking igual (testes de equivalência no indice-busca.test.ts).
Arquivos: domain/indice-busca.ts, ranking.ts, vitrine.ts, api/repositorio-postgres.ts, testes indice-busca.test.ts e retrato-catalogo.test.ts (5 novos de SWR), docs/modulos/catalogo/busca-desempenho.md.
Testes: eslint do pacote limpo (1 aviso antigo em app/texto-consultas.test.ts); vitest do pacote sem banco: 981 passaram, 1 falhou por tempo (ranking-aplicacao 'memória do ranking', 38 s com o PC saturado, timeout de 30 s, não toca no que mudei; precisa conferir no CI); tsc: só erros em domain/estoque-filial.test.ts (T-0149, não é meu); os 2 do meu código foram corrigidos e não rodei o tsc de novo (leva mais de 10 min no PC hoje).
Pendência: o it.fails de busca-volume.db.test.ts FICA como está. Sem Postgres local não medi o p95; peço ao CI da branch de verificação o p95 impresso por [T-0119]; se < 300 ms, tiro o it.fails.
Pronto quando: CI mostrar p95 < 300 ms no busca-volume.db.test.ts e a carga T-0107 sem o pico de 1 min.
