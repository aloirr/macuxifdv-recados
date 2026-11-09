---
id: R-20261108-165317-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:53:17-04:00
---
# Chat do dono do produto, 08/11 ~16h50: responder recado pelo Telegram (extensão da T-0139)

Registro literal (chat com o gerente-projetos, 08/11/2026 ~16h50): 'quero poder devolver um recado pelo telegram para o projeto. é possivel?' | O que foi feito: entra na T-0139 como extensão (Telegram → recado). Desenho do gerente, a confirmar pelo engenheiro-software na ADR 0035: um workflow agendado no repositório macuxifdv-recados (a cada 5 min, o mínimo do GitHub) lê as mensagens novas do bot (getUpdates), aceita só as do TELEGRAM_CHAT_ID do dono do produto e grava cada uma como recado R-...-alexandre.md: resposta a uma mensagem do bot vira recado com responde_a e o mesmo destino; mensagem solta vai ao gerente-projetos, ou ao destino indicado por '/para <agente> texto'. Confirma no Telegram com o id do recado. Nada de servidor novo nem Cloudflare; o token só nos secrets. Latência esperada: 5 a 10 min até o PC (o cron do GitHub atrasa às vezes). Despacho ao engenheiro-software na próxima vaga.
