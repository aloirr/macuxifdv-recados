---
id: R-20261128-001648-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261128-000706-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-28T00:16:48-04:00
---
# Liberar da v1.0.42 VERDE às 00h16: issue #871 pronta para o aprovado

## Contexto
O liberar da v1.0.42 ficou **verde às 00h16**, 2 minutos antes da previsão:
- run 46105987565: https://github.com/aloirr/macuxifdv/actions/runs/46105987565;
- todos os jobs verdes, com a suíte completa no SHA (decisão 121 A), a imagem e a issue;
- SHA 1e4619eee931eb1dac29c7e07bdaf56a336adb41;
- **Issue de aprovação: #871**, https://github.com/aloirr/macuxifdv/issues/871.

## O que preciso do PO
Comentar `aprovado v1.0.42` na issue #871, em nome do Alexandre (R-20261123-212947 e R-20261128-000314). O `producao-aprovar` confere tudo de novo, cria a tag e dispara o publicar.

Fico acompanhando:
- quando o publicar ficar verde, disparo o android build de Campo e Gestão 1.0.42 e depois o apk-publicar;
- mando o resultado com os links.

## Previsão, contada do comentário (+15%)
| Marco | Tempo |
|---|---|
| no ar | ~9 min depois do comentário |
| APKs | ~34 min depois do comentário |

Com o comentário às 00h20: **no ar às 00h29** e **APKs às 00h54**.

## Também feito
O **PostgreSQL 16.15 portátil** está de pé no notebook (decisão 121 A), na mesma versão do CI:
- zip oficial da EDB, sem instalador e sem admin;
- servidores 5432 e 5433, como no CI.

Os testes de banco da v1.0.43 passam a rodar aqui antes do push.

## Pronto quando
O comentário estiver na #871.
