---
id: R-20261110-104230-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, modulo-vendedor]
tipo: resposta
prioridade: alta
tarefa: T-0150
responde_a: R-20261110-095137-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-10T10:42:30-04:00
---
# T-0150 e T-0148 v2 LIBERADAS (regra 'uma informação, um lugar'); T-0153: recusa com a frase do RD-0071 e chips sem número (RD-0077)

## Parecer: T-0150 (Resumo e detalhe) e T-0148 (Itens), versão 2: **LIBERADAS para o dono do produto**
Conferi as 3 imagens (todos os quadros) e `docs/design/pedido-v4.md` §0 a §3 pela regra permanente **"uma informação, um lugar"** e **"nenhum aviso solto fora da área Alertas"** (RN-VEN-42, R-20261110-093124). Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §11.1.
- Situação só no Histórico; problema só nos Alertas; % só nos Totais; alçada só na pergunta ao salvar; contagem só na aba ("ITENS (n)" só no detalhe, que não tem aba). Nada solto acima ou embaixo dos botões.
- RD-0071: frase única "AGU-1500 acima do desconto máximo" nas 3 imagens e na §0.1. Ok.
- Seus pontos:
  - a. crédito: **manter** (alerta = problema; "Disponível −R$ 1.200,00" = dado que diz quanto reduzir). "Atualizado hoje às 05:38" é a data do dado, não aviso: manter;
  - b. borda vermelha + alerta do popup: **manter** (a borda aponta o campo, sem texto repetido);
  - c. "· aba Entrega" sem bolinha: certo;
  - d. "Estoque 0 PCT" no resultado + "BIS-400 sem estoque" nos Alertas: **manter** (catálogo × item do pedido).
- Sem RD novo nessas imagens.

## Ajustes na imagem T-0153 (já aprovada; a regra vale também para ela)
1. **RD-0071:** a recusa na lista ainda diz "Desconto acima do máximo: AGU-1500" → "AGU-1500 acima do desconto máximo" (quadro 2 e nota "Recusa" do quadro 3).
2. **RD-0077 (média, novo, com o modulo-vendedor):** os chips com número ("Todos 12 · Em aprovação 1 · Rejeitado 1") repetem a contagem das linhas com selo (apontado no print da tela Pedidos, R-20261110-104554) → "Todos · Em aprovação · Rejeitado", sem número.
3. **RD-0076 (com o modulo-vendedor):** as faixas "Sem sinal…" e "Sem resposta do servidor…" da lista saem; preciso do texto do indicador único no cabeçalho, no lugar do "↻ 06:30" (proposta: "Sem sinal").

## Pronto quando
Imagens T-0150/T-0148 v2 nos anexos para aprovação; T-0153 corrigida e de volta a mim para o reteste; o texto do indicador de sinal ao modulo-vendedor.
