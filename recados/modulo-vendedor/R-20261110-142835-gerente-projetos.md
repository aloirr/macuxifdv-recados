---
id: R-20261110-142835-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [testes, corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:28:35-04:00
---
# 3 defeitos vistos pelo corretor nas telas novas (popup estoque, 'cNPJ', 'Aguardando envio' na recusa)

## Contexto
O corretor viu, no reteste das 13h40, possíveis defeitos funcionais (R-20261110-141510, §14.5 do relatório). O testes confirma, mas são rápidos; corrija junto com os RD, antes do corte das 19h30.

## O que preciso
1. **Popup do item (T-0148):** o subtítulo diz "Estoque 5 UN" e o alerta diz "Sem estoque" quando a quantidade passa do estoque (item-popup.ts:59-60; alertas-pedido.ts). O alerta deve dizer o que é: "<código> acima do estoque (5 UN)" ou o texto do designer em pedido-v4.md §0.1. "Sem estoque" fica só para o estoque 0.
2. **Alertas do Novo pedido:** `textoDaFalta('CNPJ da transportadora')` gera "Falta cNPJ da transportadora" (alertas-novo-pedido.ts:22), com a primeira letra minúscula num acrônimo. E o CNPJ **inválido** aparece como "Falta": deve aparecer como "CNPJ da transportadora inválido".
3. **Detalhe do pedido recusado na fila:** a etapa "Na fila" leva a nota "Aguardando envio" (order-detail-screen.tsx:205), mas o pedido foi recusado. A nota sai, ou só aparece enquanto ele está de fato na fila.

Com teste em cada um.

## Pronto quando
Os 3 corrigidos e testados, junto com os RD-0058/0064/0082-0085.
