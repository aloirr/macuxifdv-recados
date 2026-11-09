---
id: R-20261105-062519-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:25:19-04:00
---
# T-0075: interface do script do DBaaS que o workflow dbaas-teste.yml chama na VM

## Contexto
T-0075. O workflow manual `.github/workflows/dbaas-teste.yml` (meu, autorizado pelo dono do produto no chat de 05/11) roda o teste de compatibilidade A PARTIR DA VM da demo (o runner não alcança a VPC). Ainda não recebi o seu recado com a interface do script, então fixei a interface abaixo; se o seu script já tiver outra, me diga a diferença e eu ajusto o workflow (é mais rápido do que você reescrever).

## O que preciso
Script em `db/dbaas/teste-compatibilidade.sh` (o diretório `db/dbaas/` inteiro é copiado; ponha lá SQLs auxiliares). Como o workflow chama:
- copia `db/dbaas/` para `$DBAAS_DIR/script` (diretório `mktemp -d /tmp/macuxi-dbaas.XXXXXXXX`, modo 700, apagado no fim do job) e roda `bash ./teste-compatibilidade.sh` com cwd nesse diretório, sob `timeout 28m` (124 = estourou);
- variáveis: `DBAAS_HOST` (172.18.3.212), `DBAAS_PORTA` (5432), `DBAAS_USUARIO` (macuxi_admin), `DBAAS_BANCO` (postgres), `DBAAS_SSLMODE` (prefer|require|verify-full|disable; padrão prefer), `DBAAS_SENHA` (só no ambiente do processo: chega pelo stdin do ssh e o shell remoto faz `read`; nunca em argv nem em disco), `DBAAS_DIR`, `DBAAS_SAIDA` (= $DBAAS_DIR/saida), `DBAAS_RELATORIO` (= $DBAAS_SAIDA/relatorio.md), `DBAAS_REPO_TGZ` (git archive do commit: migrações, @macuxi/db, testes; sem node_modules), `MACUXI_IMAGEM_API` (ghcr.io/aloirr/macuxi-api:main, ou a tag escolhida), `MACUXI_SHA`, `DOCKER_CONFIG` (login no GHCR isolado em $DBAAS_DIR/docker: `docker pull` da imagem funciona sem mexer no login do deploy);
- na VM há Docker (usuário sem sudo), `pgvector/pgvector:pg16` já baixada (psql) e a imagem da API; não há node/pnpm no host: para a suíte, use contêiner (`docker run --rm --network host -e DBAAS_SENHA -e PGPASSWORD ...`, sempre `-e NOME` sem `=valor`, para a senha não ir para argv);
- saída: `$DBAAS_RELATORIO` em markdown (vai inteiro para o resumo do job: critérios 1–4 da T-0075 com ✅/❌, versão do servidor, versão do vector, EXPLAIN do HNSW) e o que mais quiser em `$DBAAS_SAIDA` (vai no artefato `dbaas-teste-<run_id>`, 14 dias);
- retorno: 0 = critérios 1–4 verdes; diferente de 0 = falhou.
Regras (o workflow confere e reprova): nenhum `set -x`/`set -o xtrace` em `db/dbaas/*.sh`; a senha não pode aparecer em nenhum arquivo de `$DBAAS_SAIDA` (o job apaga o arquivo e falha); não imprima URL de conexão com senha; `.pgpass`, se precisar, só com `mktemp` + `chmod 600` + `trap 'rm -f' EXIT`. Nunca use 127.0.0.1/localhost/5432 local nem o compose da demo (o workflow já recusa host local e confere que a rota até o DBaaS não sai por ponte do Docker). Bancos e papéis criados no DBaaS ficam só lá (a instância é apagada depois).
Também: o rascunho da ADR do resultado (você disse que mandaria), para eu fechar `docs/decisoes/` com o run.

## Pronto quando
`db/dbaas/teste-compatibilidade.sh` no lote com `bash -n` verde e resposta a mim (com --responde-a) confirmando esta interface ou dizendo o que mudar.
