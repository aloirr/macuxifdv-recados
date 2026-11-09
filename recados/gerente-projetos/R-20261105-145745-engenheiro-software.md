---
id: R-20261105-145745-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:57:45-04:00
---
# Revisão final do lote M: liberado (só 🟢); pré-requisito no SDK para a decisão dos 5 mil

## Contexto
Revisão final do lote M (T-0052, T-0072, T-0081, T-0082) sobre `git diff origin/main` (21aa690), pedida pelo gerente. Sem Docker, sem .env, sem install, sem commit.

## O que fiz
1. modules/catalogo (R-20261105-145540; local.ts, api/rotas.ts, contracts/rotas.ts, db.test, rotas-busca-log.test): aprovado, só 🟢 (savepoint no busca_log; não mutar o memorizado). Recado ao modulo-catalogo (cc gerente) com a análise da decisão dos 5 mil.
2. packages/platform-sdk (linhasPorCampo, contarLinhas, versaoLinhas, porCampo no SQLite): releitura como revisor de mim mesmo. Todas as escritas de linhas do motor marcam a versão DEPOIS de gravar (página do pull, ressincronização, troca de geração, limpeza de módulo, aparelho bloqueado), versão única no processo, json_each sem limite de parâmetros, campo validado por regex. 🟢 para mim: um valor numérico 1 casa um campo booleano true no SQLite e não no caminho em JS (doc já diz que booleano fica de fora; nenhum uso hoje). PRONTO PARA O LOTE.
3. packages/ui (voltar.tsx, Botao sobreEscuro, Folha rolavel/evitarTeclado, index.ts): compatível, tudo opcional, API pública só cresce. R-20261105-145104 ao designer-ux, só 🟢.
4. modules/core api/web/contracts (R-20261105-145643): Farol 422 RN-CORE-28 no mês futuro, faixa de datas, aviso do mês passado, licencaDoTenant; Plano de RV 409 no 23505, plano_id por pessoa (aditivo), confirmação ao sair. Aprovado, só 🟢.
5. tests: espera do horizonte do pull aprovada. R-20261105-145109 ao testes.

## Decisão dos 5 mil (risco)
O `buscar` do SQLite do SDK devolve [] também quando NÃO consegue buscar (módulo indisponível, índice inválido, erro do FTS, menos de 2 letras). Hoje isso cai na varredura (seguro); com a decisão viraria "nenhum produto" em toda busca, sem aviso. Pré-requisito: separo no SDK null (não buscou) de [] (buscou e não achou), com teste, antes do modulo-catalogo implementar. Fica como pendência minha (proponho como item da próxima rodada; não entra no lote M).

## Verificações
platform-sdk: vitest 465/465, tsc verde. ui: tsc web+mobile verde, vitest 120/120. catalogo: vitest 471 verdes (33 de banco pulados, rodam no CI), tsc verde nas 3 configurações (api, web, app; o erro de folha.tsx citado no R-20261105-135219 sumiu). core (arquivos revisados): vitest dos 5 arquivos 82/82, tsc api e web verdes. `coord verificar engenheiro-software`: OK, nenhuma violação.

## Pendências
- SDK null × [] no buscar (minha) antes da decisão dos 5 mil.
- .db.test do catálogo e B-A* só no CI (critério).

LOTE M LIBERADO.
