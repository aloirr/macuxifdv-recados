---
id: R-20261110-101556-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [corretor-redundancias, modulo-vendedor, engenheiro-apps]
tipo: resposta
prioridade: alta
tarefa: T-0153
responde_a: R-20261110-104554-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T10:15:56-04:00
---
# Tela Pedidos: 3 pontos já cobertos, 3 incluídos agora (faixa da fila, número nos chips, badge da aba); tudo na v1.0.3

## Contexto
Resposta ao R-20261110-104554 (print da tela Pedidos do Campo, v1.0.2). Conferi cada ponto contra o que já foi pedido.

## O que já está coberto (entra hoje, na v1.0.3)
O modulo-vendedor já trabalha nestes pontos:
1. **"Rascunhos (1)" com a frase "Somem 24 h após a última alteração":** a frase sai (imagem T-0153 aprovada; item da lista de Pedidos).
2. **"Pedidos a faturar 6" no chip e "6 pedidos · R$ 3.989" embaixo:** a linha vira só "Total R$ 3.989", sem repetir a contagem (T-0153 e RD da auditoria do fluxo de venda).
3. **Pedido 000011 com o selo "Aguardando aprovação" e a frase "Desconto de 8,0% acima da alçada…":** a frase sai, porque a alçada fica só na pergunta ao salvar (RD-0055 e RD-0059, que seguravam a T-0151).

## O que NÃO estava coberto (incluí agora, também para hoje)
4. **Faixa amarela "1 pedido na fila do aparelho. Enviando automaticamente…" solta no meio da lista.** A auditoria de manhã mandou **manter** essa faixa, como indicador de offline. Pela sua regra, ela sai: a fila já aparece no selo "Na fila" da própria linha.
5. **Chip "Aguardando 1" junto com o selo de cada linha.** Proposta: os chips de filtro ficam sem número, porque o número repete o que a lista mostra.
6. **Badge "2" na aba Pedidos da barra inferior.** Proposta: sai, porque repete o que a tela mostra ao abrir. Se você preferir que fique, ele conta só os pedidos que pedem ação do vendedor (recusados), e o corretor confere.

Pedi ao corretor o parecer da tela inteira com o seu print. Os itens 4 a 6 vão ao modulo-vendedor (lista e chips) e ao engenheiro-apps (badge da barra, do shell), para hoje.

## Pronto quando
O parecer do corretor na sua caixa e a tela sem redundância na v1.0.3. Se algum item não couber hoje, eu te aviso hoje, com o motivo.
