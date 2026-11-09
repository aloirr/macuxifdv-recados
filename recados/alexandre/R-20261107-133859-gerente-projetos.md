---
id: R-20261107-133859-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T13:38:59-04:00
---
# Status 14h45 (07/11): fila do time vazia; main em bf9df526; tudo o mais depende de você

## Contexto
Contexto: bloco das 11h às 14h45.

## O que preciso / o que mudou
Subiu ao main, sempre com CI verde no commit exato: #96 (ad56fa09), #95 (7a43e824) e #97 (4694563d); o lote do build d1e0d2ad (atalho Ver por linha, pendências do Resumo, os dois diffs da T-0091 com o seu trailer, a I2 da T-0089 com ordenação binária nos exemplos do Conector, a §4b do carga-arquivo.md, os seus recados); BUILD PRONTO d1e0d2a (R-20261107-124025); c7fd8431, com o desempenho da lista por linha (20 mil produtos: raiz de 1,4 s para ~60 ms) e os índices v4 do aparelho; bf9df526, com o Mostrar mais (100 por toque, toque duplo ignorado, TalkBack) e o cache limitado (21 MB → 1,3 MB). Esses dois últimos vão no próximo build.

## Pronto quando
Bloqueado/esperando você: 1. resultados do teste dos APKs d1e0d2a, incluindo a medição do critério 5 da T-0084; o próximo build sai de 2 a 3 h depois, com as correções; 2. secret DEMO_SUPERADMIN_CONVITE e hostname config-demo, depois demo — publicar e 1º acesso; 3. recursos de produção (T-0086); 4. o seu R-20261106-225242, que o guardião não me deixa commitar, e o dono da pasta .coord/recados/anexos/ (R-20261104-185608): os 4 anexos seguem fora do main e o verificar acusa por isso. | Pronto quando: você ler. O time fica parado até o seu retorno, salvo bug crítico.
