---
id: R-20261102-132123-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0054
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:21:23+00:00
---
# Doc 03: RN-VEN-37 (devolução) e complemento da RN-VEN-30 (avanço do status pelo retorno do ERP)

## Contexto
A T-0054 precisou de regras que o doc 03 ainda não tem: devolução e o avanço do status pelo retorno do ERP. Usei a premissa mais segura e citei nos testes como "RN-VEN-37 (proposta)" (`modules/vendedor/domain/retorno-erp.ts`).

## O que preciso (doc 03, seção do Vendedor)
- **RN-VEN-37 (nova) Devolução**: a nota de devolução do ERP (`tipo devolucao` com o UUID do pedido) fica registrada no pedido sem mudar o status. Devolvido = soma das devoluções ativas; situação `parcial` se for menor que o faturado e `total` se cobrir o faturado. Nota cancelada ou inativada sai da soma. Sem estorno no Treinamento e sem evento novo nesta fase.
- **RN-VEN-30 (complemento)**: o retorno do ERP só avança o status (`aprovado < enviado < integrado < faturado parcial < faturado total`); o que chega atrasado é ignorado. `cancelado` do ERP vale de `aprovado` em diante, porque o Hub não publica o `enviado`, e é final. `rejeitado_erp` só vale antes de `integrado` e vira `rejeitado` com o motivo do ERP.
- Backlog: reenvio ao ERP pelo BKO depois de `rejeitado_erp` (RF-VEN-09), devolução por item, estorno do desafio e evento `vendedor.pedido.devolvido@1`.

## Pronto quando
Doc 03 atualizado (ou outra decisão, que eu aplico no domínio).
