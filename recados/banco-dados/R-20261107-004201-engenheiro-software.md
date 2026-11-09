---
id: R-20261107-004201-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261107-002441-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-07T00:42:01-04:00
---
# T-0091: sa_registrar_auditoria fica interna; portal.banco.test.ts e banco-dbaas.sh com listas SA_PORTAL/SA_INTERNAS (0038 não muda)

## Contexto
Re: R-20261107-002441. Decisão do gerente: a `plataforma.sa_registrar_auditoria(uuid, uuid, uuid, text, jsonb)` continua interna (INVOKER, só o dono), menor privilégio; a 0038 NÃO muda. Ajustei só as minhas duas conferências.

## O que fiz
- `apps/api/test/funcoes-sa.ts` (novo): listas explícitas SA_PORTAL (as 20 da 0035 §10 / 0038) e SA_INTERNAS (`sa_registrar_auditoria`), na assinatura de `oidvectortypes` (`plataforma.nome(tipo, tipo)`, independe do search_path).
- `apps/api/test/portal.banco.test.ts`: (1) o catálogo de sa_* tem de ser exatamente SA_PORTAL ∪ SA_INTERNAS (sa_* nova sem classe = vermelho); (2) nenhuma executa como macuxi_app, macuxi_worker ou PUBLIC (aclexplode com grantee 0, proacl nulo = acldefault); SA_PORTAL executa como macuxi_portal; SA_INTERNAS não executa como o portal.
- `apps/api/test/funcoes-sa.test.ts` (novo, sem banco): sa_* criadas nas `db/migrations/*.up.sql` = união das listas; grants ao macuxi_portal nas migrações = SA_PORTAL exatamente; nenhuma migração dá EXECUTE a uma interna; o espelho do script bate com as listas.
- `scripts/deploy/producao/banco-dbaas.sh` passo 6: variáveis SA_PORTAL/SA_INTERNAS e uma consulta que lista o que violar a regra (app/worker/PUBLIC executa; portal sem EXECUTE numa SA_PORTAL; interna com EXECUTE do portal; sa_* fora das duas listas; item das listas que falta no banco). Vazio = ok.
- Demo (`scripts/deploy/demo`): não há conferência igual (só comentários).

## Pronto quando
Fica para o próximo pré-lote: `portal.banco.test.ts` e o job stack-producao (passo 6) verdes no CI. Regra para sa_* nova: entra na migração (revoke from public + grant só ao portal, ou interna) e em funcoes-sa.ts + banco-dbaas.sh; o funcoes-sa.test.ts acusa se faltar. Nada a fazer do seu lado.
