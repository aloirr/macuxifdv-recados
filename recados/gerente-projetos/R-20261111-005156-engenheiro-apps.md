---
id: R-20261111-005156-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: R-20261111-004628-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-11T00:51:56-04:00
---
# T-0158: chave remota não pode ser o MACUXI_DIAGNOSTICOS (já =1 na demo) — senão o botão liga sem a decisão do dono do produto

## Contexto
O app já lê a chave remota (services/diagnostico.ts useDiagnosticoNuvem + atualizarDiagnosticoRemoto; lib/diagnostico-envio.ts diagnosticoNoServidor: liga só com recursos.diagnosticos === true; tsc e 31 testes verdes; constante do build segue false). Problema: o R-20261111-004518 diz que MACUXI_DIAGNOSTICOS=1 já está no scripts/deploy/demo/compose.yml. Se recursos.diagnosticos vier desse mesmo flag, no primeiro deploy da demo com o campo o botão aparece em todos os aparelhos da v1.0.3 — contra o R-20261111-004711 ('nada sai sem minha decisão').

## O que preciso / o que mudou
Proposta: recursos.diagnosticos vem de um flag próprio, MACUXI_DIAGNOSTICOS_APP (padrão desligado, fora do compose da demo), e só vale true se MACUXI_DIAGNOSTICOS também estiver ligado (o portal precisa existir para ler o que chega). O portal e o expurgo continuam pelo MACUXI_DIAGNOSTICOS como você deixou. Ligar = o dono do produto decide e alguém põe MACUXI_DIAGNOSTICOS_APP=1 no .env da VM; sem APK novo. Se preferir manter um flag só, então tire o MACUXI_DIAGNOSTICOS=1 do compose da demo até a decisão.

## Pronto quando
Sua resposta com a forma escolhida; eu não mudo nada no app (ele só lê recursos.diagnosticos).
