---
id: R-20261105-224337-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:43:37-04:00
---
# T-0086: backup-dbaas.sh e ensaio-restauracao.sh para a produção (DBaaS, pgcliente, bucket macuxi-prod, 30 dias)

## Contexto
T-0086 (produção às 8h de 06/11). O compose de produção está em `scripts/deploy/producao/` (ADR 0028, desenho `docs/desenho/T-0086.md` §3). Não há Postgres local: o banco é o DBaaS, por IP privado e sempre com TLS. O admin do DBaaS não tem SUPERUSER nem BYPASSRLS e herda o `macuxi_manutencao` (0031).

O que já existe do meu lado:
- `banco-dbaas.sh`, idempotente e rodado em todo deploy:
  - confere a rota, o TLS (`pg_stat_ssl`) e os privilégios do admin;
  - `create database macuxi` se falta;
  - `create extension if not exists vector` (>= 0.8);
  - `banco migrar up` (B0 + 0031 + migrações);
  - confere `macuxi_app`/`macuxi_worker` (LOGIN, sem SUPER/BYPASSRLS, fora do manutencao), a herança do admin e o `conferir-rls.sql` = 0.
- serviço `pgcliente` (`pgvector/pgvector:pg16`, psql/pg_dump/pg_restore 16): admin do DBaaS por PG* no ambiente (senha nunca no argv), `PGDATABASE=macuxi`, `PGSSLMODE` require ou verify-full com `PGSSLROOTCERT=/certs/dbaas-ca.pem`;
- serviço `backup` (`db/backup/backup.mjs`): bucket `macuxi-prod`, prefixo `backups/`, `MACUXI_BACKUP_DIAS=30`;
- timer `macuxi-backup.timer`, às 06:15 UTC, rodando `/opt/macuxi/backup/backup-dbaas.sh` como o usuário de deploy (`ConditionPathExists`: sem o script, a unidade é pulada sem erro);
- o `implantar.sh` copia da imagem publicada `/app/db/backup/{backup-dbaas.sh,ensaio-restauracao.sh,contagem.sql}` para `/opt/macuxi/backup` (700/700/600);
- workflow manual `producao-ensaio-restauracao.yml` (environment PRODUCAO), que chama `/opt/macuxi/backup/ensaio-restauracao.sh [ultimo|<chave>]`;
- job `stack-producao` no `stack-isolado.yml`: Postgres 16 de teste com TLS obrigatório e admin sem superusuário. Ele roda os dois scripts assim que estiverem na imagem.

## O que preciso
1. **`db/backup/backup-dbaas.sh`**, rodado no host em `/opt/macuxi`, com `dc() = docker compose --env-file .env --env-file imagens.env --profile ferramentas`:
   - `dc run --rm -T pgcliente pg_dump -d macuxi -Fc -Z 6 --enable-row-security > tmp` (critério 4 da ficha: `--enable-row-security`);
   - `pg_restore -l` para conferir o dump;
   - a contagem do momento do dump (`contagem.sql` pelo `pgcliente`), guardada junto do dump no bucket (objeto irmão ou metadado: a escolha é sua);
   - `dc run --rm -T backup enviar < tmp` e a poda de 30 dias.

   Sem segredo no log, saída != 0 em qualquer falha e a linha final `[backup-dbaas] ... pronto`. Respeite `MACUXI_CONFERIR_ROTA` (o CI usa 0) se fizer alguma checagem de rota.
2. **`db/backup/ensaio-restauracao.sh [ultimo|<chave>]`**:
   - baixa o dump (sha256);
   - cria `macuxi_ensaio_<UTC>` no DBaaS e roda `pg_restore --exit-on-error --single-transaction` pelo `pgcliente`;
   - compara o `contagem.sql` da base restaurada com a contagem gravada no backup;
   - **apaga a base temporária sempre** (trap), sem nunca tocar o `macuxi`;
   - linha `[ensaio] resultado: IGUAL ...` e código 0, ou `[ensaio] resultado: DIFERENTE ...` e código != 0. O workflow e o CI procuram exatamente `^\[ensaio\] resultado: IGUAL`.
3. Sua opinião (resposta curta) sobre a extensão `vector`: deixo no `banco-dbaas.sh` (hoje nenhuma migração a cria), ou você prefere uma migração `create extension if not exists vector`? Se for migração, o script continua, porque o `if not exists` não faz nada.
4. Se puder, confira em `scripts/deploy/producao/banco-dbaas.sh` se as conferências batem com o B0 e a 0031. O script é meu; me mande os achados.

## Pronto quando
Os dois scripts estão no `main`, com teste (pode ser o padrão do `backup.test.ts`). O job `stack-producao` sai verde com os passos "backup de produção" e "ensaio" rodando, e não pulados com notice. Recado de resposta com a interface final, se mudar algo da interface acima.
