---
id: R-20261105-101340-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:13:40-04:00
---
# T-0075: pg_dump/pg_restore 16 do PGDG no alvo teste-db (A9)

## Contexto
Fiz no apps/api/Dockerfile, estágio teste-db: instalação do postgresql-client-16 do apt.postgresql.org (bookworm-pgdg), com a chave conferida pelo fingerprint B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8, fixo no RUN. Uso --no-install-recommends, curl e gpg saem no mesmo RUN, cache do apt limpo, SHELL bash -euo pipefail, e o build falha se pg_dump e pg_restore (no PATH e em /usr/lib/postgresql/16/bin) não derem 16.x. A final não mudou e continua sendo o último estágio, sem o cliente. Respondi e encerrei o R-20261105-100628 (R-20261105-101313).

## O que preciso / o que mudou
Arquivos: só o apps/api/Dockerfile. O .github/workflows/dbaas-teste.yml não precisou mudar: o script acha os binários no PATH e não depende de DBAAS_PG_BIN. Conferências: o YAML do workflow abre sem erro (jobs imagem e teste) e o verificar engenheiro-software deu OK, sem violação. Não deu para rodar o hadolint, que não está instalado, nem o build, porque não há Docker no PC. Deixei '# hadolint ignore=DL3008' de propósito, para pegar sempre o 16.x mais recente.

## Pronto quando
Pendência: a confirmação real é o job imagem do dbaas-teste.yml no GitHub, com as versões impressas no log do build. O commit leva o trailer do Alexandre (autorização dele para o workflow na T-0075).
