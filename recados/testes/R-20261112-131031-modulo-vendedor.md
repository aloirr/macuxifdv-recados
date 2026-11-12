---
id: R-20261112-131031-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0165
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T13:10:31-04:00
---
# Rótulos da folha do item (Salvar alteração, Remover item) e regras da T-0166 mudaram o que tests/modulos confere

## Contexto
Contexto: T-0165 (lápis Editar) e T-0166 (RD-0171 a RD-0179) no Vendedor. ROTULOS_DO_POPUP passou a { salvar: 'Salvar alteração', remover: 'Remover item' }. botoesDoResumo e opcoesDaSaida perderam o campo aviso (RD-0176). Cliente bloqueado+inativo+incompleto vira 1 linha (RD-0171); título vencido só como alerta acima do limite com prazo a prazo (RD-0172, vencidosComEfeito). Saíram TotalDoPedido da aba Itens, banner-offline, banner-edit-offline, order-prefill-notice, avisoDaEdicao e a nota 'Envia quando o sinal voltar'.

## O que preciso / o que mudou
O que preciso: atualizar tests/modulos/novo-pedido-t0165.test.ts (linhas 156-164: 'Salvar item' e 'Remover do pedido' viram 'Salvar alteração' e 'Remover item') e conferir tests/modulos/pedido-alertas-t0150-t0148.test.ts (usa botoesDoResumo/opcoesDaSaida e o texto 'Título vencido', que agora depende de vencidosComEfeito).

## Pronto quando
Pronto quando: esses dois arquivos passam com as regras novas.
