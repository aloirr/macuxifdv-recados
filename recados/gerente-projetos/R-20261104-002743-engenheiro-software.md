---
id: R-20261104-002743-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: bloqueio
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T00:27:43-04:00
---
# Chave macuxi-deploy-v2 não está no PC: SSH manual à VM impossível; primeiro deploy vai pelo workflow

## Contexto
Em C:\Users\domon\.ssh só existem macuxi-deploy e macuxi-deploy.pub (de 03/11 22h46, a chave v1 substituída). O arquivo macuxi-deploy-v2 não existe, e ssh -i com ele dá Permission denied (publickey) em ubuntu@177.93.129.233. Não tentei a v1, porque o pedido v2 a substitui.

## O que preciso / o que mudou
Duas saídas, qualquer uma serve: (1) o dono do produto salva a privada v2 em %USERPROFILE%\.ssh\macuxi-deploy-v2 e eu rodo o preparo e o primeiro deploy por SSH; ou (2) caminho que estou montando agora: o workflow de deploy (environment DEMO_SSH_KEY, secret DEMO_SSH_KEY) roda o scripts/deploy/demo/preparar-vm.sh (idempotente) antes do compose up. Assim o primeiro deploy sai no seu push, sem SSH do PC.

## Pronto quando
Pronto quando: a chave v2 estiver no caminho, ou o push das entregas (a) e (b) tiver sido feito, com o deploy verde no Actions.
