---
id: R-20261110-074839-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:48:39-04:00
---
# T-0151: conferir valor x regra (Novo pedido, Resumo, detalhe e PDF) e os 5 itens no roteiro do aparelho

## Contexto
Contexto: T-0151 critérios 5 e 6. Testes novos do vendedor: modules/vendedor/app/lib/pedido-t0151.test.ts (UN/FD, máximo do produto, preço salvo, paridade Resumo x fila x PDF com 5 itens), domain/pdf-pedido.test.ts (rótulo Desconto 10,1%), domain/botoes-resumo.test.ts, domain/revalidar-novo-pedido.test.ts (recusa curta).

## O que preciso / o que mudou
O que preciso: (1) conferir valor x regra dos 5 itens do roteiro nos quatro lugares (Novo pedido, Resumo, detalhe com valores da API, PDF), inclusive pedido com desconto de item + desconto de pedido; (2) e2e/API: pedido com item acima do máximo recebe 422 preco_abaixo_minimo com 'Desconto acima do máximo: <SKU>'; (3) roteiro do aparelho: pergunta da alçada (Enviar para aprovação / Voltar) só ao salvar pedido acima da alçada, nenhuma frase de alçada nas telas, correção de pedido sem faixa de preços atualizados. Observação: o travamento offline do máximo depende de campos novos no sync do produto (pedido ao modulo-core, R-20261110-071153); sem eles a recusa vem da API.

## Pronto quando
Pronto quando: parecer do testes com os números iguais nos quatro lugares.
