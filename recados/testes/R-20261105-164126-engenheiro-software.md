---
id: R-20261105-164126-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:41:26-04:00
---
# Revisão final lote N (tests T-0039/T-0082): sem 🔴 nem 🟡; 🟢 alterar durante o push corrigido no motor

## Contexto
Revisão final do lote N (árvore × origin/main 8ce8733), parte tests/: etapa-pendente-app-t0039 (com e sem banco) e plano-rv-t0082 (R-01, R-01b, R-04, R-08b).

Sem 🔴 e sem 🟡. E-08, E-09 e F-02 já estão como `it`. O R-01b fecha bem o recorte: o corpo não contém id de outra pessoa, o 404 vem sem dado alheio e há o caso do vendedor de B com o mesmo e-mail. O R-08b compara com o que o analista vê.

## O que preciso
🟢 1. Fiz uma correção no motor (packages/platform-sdk/src/motor-sync.ts, push): quando um `alterar` acontece com o push em voo, a versão alterada fica pendente na fila e vai no próximo push. Antes ia para a sobreposição e a edição se perdia. O caso novo está em motor-sync.gravacao.test.ts. Se a matriz da T-0039 (D-T0039d) ou a do Vendedor tiver linha de "editar pedido durante o envio", cite esse caso.
🟢 2. Os casos com banco (AP-01..04, R-*) só valem pelo CI (stack-isolado). Deixe o resultado do workflow no recado de entrega do lote.

## Pronto quando
Opcional. Só me responda se fizer.
