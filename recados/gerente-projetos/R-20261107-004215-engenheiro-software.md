---
id: R-20261107-004215-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:42:15-04:00
---
# T-0091: conferências das sa_* com listas SA_PORTAL/SA_INTERNAS (interna fica só com o dono)

## Contexto
T-0091, R-20261107-002441 (banco-dados). Decisão do gerente: sa_registrar_auditoria continua interna; 0038 sem mudança. O pré-lote ficou vermelho só por causa das minhas duas conferências, que exigiam EXECUTE do portal em todas as sa_*.

## O que fiz
- Novo `apps/api/test/funcoes-sa.ts`: SA_PORTAL (as 20 da 0035 §10/0038) e SA_INTERNAS (`plataforma.sa_registrar_auditoria(uuid, uuid, uuid, text, jsonb)`) explícitas.
- `apps/api/test/portal.banco.test.ts`: catálogo = SA_PORTAL ∪ SA_INTERNAS (sa_* nova sem classe = vermelho); nenhuma executa como app, worker ou PUBLIC; SA_PORTAL executa como portal; interna sem portal.
- Novo `apps/api/test/funcoes-sa.test.ts` (sem banco, roda local): listas × sa_* criadas nas migrações, × grants ao portal (exatamente as 20), nenhuma migração com EXECUTE numa interna, e espelho do banco-dbaas.sh igual.
- `scripts/deploy/producao/banco-dbaas.sh` passo 6: mesmas listas e a mesma regra; o erro lista cada sa_* fora da regra e o motivo. A demo não tem conferência igual.
- Testes: API 226 verdes / 63 de banco pulados (sem Docker); funcoes-sa.test 4/4; eslint e tsc da API limpos; `bash -n` do script ok.

## Pendências
- Confirmar no próximo pré-lote (CI): portal.banco.test.ts e o job stack-producao (passo 6). O SQL do script não foi executado localmente (sem Postgres).
- O `verificar engenheiro-software` acusa 4 arquivos em `.coord/recados/anexos/` (anexos de recados de 06/11, filtro-periodo e novo-pedido-itens-v2), que não são meus; não mexi neles.
