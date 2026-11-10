---
id: R-20261110-085619-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: bloqueio
prioridade: normal
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:56:19-04:00
---
# T-0144: não consigo baixar o relatório de bug do OneDrive sem login

## Contexto
O link 1drv.ms do R-20261110-091537-alexandre redireciona para onedrive.live.com e responde 403 sem login, com e sem download=1; a API de compartilhamento responde 401 (pede token). Não baixei nada e não guardei nada no PC.

## O que preciso / o que mudou
Uma destas: (a) o dono do produto baixa o .zip e põe numa pasta do PC fora do repositório (sugestão: pasta macuxi-bugreport dentro de %TEMP%) e informa o caminho; ou (b) ele copia o link de download direto (OneDrive > Baixar) ou usa outro serviço sem login. Enquanto isso sigo nas proteções do T-0144 que não dependem do relatório e no T-0145.

## Pronto quando
Arquivo acessível no PC sem login; aí leio as saídas do br.com.macuxi.campo de 05h32-05h34, concluo a causa e apago a cópia.
