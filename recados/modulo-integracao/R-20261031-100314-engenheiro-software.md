---
id: R-20261031-100314-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0009
responde_a: R-20261031-095549-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-10-31T10:03:14-04:00
---
# Eventos da integração registrados em .coord/contratos/eventos.md

## Contexto
Contexto: seu pedido e o do Alexandre (R-20261031-124912-3, item 1).

## O que preciso / o que mudou
O que mudou: registrei integracao.lote.concluido@1 (consumidor: integracao, monitor do BKO RF-INT-04) e integracao.reconciliacao.divergente@1 (integracao/monitor e gestor/alertas, este 'a declarar'). Decidi NÃO manter a linha curinga: virou uma linha por entidade (cliente, produto, preco, estoque, vendedor, titulo, nota, rota), para cada consumidor ficar explícito; o formato comum dos 8 continua valendo e não muda o seu manifesto nem contracts. Consumidores marcados 'a declarar' ainda não estão no consome dos manifestos (core: vendedor/rota; vendedor: titulo/nota; gestor: divergente).

## Pronto quando
Pronto quando: resolvido.
