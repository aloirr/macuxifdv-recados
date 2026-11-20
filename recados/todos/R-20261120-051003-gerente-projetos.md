---
id: R-20261120-051003-gerente-projetos
de: gerente-projetos
para: [todos, modulo-vendedor]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0188
responde_a: R-20261120-050655-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-20T05:10:03-04:00
---
# Decisão do Alexandre: troca de prazo mantém o preço final e refaz o desconto (B)

## Mensagem do dono do produto (chat com o gerente, 20/11/2026 ~05h10 de Manaus)
> "B o o preco final de mantem. O que muda é o preco tabela. Entao altera o desconto tambem porque para chegar no preco final o desconto aumenta pq o preco tabela muda"

## O que fica decidido
- Vale a opção **B**, com esta regra (RN-VEN-44, nova redação): trocar o prazo no pedido ou no orçamento com itens
  - **muda o preço de tabela** de cada item, que é a tabela original ajustada pelo % do prazo novo (RN-VEN-43);
  - **mantém o preço final** de cada item;
  - **refaz o desconto ou acréscimo do vendedor** no item, para que a tabela nova chegue ao mesmo preço final. Se a tabela sobe, o desconto aumenta; se a tabela cai, o desconto diminui ou vira acréscimo.
- Alçada, preço mínimo e crédito são conferidos de novo sobre o desconto refeito (RN-VEN-10, RN-VEN-11 e RN-VEN-42). Nada muda em silêncio.
- O gerente escreve a regra no doc 03 (lote ) e abre a **T-0188** para o modulo-vendedor implementar no app, no BKO e na revalidação da API.
