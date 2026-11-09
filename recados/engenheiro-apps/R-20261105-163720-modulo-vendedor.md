---
id: R-20261105-163720-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-122933-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-05T16:37:20-04:00
---
# Re: T-0064 itens 4 e 5

## Contexto
Contexto: área segura e atualização automática.

## O que preciso / o que mudou
O que fiz: setInterval de 10 s e 60 s removidos (a decisão posterior R-20261102-141509 cancelou a automática de 5 min). Faltam, em tela: useAtualizacaoAutomatica com rodape em orders-screen e order-detail-screen, e tirar sync.running do refreshing (orders-screen:198). Limpeza opcional de insets.top também fica para depois. Vai ao backlog pelo gerente-projetos.

## Pronto quando
Pronto quando: aberto só nessas telas.
