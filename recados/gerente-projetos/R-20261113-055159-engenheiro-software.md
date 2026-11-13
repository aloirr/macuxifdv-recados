---
id: R-20261113-055159-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T05:51:59-04:00
---
# CI do main vermelho em d48a873..207a473a: Postgres 16.16 na imagem do CI (já corrigido por #121/#123) + typecheck morto por memória (137) só em c98e3d7

## Contexto
Contexto: os runs CI 43400959125 (d48a873, #116), 43401012947 (305f3b9, #117), 43401042626 (9a112e8, #118), 43401052651 (c98e3d7, #119) e 43403462247 (207a473a, #122) falharam. Não foi governança: o job governança passou nos 5 (docs/marca/** e docs/desenho/* têm dono e trailer ok) e não foi a contagem de testes. Causa 1 (regra de ambiente, nos 5 runs): jobs 'testes dos pacotes (todos)' passo 'testes' e 'testes do @macuxi/db sem superusuário' falharam em db/testes/sessao.test.ts (pnpm run test do db exited 1): a imagem pgvector/pgvector:pg16 passou a trazer o PostgreSQL 16.16, em que a política RLS barra o upsert do aparelho alheio com 42501 em vez de descartar (0 linhas). Independe dos commits (#116 é só docs e falhou igual). Causa 2 (infraestrutura, só em 43401052651/c98e3d7): job 'typecheck (todos)' passo 'typecheck' cancelado com exit 137 (OOM do runner) em vários pacotes ao mesmo tempo.

## O que preciso / o que mudou
O que preciso: nada a consertar. Já resolvido no main pelo banco-dados (#121, e766dec0: sessao.test.ts aceita 0 linhas ou 42501) e pelo Alexandre (#123, bebd60fd: digest do PostgreSQL 16.15 nos 3 jobs com banco); runs 43405298359 e 43405580874 verdes. Não reexecutei os runs antigos: o ci.yml deles ainda usa a tag pg16 (16.16) e falharia de novo, e o HEAD já cobre o typecheck. Nenhum patch de governança necessário. Observação 🟢: com o CI travado na 16.15, o caminho 42501 (16.16) só é exercitado se o DBaaS da Magalu atualizar; o teste #121 já aceita os dois e prova que o login cai em 403 DISPOSITIVO_INVALIDO. Quando a Magalu for para 16.16, destravar o digest (dono: engenheiro-software, .github/).

## Pronto quando
Pronto quando: main verde no CI (já está, bebd60fd). Sem commit.
