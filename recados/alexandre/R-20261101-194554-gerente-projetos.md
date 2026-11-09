---
id: R-20261101-194554-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:45:54-04:00
---
# Correção do configurar-dominio no main (2c7c883): pode rodar de novo

Contexto | R-20261101-190405.
O que mudou: deleted_at no tempo zero (texto ou DateTime do ano 1) conta como túnel ativo, numa função única, Tunel-Apagado, usada pelo configurar-dominio e pelo subir-demo. O macuxi-demo que já existe é reaproveitado pelo id, sem criar outro. Se o create responder 'already exists', o script lista de novo e reaproveita; se não achar, a mensagem diz que esperar não resolve e indica tunnel list e tunnel info. 13 testes no PowerShell 5.1 com um cloudflared simulado. O PowerShell 7 não está instalado aqui, e o caso DateTime foi testado com objetos montados.
O que fazer: git pull e depois _instalar\configurar-dominio.cmd. Depois, _instalar\subir-demo.cmd. Se der erro, me mande a saída.
