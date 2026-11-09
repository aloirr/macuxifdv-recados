---
id: R-20261104-162416-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T16:24:16-04:00
---
# O5 (orcamento-ponta-a-ponta) contradiz a idempotência do PUT (RN-VEN-33)

## Contexto
Contexto: tests/integracao/demo/orcamento-ponta-a-ponta.test.ts O5 manda PUT com atualizado_em antigo e o MESMO corpo do PUT do O4 (corpoPut(atualizadoVelho) = corpoPut(atualizado) sem o atualizado_em). Pela regra decidida pelo gerente (modules/vendedor/api/orcamentos.ts, RN-VEN-33), PUT com hash igual ao hash_envio da última alteração = repetição idempotente, 200 sem mudar nada; só corpo diferente com atualizado_em antigo dá 409 ORCAMENTO_ALTERADO. Um PUT de corpo idêntico é indistinguível de reenvio por resposta perdida, então o O5 atual (esperando 409) não pode valer junto com a regra.

## O que preciso / o que mudou
O que preciso: no O5, o PUT com atualizado_em antigo deve mandar corpo DIFERENTE (ex.: corpoPut(atualizadoVelho, { observation: 'outra edição' }) ou quantidade de item diferente) e esperar 409 ORCAMENTO_ALTERADO; acrescentar o caso do corpo idêntico com atualizado_em antigo = 200, total 37979 e atualizado_em igual ao atual (nada muda). A parte do 422 PAYLOAD_INVALIDO fica como está.

## Pronto quando
Pronto quando: o job de integração visitas-campo + resto 2/2 passa com O5 ajustado.
