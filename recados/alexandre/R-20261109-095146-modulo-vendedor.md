---
id: R-20261109-095146-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: [gerente-projetos]
tipo: aviso
prioridade: alta
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:51:46-04:00
---
# Orçamento recusado às 05h50: o aparelho escondia a frase do servidor (corrigido) e o motivo provável

## Contexto
Orçamento do Lucas salvo em 09/11 às 05h50 (cliente C5007, Boleto 28/56 dias, um item com desconto de 10%, um com acréscimo de 10%, total R$ 69,96) apareceu como "Não foi aceito: o Macuxi recusou o pedido. Fale com seu supervisor". Investiguei o servidor e o aparelho (T-0141, ponto H).

## O que descobri
1. **Defeito de tela (certo, corrigido):** o servidor recusa com uma frase em português, mas o aparelho a descartava. A função `motivoDaRecusa` (`modules/vendedor/app/lib/salvar-na-fila.ts`) só reconhecia 4 códigos técnicos (`preco_abaixo_minimo`, `cliente_bloqueado`...), e esses códigos **nunca chegam no texto**: o servidor devolve só a frase ("Desconto acima do máximo do produto: VEL-150. Reduza o desconto do item."). Resultado: toda recusa do servidor virava o texto genérico. Agora a tela mostra a frase do servidor, sem código de regra e sem ponto final (RN-VEN-40); o genérico só aparece sem motivo ou com erro técnico (rede, HTTP).
2. **Motivo exato da recusa das 05h50 (provável, não confirmado):** o servidor guarda a frase no item da fila do aparelho do Lucas (Perfil > Fila do aparelho). Eu não tenho acesso a esse aparelho. Pelas regras do servidor (`revalidarPedido`, `modules/vendedor/domain/aprovacao.ts`), a combinação do teste só é recusada por um destes motivos, e o primeiro é o mais provável:
   - **Desconto de 10% acima do máximo do produto.** Na base demo, VEL-150 aceita no máximo 5% e DET-5L 10% (OLE-4T-1L aceita 25%). Mensagem: "Desconto acima do máximo do produto: <código>. Reduza o desconto do item." O acréscimo de 10% no outro item não é problema (acréscimo não tem teto).
   - Forma ou prazo não aceitos pelo cliente (RN-VEN-25): C5007 com prazo médio máximo menor que 42 dias (28/56 = 42) ou sem Boleto na lista de formas.
   - Item sem preço na tabela do cliente.
   Desconto e acréscimo no **mesmo item** também é recusado, mas o teste tinha um de cada em itens diferentes.
3. **Para confirmar em 10 segundos:** abra Perfil > Fila do aparelho do Lucas e leia a linha do orçamento. Com o próximo build a própria tela do pedido já mostra essa frase.

## O que falta do seu lado
Nada a decidir. Se a frase da fila não for uma das acima, me avise com o texto exato que eu corrijo a causa.
