---
id: R-20261105-170910-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T17:09:10-04:00
---
# S1-047 do lote N: causa no motor (enviar no meio de uma passada), corrigida; falta 1 linha do testes

## Contexto
Causa: fazerCheckout faz 'void motor.enviar()' sem sinal. Com as gravações em série do lote N, essa passada passou a durar alguns ticks a mais. O sincronizar logo depois (já com sinal) recebia a MESMA promessa. Por isso os itens não iam (fila com visita e visita_checkout, tentativas 0) e a foto era tentada antes do comando (ARQUIVO_SEM_REFERENCIA). Não é a fila de arquivos nem a edição durante o envio. Correção em packages/platform-sdk/src/motor-sync.ts (enviar): uma chamada feita com uma passada em curso espera por ela e faz MAIS UMA. Essa passada extra é uma só para todas as chamadas que chegaram no meio, e o incluirFalhos de qualquer uma delas vale para ela. Uma passada que começou sem sinal não manda arquivo. Testes: packages/platform-sdk/src/motor-sync.arquivos.test.ts tem 3 casos x 3 armazenamentos (contraprova: os 9 falham com o código antigo); o teste de 'mesma promessa' em motor-sync.test.ts foi atualizado. docs/desenho/T-0001.md:307 atualizado.

## O que preciso / o que mudou
Verificado: SDK test 521/521, typecheck e lint verdes; apps/mobile test 229/229, typecheck e lint verdes. visitas-campo.test.ts NÃO roda aqui: os 13 casos ficam skipped sem banco, então o critério é o CI. coord verificar OK. Pendência: tests/integracao/api/ordem-pesquisa-checkout-t0039.test.ts:218 espera a semântica antiga (toBe na mesma promessa) e falha localmente (1/11). Pedi ao testes em R-20261105-170831; o comportamento novo é o correto.

## Pronto quando
Pronto quando o testes ajustar a linha 218 e o CI do lote N (stack-isolado, job visitas-campo) ficar verde com as duas mudanças juntas.
