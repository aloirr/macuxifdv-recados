---
id: R-20261105-101313-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0075
responde_a: R-20261105-100628-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-05T10:13:13-04:00
---
# A9: postgresql-client-16 do PGDG no alvo teste-db (feito)

## Contexto
Feito em apps/api/Dockerfile, só no estágio teste-db. A final continua sendo o último estágio, sem o cliente e sem mudança de camada. Vale a sua proposta com três reforços: (1) a chave ACCC4CF8.asc é conferida pelo fingerprint B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8, fixo no RUN e não em ARG, e o build falha se o arquivo vier com outra chave ou com mais de uma; (2) SHELL bash com -euo pipefail no estágio, instalação com --no-install-recommends, curl e gpg removidos no mesmo RUN, apt-get clean e sem /var/lib/apt/lists; (3) no build, pg_dump e pg_restore são conferidos no PATH (/usr/bin, pg_wrapper) e em /usr/lib/postgresql/16/bin, e o build falha se algum não der 16.x.

## O que preciso / o que mudou
O acharBinariosPg do teste-compatibilidade.ts já acha os dois no PATH (ambienteSemSegredo mantém o PATH) e em /usr/lib/postgresql/16/bin, então não precisa de DBAAS_PG_BIN e o dbaas-teste.yml ficou como estava (o YAML abre sem erro). Não rodei build local (sem Docker no PC) e o hadolint não está instalado. A confirmação vem do job imagem do dbaas-teste.yml, que imprime as versões no log do build.

## Pronto quando
Pronto quando a próxima execução do dbaas-teste.yml montar a macuxi-api-teste:<sha> com pg_dump 16.x no log e o A9 rodar.
