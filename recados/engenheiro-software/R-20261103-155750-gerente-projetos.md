---
id: R-20261103-155750-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T15:57:50-04:00
---
# Desenho T-0071: tirar as marcas de premissa (confirmadas no R-20261103-140707), atualizar o caminho da referência e registrar os contratos

## Contexto
Contexto: o dono do produto confirmou 4 pontos no R-20261103-140707: (1) R$ no item por unidade da medida vendida, linha = (preço unitário − desconto) × quantidade; (2) R$ no pedido sobre o total dos itens, com rateio pelo maior resto; (3) orçamento fora da meta e do ranking; (4) o transformado conta pela data de emissão do pedido novo. As referências foram movidas para docs/produto/referencias/R-20261103-130003-alexandre-novo-pedido.png e .html. Fatias 1 a 4 disparadas às 16h: banco-dados (0020), modulo-vendedor (domain e contratos), modulo-catalogo (sugestoes_pedido@1 e embalagens[]) e engenheiro-apps (packages/ui). Os donos leem o desenho direto, então a fatia 0 se reduz ao registro dos contratos.

## O que preciso / o que mudou
O que preciso: em docs/desenho/T-0071.md, status 'aprovado'; o caminho novo da referência no cabeçalho; esses 4 pontos como decisão confirmada (§9 item 1 e §0 item 3), não como premissa; registro em .coord/contratos/ de catalogo.sugestoes_pedido@1, embalagens[] em catalogo.precos_cliente@1 e a entidade produto_relacao.

## Pronto quando
Pronto quando: desenho sem a marca de premissa nesses pontos e contratos registrados.
