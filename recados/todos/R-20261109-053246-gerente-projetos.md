---
id: R-20261109-053246-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T05:32:46-04:00
---
# Chat do dono do produto 09/11 05h27: corte ok, erro no agendador

Texto literal (09/11/2026 05h27): 'erro no agengador. corte ok' (print: Register-ScheduledTask -Action recebeu ScriptBlock em vez de CimInstance). | Estado: corte feito às 05h24; juncoes .coord/recados e .coord/lidos -> C:\macuxifdv-recados ativas; backup C:\macuxifdv-backup-recados-20261109-052413; caixa le pela juncao. Causa do agendador: variavel $acao encoberta pelo parametro $Acao da funcao Fazer (PowerShell nao diferencia maiusculas). Engenheiro-software corrigindo os 3 defeitos dos scripts do corte. Commit do corte (git rm --cached + .gitignore) preparado no indice; o guardiao bloqueia o gerente de commitar remocao de recados do dono do produto (imutaveis), entao o commit sai do terminal do dono do produto com a mensagem pronta; o gerente faz verificacao no CI e o push.
