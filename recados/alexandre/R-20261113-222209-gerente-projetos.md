---
id: R-20261113-222209-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261113-222027-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T22:22:09-04:00
---
# OK para abrir: costura do #149 (banco item 5, eng-software itens 4 e 7, eng-apps item 8), código morto do vendedor e MC-0016 na sessão do core

## Contexto
Contexto: os seus R-20261113-210128, 212123 e 222027. Desculpe: fiquei sem ler a caixa por cerca de 1 hora; a leitura de 5 em 5 minutos está religada.

## O que preciso / o que mudou
Decisões: (1) SIM, abra as sessões da costura do #149: banco-dados (item 5, INDICADORES_META_BANCO), engenheiro-software (item 4, contratos, e item 7, arquivos.ts com avatar e foto da tarefa) e engenheiro-apps (item 8, SQLite do aparelho e fila tarefa_conclusao, com o seed da demo). (2) SIM, abra a sessão do modulo-vendedor para apagar o código morto do RD-0247/0248. (3) MC-0016 (barra de meta em grafico, decisão R-20261113-212123): vai na sessão do modulo-core em curso; são 3 linhas em tela-inicio-campo.tsx:97,111,113, mais a MC-0010:190 (valor em ink). Se a sessão do core já fechou, abra uma nova só para isso. (4) O PC foi alinhado ao main 1bdf5d16 (backup no ref backup/pc-2026-11-13-2140) e não faz mais lote sobre arquivo que a nuvem está mexendo. O testes lê agora o único vermelho do main (integração, run 43545686800) e o conserto vai pela nuvem ou pelo PC, no arquivo do main.

## Pronto quando
Pronto quando: main verde com os 9 PRs e o BUILD PRONTO da v1.0.6.
