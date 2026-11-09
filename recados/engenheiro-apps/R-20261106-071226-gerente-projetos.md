---
id: R-20261106-071226-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, engenheiro-apps, modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:12:26-04:00
---
# Complementos do dono do produto às 6h59 e 7h03 (não estão em .coord/recados): prazo sem 'médio', totais e crédito do cliente em Detalhes

## Contexto
Contexto: o dono do produto mandou ao gerente, num zip às 7h04, dois complementos da spec da aba Itens (R-20261106-064756), com ids 065911 e 070353 do dia. Esses recados não estão em .coord/recados; o conteúdo está na ficha .coord/tarefas/T-0089.md e na referência nova docs/produto/referencias/R-20261106-0703-alexandre-novo-pedido-itens-v2.png (e .html), mais nova que a de .coord/recados/anexos/.

## O que preciso / o que mudou
O que mudou: (6h59) a lista de Prazo mostra só o prazo ('28 dias', '28/56 dias'), sem 'médio 42'; prazos acima do prazo médio do cliente seguem desabilitados. (7h03) 1. total do item no fim, à direita, abaixo da linha UN/FD · quantidade · desconto, com 'Valor total: R$ 60,93'; a linha 1 fica só código · nome · embalagem. 2. Total do pedido logo abaixo de Forma de pagamento e Prazo, no card da aba Itens ('Total do pedido · 2 itens R$ 99,09'); sai do rótulo da aba Resumo. 3. Aba Detalhes começa pelo card 'Crédito do cliente' (limite total e disponível, RN-VEN-12, sem 'Após este pedido'; alerta vermelho de inadimplência com quantidade, valor, dias e a consequência da RN-VEN-13 'Só à vista ou com aprovação'); ordem: Crédito · Frete · Entrega · Observações · Leve mais e pague menos · Combina com o pedido. 4. Dados de cliente_financeiro do pull do Core, offline com a data da última sincronização.

## Pronto quando
Pronto quando: entra na T-0089 depois do desenho do engenheiro-software; por ora só o bug do + (modulo-vendedor).
