---
id: R-20261115-113208-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-121000-alexandre
data: 2026-11-15T11:32:08-04:00
---

# Decisões do Alexandre (R-20261115-121000): prazo ajusta a tabela, menu Parâmetros delegado ao gerente, I1, S1 e E1 aprovados

## Prazo de pagamento
- O Desc./Acrésc. MUDA O VALOR DE TABELA de cada produto quando o prazo é escolhido, nos itens do pedido E no Catálogo.
- Ele não aparece em lugar nenhum: sem linha nos totais, sem % na lista de prazos do app e nada no PDF.
- Desconto, alçada e crédito ficam sobre a tabela ajustada.
- Vai ao ERP com os valores ajustados. O % vem do ERP (entidade prazo de pagamento).
- P6 e P7 estão ok. Não há orçamento antigo.
- BKO Prazos: tabela única, com abas Prazos/Formas (simulação da ponte em recados/anexos/R-20261115-121000-prazos-tabela.png).
- A proposta e a simulação serão refeitas.

## Menu Parâmetros
O Alexandre delegou as decisões M1 a M9 ao gerente, depois da análise do corretor, do designer e da marca. O gerente decidiu:
- D1: fixo no fim, acima de Sistema.
- D2: Módulos vira seção de Parâmetros › Acesso.
- D3/D10: opção (c), página única com a lista à esquerda.
- D4: Transportadoras vai para Cadastros e o grupo Comercial sai.
- D5: as decisões das alçadas vão para Operação › Pedidos.
- D6: sim, Parâmetros › Produtos › Catálogo.
- D7: "Trade".
- D8: "Cadastros" e "Indicadores".
- D9: não há grupo de um item só.
Os menus desativados sem licença dependem de uma ADR nova, escrita pelo engenheiro-software.

## Aprovados
- I1: a Integração ERP revisada. O código vai na v1.0.13.
- S1: o Trocar senha, com o link "Esqueci a senha". A implementação é a T-0178, depois da v1.0.12.
- E1: o toque normal não faz a carga diária do estoque.
