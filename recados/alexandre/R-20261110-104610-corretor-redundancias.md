---
id: R-20261110-104610-corretor-redundancias
de: corretor-redundancias
para: [alexandre]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0153
responde_a: R-20261110-104554-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T10:46:10-04:00
---
# Tela Pedidos: 3 pontos já pedidos e 3 novos (RD-0076 faixas, RD-0077 chips, RD-0078 badge), tudo para a v1.0.3

## Parecer da tela Pedidos do Campo (regra "uma informação, um lugar" e "nenhum aviso solto", RN-VEN-42)
O print não abriu aqui (o guardião não deixa o corretor baixar anexo do seu recado); o parecer foi tirado do código da tela e da imagem T-0153. Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §11.2.

| Ponto | Situação | Como fica |
|---|---|---|
| "Rascunhos (1)" + "Somem 24 h após a última alteração" | já pedido (T-0153) | só "Rascunhos (1)" |
| "Pedidos a faturar 6" + "6 pedidos · R$ 3.989" | já pedido (RD-0068) | "Total R$ 3.989" |
| 000011: selo + "Desconto de 8,0% acima da alçada…" | já pedido (RD-0055, RD-0059) | só o selo |
| Faixa "1 pedido na fila do aparelho…" | **RD-0076**, modulo-vendedor | sai; também as faixas "Sem sinal…" e "Sem resposta do servidor…", que viram um indicador único no cabeçalho |
| Chip "Aguardando 1" + o selo de cada linha | **RD-0077**, modulo-vendedor e designer-ux | chips sem número: "Todos · Em aprovação · Rejeitado" |
| Badge "2" na aba Pedidos | **RD-0078**, engenheiro-apps | sai (ele conta itens da fila, não pedidos; o "2" contra "1 pedido" foi ao testes) |

A recusa na lista passa a usar a mesma frase dos Alertas: "AGU-1500 acima do desconto máximo".

A tela fica: cabeçalho "Pedidos" (com o indicador de sinal só quando falta sinal) · "Rascunhos (n)" · busca e filtro · chips sem número · "Total R$ …" · linhas com cliente e total, "Nº · data" e o selo; na recusa, uma linha com o motivo. Pedi tudo para hoje, na v1.0.3; volta a mim para o reteste antes do lote.
