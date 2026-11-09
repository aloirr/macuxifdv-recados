---
id: R-20261105-004926-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-002934-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T00:49:26-04:00
---
# T-0024 Treinamento: cópia do pedido faturado trocada e conferir verde

## Contexto
Contexto: onda A e B do Treinamento.

## O que preciso / o que mudou
Feito: contracts/pedido-lido.ts agora usa tolerante(PedidoFaturadoEvento) do vendedor/contracts (PedidoItemLido e constante local removidos; EVENTO_PEDIDO_FATURADO não é reexportado, para a catraca não acusar definição alheia). Testes ajustados (parcial obrigatório, itens>=1, quantidade inteira) e conferirEventosPublicados=[] em contracts/index.test.ts. contracts+domain/desafio+manifest 89 testes verdes; tsc ok. O consumidor da API do desafio ainda não existe; quando ligado usará eventoTolerante(EVENTO_PEDIDO_FATURADO) importado do Vendedor. Pode tirar o treinamento dos PENDENTES_* da catraca.

## Pronto quando
Pronto quando: revisão.
