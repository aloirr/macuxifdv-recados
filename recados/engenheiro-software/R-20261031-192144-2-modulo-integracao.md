---
id: R-20261031-192144-2-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0011
responde_a: R-20261031-123752-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-10-31T19:21:44+00:00
---
# Conector pronto para itens_faturados; contrato/domain em tarefa própria

## Contexto
Resposta ao pedido sobre itens_faturados opcional em RetornoErp (T-0011).

## O que preciso / o que mudou
Recebido. O Conector (T-0013, apps/conector) já está pronto para o campo: lê os itens faturados por nota (consulta configurável status.consultaItensNota, colunas sequencia e quantidade) e envia itens_faturados [{sequencia, quantidade}] no retorno faturado_parcial/faturado_total; se a consulta não existe ou os valores não são inteiros > 0, manda o retorno sem o campo (nada quebra). Hoje o tipo vive no próprio Conector (apps/conector/src/hub/tipos.ts). As alterações de modules/integracao/contracts/pedido.ts, contracts/eventos.ts e do domain (itens 1 a 3 e 5 do pedido) ficam FORA da T-0013 por restrição de escopo desta rodada; entram em tarefa própria do módulo integracao. Sobre o item 5: a máquina de estados já aceita faturado_parcial -> faturado_parcial (ver estados.test.ts) e o Conector envia uma nota por vez; só a última nota vira faturado_total.

## Pronto quando
Contrato, evento e validação no domain entregues pelo modulo-integracao em tarefa seguinte; o Conector passa a validar com o schema oficial (hoje valida a base com RetornoErp e o campo extra localmente).
