---
id: R-20261105-062609-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:26:09-04:00
---
# T-0075: workflow manual dbaas-teste.yml (teste do DBaaS pela VM, senha só no ambiente do processo remoto)

## Contexto
T-0075, instrução do dono do produto (chat de 05/11): workflow manual que roda o teste de compatibilidade do DBaaS a partir da VM, com o secret `DBAAS_TESTE_SENHA` do environment `DEMO_SSH_KEY`. O commit leva o trailer do dono do produto, como você combinou.

## O que fiz
Arquivo: `.github/workflows/dbaas-teste.yml` (novo).
- Gatilhos: `workflow_dispatch` (inputs host 172.18.3.212, porta 5432, usuário macuxi_admin, banco postgres, sslmode prefer, imagem_tag main) e push em `verificacao/**` SÓ se mudar o próprio workflow ou `db/dbaas/**`. Concurrency próprio `dbaas-teste` (fora do `demo-vm`, para não cancelar deploy pendente). Limite 35 min no job, 28 min no remoto (`timeout`).
- environment `DEMO_SSH_KEY`, mesmo SSH do demo-publicar (DEMO_SSH_KEY/DEMO_HOST/DEMO_USER).
- Senha: `::add-mask::` (também a forma URL-codificada), vai pelo stdin do ssh e o shell remoto faz `read` → só no ambiente do processo; nada em argv nem em disco (runner e VM); nenhum `set -x` (o workflow também reprova `set -x` no script). Antes do upload, confere que a senha não aparece em nenhum arquivo de saída (se aparecer: apaga e reprova).
- Proteções da demo: recusa host local/127.x/o da VM; confere na VM (`ip route get`) que a rota até o DBaaS não sai por `docker*`/`br-*`/`veth*`/`lo` (a rede do compose não pode sombrear 172.18.x). Não toca no compose, no Postgres da demo, em /opt/macuxi nem em ~/.docker (login no GHCR com DOCKER_CONFIG isolado no diretório temporário).
- Diretório `mktemp -d /tmp/macuxi-dbaas.XXXXXXXX` (700) com `script/` (cópia de `db/dbaas/`), `saida/`, `repo.tar.gz` (git archive do commit); apagado em `always()`, assim como a chave do runner.
Validação: YAML conferido (parser, chaves únicas), 14 blocos `run` com `bash -n` verdes e o comando remoto simulado localmente (variáveis e código de retorno chegam; o detector de vazamento acha a senha). Nada rodou contra a VM; sem Docker.

## Como disparar
1º run (antes do main): push num `verificacao/**` que inclua o workflow e `db/dbaas/`. Depois: Actions → "DBaaS — teste de compatibilidade (T-0075)" → Run workflow. Se o environment `DEMO_SSH_KEY` tiver regra de branch (só main), o 1º run em `verificacao/**` vai parar no environment: nesse caso só pelo main.

## Como ler o resultado
Resumo do job: alvo, commit, código de retorno e o `relatorio.md` do script inteiro. Artefato `dbaas-teste-<run_id>` (14 dias): `execucao.log` + o que o script deixar em `$DBAAS_SAIDA`. Job verde = script devolveu 0 e nenhuma saída contém a senha.

## Pendências
- Depende de `db/dbaas/teste-compatibilidade.sh` (banco-dados): ainda não recebi a interface dele, então fixei a interface e mandei no R-20261105-062519-engenheiro-software (variáveis DBAAS_*, saída, retorno). Sem o script, o job falha cedo com erro claro.
- ADR do resultado: escrevo quando o run sair e o rascunho do banco-dados chegar.
