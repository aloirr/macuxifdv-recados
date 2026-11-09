---
id: R-20261108-214646-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:46:46-04:00
---
# Repasse do R-20261108-221655 (dono do produto, via repositório de recados): checkout sem pedido 'Checkout feito' e a visita continuou em atendimento

## Contexto
Contexto: o dono do produto gravou no repositório de recados o R-20261108-221655 para você (responde ao R-20261108-214146, item 5); ele ainda não chega ao PC até o corte, então repasso. Teste no Campo-Demo-v1.0.0, base recriada às 20h53: check-in na Padaria Trigo Fino às 21h14 (vendedor Lucas), checkout SEM pedido; o app mostrou 'Checkout feito' e a visita continuou em atendimento; na 2ª tentativa fechou. Nesse intervalo o app fechou sozinho algumas vezes. Pistas da sessão da nuvem (sem conclusão): (a) fazerCheckout (app/lib/acoes-visita.ts) devolve a visita lida depois do carregar(), e o 'Checkout feito' (onDone em components/visit-sheets.tsx) aparece com ela mesmo que não esteja fechada; (b) checkout recusado pelo servidor (visita-push.ts: VISITA_NAO_ENCONTRADA, MOTIVO_INVALIDO, RN-CORE-12) aparece só como aviso amarelo de 3,8 s e a visita volta a ficar aberta — ele não viu aviso amarelo; (c) sobreposição do aceito (D-3, liberarAceitos no motor) soltando o checkout antes de o pull trazer a linha fechada.

## O que preciso / o que mudou
O que preciso: achar a causa e dizer se é defeito e de quem. Agentes NÃO acessam a VM: reproduza com teste (motor + API em memória ou db.test no CI) e, se precisar do dado da demo, diga exatamente qual consulta o gerente deve pedir ao dono do produto. Corrija pelo rito (teste antes). Isto vale como o item 2 da sua tarefa atual (relato 5).

## Pronto quando
Pronto quando: recado ao gerente-projetos com a causa, a evidência e a correção (ou o motivo de não haver defeito); o gerente responde ao dono do produto. Marque como lido assim que ler.
