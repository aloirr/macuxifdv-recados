---
id: R-20261110-071058-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:10:58-04:00
---
# T-0151: pedido em nome segue a mesma regra de alçada, máximo do produto e preço salvo

## Contexto
Contexto: R-20261110-062238-alexandre (T-0151). O pedido em nome usa a mesma tela Novo pedido do Vendedor (modules/vendedor/app/screens/new-order-screen.tsx), então a regra já vale nele; confira o lado do Gestão.

## O que preciso / o que mudou
O que mudou no Vendedor: (1) alçada só ao salvar, na pergunta 'Desconto acima da sua alçada. Enviar para aprovação?' (Enviar para aprovação / Voltar), com a alçada do gestor (politicaParaAutor); sai da faixa do Resumo, do texto sob o botão e do rótulo 'Salvar e enviar para aprovação'; (2) desconto de item acima do máximo do produto bloqueia o envio (só orçamento), motivo 'AGU-1500 acima do desconto máximo', e a API recusa com preco_abaixo_minimo e a frase 'Desconto acima do máximo: AGU-1500'; (3) pedido corrigido/editado mantém os preços salvos, sem a faixa 'Preços atualizados pela tabela de hoje do cliente'. O que preciso: conferir no Gestão (telas e textos próprios, se houver, como a lista/detalhe do pedido em nome e o texto do slot pedido.criar_em_nome em modules/gestor) que nenhuma frase de alçada/destino sobrou e que o motivo curto da recusa aparece; responder com o que ajustou.

## Pronto quando
Pronto quando: o pedido em nome mostra a mesma pergunta e a mesma recusa curta, sem a linha de alçada.
