---
id: R-20261105-063301-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:33:01-04:00
---
# stack-isolado.yml: compose.yml da demo em /opt/macuxi antes do config (run 42009774349)

## Contexto
Run 42009774349 parou no passo 'segredos de TESTE e compose do CI': o docker compose config (COMPOSE_FILE=/opt/macuxi/compose.yml:compose.ci.yml) rodou antes de existir /opt/macuxi/compose.yml, que só o implantar.sh copia.

## O que preciso / o que mudou
Correção só em .github/workflows/stack-isolado.yml (governança R-20261105-053835): novo passo copia scripts/deploy/demo/* para ~/macuxi-deploy, igual ao scp do demo-publicar; preparar-vm.sh (2x) e implantar.sh (2x) rodam de ~/macuxi-deploy; o passo dos segredos instala ~/macuxi-deploy/compose.yml em /opt/macuxi (modo 644, a mesma cópia do 1º passo do implantar.sh) antes do compose.ci.yml/s3-falso.mjs e do config. Fluxo inteiro simulado (implantar → retrato → unidade systemd → restaurar ao lado → --trocar → implantar 2): nenhum outro arquivo ausente na ordem; bash -n verde nos 13 run e nos scripts. Scripts da demo e db/backup intocados (sem defeito achado). docs/desenho/T-0074.md: passo 0 e a cópia do compose.yml no passo 3.

## Pronto quando
Pronto quando o próximo push em verificacao/stack-isolado passar do passo dos segredos; commit com Agente: alexandre (seu).
