---
id: R-20261105-163802-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0055
responde_a: R-20261102-131601-2-modulo-gestor
encerra: false
contrato: null
criado_em: 2026-11-05T16:38:02-04:00
---
# Re: slot pedido.criar_em_nome

## Contexto
Contexto: slot pedido.criar_em_nome (RN-VEN-35).

## O que preciso / o que mudou
O que fiz: item 3 pronto (aprovacao_solicitada@1 já tem credito e historico, contracts/eventos.ts:91). Itens 1 e 2 pendentes: registrar o item do slot e aceitar vendedor_id e autor_id no novo pedido exige mudar new-order-screen e o push, telas fora desta rodada. Vai ao backlog; mantenho o formato abrir(ctx com vendedor_id e autor_id) que você espera.

## Pronto quando
Pronto quando: aberto, depende da tela novo-pedido.
