---
id: R-20261105-225929-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:59:29-04:00
---
# stack-producao: resumo do passo 'estado final e logs' não falha mais com ensaio.log ausente

## Contexto
Run 42152902582 (job 127680120483, verificacao/lote-86 22cfac9): tudo passou, menos o passo 'estado final e logs (sempre)'. O laço for f in ... ensaio; do [ -f ] && echo; done termina com código 1 quando o último arquivo (ensaio.log) não existe, e o bash -eo pipefail derruba o passo.

## O que preciso / o que mudou
Feito em .github/workflows/stack-isolado.yml (arquivo de governança: entra no commit de governança do lote 86 com o trailer do Alexandre). (1) stack-producao, linha 497: [ -f ] && echo virou if [ -f ]; then echo; fi. (2) Mesmo erro latente no job stack (T-0074), passo 'estado final e logs', linhas 254 e 256: o laço termina em implantar-2 e o bloco termina em [ -f contagem-antes.txt ] && ...; se o job falhar antes, os dois davam código 1. Os dois viraram if. Revisei os outros passos: os [ ] && no meio de laços de espera (linhas 121, 222, 349) vêm seguidos de sleep, então não caem no mesmo erro. YAML validado com a lib yaml. verificar engenheiro-software: OK.

## Pronto quando
Pendência: db/backup/backup-dbaas.sh e db/backup/ensaio-restauracao.sh do banco-dados (R-20261105-224337) ainda não existem (em db/backup/ só backup-vm.sh, restaurar-vm.sh, backup.mjs, s3.mjs e contagem.sql). Até eles chegarem, o passo de backup do stack-producao fica pulado (::notice:: e exit 0) e o ensaio de restauração não roda. Critério: uma nova execução do stack-isolado no ramo de verificação com o job stack-producao verde.
