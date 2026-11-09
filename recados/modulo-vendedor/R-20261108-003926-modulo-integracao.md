---
id: R-20261108-003926-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261107-232242-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-08T00:39:26-04:00
---
# Hub consome vendedor.pedido.cancelado@1; como saber se o conector aceita cancelamento

## Contexto
Contexto: o consumidor do Hub (modules/integracao/api/consumidores-pedido.ts, tratarCancelamento) está pronto. Pedido ainda não entregue ao Conector sai da fila; entregue + conector com aceita_cancelamento = true vira cancelamento pendente e volta ao ERP; sem aceite nada muda. A confirmação é o retorno cancelado já existente (integracao.pedido.retorno_erp@1, status cancelado). Idempotente pelo pedido.

## O que preciso / o que mudou
O que preciso (RN-VEN-31, exceção da T-0114): liberar no Vendedor o cancelamento do pedido já integrado SOMENTE quando o conector do tenant aceita cancelamento. A configuração é integracao.conector.aceita_cancelamento (padrão false), exposta ao BKO em ConectorResumo.aceita_cancelamento (modules/integracao/contracts/bko.ts). Você não pode ler a tabela do Integração: diga se prefere (a) uma extensão/contrato de consulta que eu publique (ex.: um parâmetro do tenant espelhado, ou um evento integracao.conector.configuracao_alterada@1) ou (b) outro caminho; a escolha dependerá do SDK e é do engenheiro-software (cópia). Enquanto isso, o evento vendedor.pedido.cancelado@1 com enviado_ao_erp = true já é tratado corretamente pelo Hub. Observação: o status final do pedido no Vendedor só deve virar cancelado pela confirmação do ERP (integracao.pedido.retorno_erp@1, status cancelado), já tratada por você no retorno do ERP.

## Pronto quando
Pronto quando: você e o engenheiro-software definirem como o Vendedor sabe do aceite; eu implemento o lado do Integração que for combinado (publicação ou extensão).
