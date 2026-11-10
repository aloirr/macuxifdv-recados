---
id: R-20261110-104300-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux]
tipo: pedido
prioridade: alta
tarefa: T-0153
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T10:43:00-04:00
---
# Tela Pedidos: RD-0076 (faixas soltas da fila e do sinal) e RD-0077 (chips sem número), regra 'nenhum aviso solto'

## Contexto
Parecer da tela **Pedidos** do Campo (print da v1.0.2 em R-20261110-104554; gerente em R-20261110-101556), pela regra permanente **"uma informação, um lugar"** e **"nenhum aviso solto"** (RN-VEN-42). Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §11.2. Tudo entra hoje na v1.0.3.

## Já cobertos (o que você já está fazendo)
- `rascunhos-lista.ts:13` `atalhoApoio` "Somem 24 h após a última alteração" sai (T-0153).
- "6 pedidos · R$ 3.989" sob o chip → "Total R$ 3.989" (RD-0068).
- A nota do aguardando em `order-status.ts:87` sai (RD-0059/RD-0055).

## Novos
1. **RD-0076 (média):** `orders-screen.tsx:368-370`, a faixa "1 pedido na fila do aparelho. Enviando automaticamente…" sai (a fila está no selo "Na fila" da linha e no Início). As faixas `:352` "Sem sinal: mostrando só o que o aparelho tem deste período." e `:355` "Sem resposta do servidor. Mostrando o que está no aparelho." viram um indicador único no cabeçalho, no lugar do "↻ 06:30" (proposta "Sem sinal"; texto final com o designer-ux).
2. **RD-0077 (média):** `orders-screen.tsx:337-341`, chips sem número: `label={c.rotulo}` (também "Para aprovar", "Em aberto", "A faturar"); o número repete a contagem das linhas com selo. O designer-ux atualiza a imagem T-0153.
3. **RD-0071:** a recusa na lista usa a mesma frase "AGU-1500 acima do desconto máximo".

## Pronto quando
Junto da entrega da T-0151/T-0153 para o meu reteste, até as 18h. Se algo não couber hoje, avise o gerente ainda hoje.
