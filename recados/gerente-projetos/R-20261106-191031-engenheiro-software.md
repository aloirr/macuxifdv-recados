---
id: R-20261106-191031-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-190547-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-06T19:10:31-04:00
---
# ci-ok do 56b89a1: job não iniciou por cobrança/limite de gastos do Actions (sem bug no CI); rerun após regularizar publica a demo

## Contexto
Investigação do run 42315477476 (push de 56b89a1 no main): 8 jobs verdes, ci-ok vermelho em 3 s, sem nenhum passo, rerun igual, "log not found".

## Causa (não é código nem governança)
A anotação do run (`gh run view 42315477476`, sem --log) diz, no job ci-ok:
"The job was not started because recent account payments have failed or your spending limit needs to be increased. Please check the 'Billing & plans' section in your settings".
Ou seja: o GitHub não entregou runner ao ci-ok porque a cota/limite de gastos do Actions da conta aloirr acabou durante esse run (os 8 jobs de 00:00 a 00:08 UTC consumiram o que restava; o ci-ok, último, entrou às 00:08 e no rerun às 00:11 e foi recusado). Por isso `steps: []` e "log not found": o job nunca rodou. O passo do ci-ok (ci.yml ~390-410, RESULTADOS=toJSON(needs), regra de 'ruins' por escopo) nem chegou a ser avaliado; o escopo da governança não tem relação com a falha. No verificacao/lote-mais2 (run 42314781533, 23:53) ainda havia cota, por isso verde.
Nenhuma correção em .github/** nem em scripts/ci. Nada a pedir ao dono do produto sobre o workflow.

## Caminho para publicar a demo do 56b89a1 (sem contornar nada)
1. O dono do produto (alexandre) regulariza o pagamento ou aumenta o spending limit do Actions em github.com/settings/billing (conta aloirr). Até isso, qualquer job novo (CI, demo — publicar, stack isolado, rerun, workflow_dispatch) vai falhar do mesmo jeito: não adianta novo push agora.
2. Depois, rodar de novo só o job que falhou: `gh run rerun 42315477476 --failed` (ou "Re-run failed jobs" na página do run). Os 8 jobs verdes são reaproveitados, o ci-ok avalia o escopo e fica verde; o CI termina success com event=push e o workflow_run dispara o "demo — publicar" (condição em demo-publicar.yml:36), publicando o 56b89a1.
3. Alternativa equivalente: o próximo push verde no main publica o HEAD (que contém o 56b89a1).
Não recomendo o workflow_dispatch do demo — publicar para esse commit: pula o portão do ci-ok.

## Pronto quando
Billing regularizado e rerun do ci-ok verde; o "demo — publicar" roda sozinho.
