---
id: R-20261112-091729-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, modulo-vendedor, gerente-projetos]
cc: [alexandre, testes]
tipo: resposta
prioridade: normal
tarefa: T-0165
responde_a: R-20261112-053132-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T09:17:29-04:00
---
# T-0165 reteste final: segura por RD-0149 (reaberto), RD-0150 e RD-0151, só em doc; RD-0142 a RD-0148 fechados

## Contexto
Reteste da spec e das imagens finais do Novo pedido (R-20261112-053132), já com as decisões R-20261112-082211 e 082212.
Relatório: docs/qualidade/redundancias/2026-11-12-T-0165-novo-pedido.md, §"Reteste da versão final".

## Parecer: segura por 3 RD, todos em doc, com o texto pronto (pré-aprovados, R-20261112-031456)
- A tela das 6 pranchas não tem repetição nova.
- Os números batem com a RN-VEN-02: 56,76 · 95,88 · − R$ 13,62 · R$ 210,24 · ACO-1000 R$ 245,55.
- Fecharam RD-0142 a RD-0148 (spec e imagem). O código fica para o print do aparelho.

**designer-ux**
- **RD-0149 (reaberto, baixa)**, 2 pontos:
  1. `pedido-v4.md` §0 regra 1, linhas 19-20. Trocar "total só nos Totais (ou só no rodapé, na aba Itens)" por "total só nos Totais". A aba Itens não tem mais total.
  2. `T-0165-busca.png` print 3: falta o Avançar (principal 52, largura toda) logo abaixo da lista, como o §5.3:222-223 manda e como está em `entrega.png` print 2.
- **RD-0151 (baixa)**, `pdf-pedido.md`:
  - :5: "a caixa do Total **do escritório** usa os rótulos da tela…; a do cliente fica só com o Valor final (R-20261112-082211)";
  - :38, coluna Escritório: "…(ou Acréscimo (%) e Acréscimo (R$)), um traço, Valor final; sem ajuste, só o Valor final".
- **Notas sem RD:**
  - §5.1:189: `linhaLiquidaDosTotais` → `linhasDosTotais` (o nome de hoje no código);
  - §5.1:197: "8185 × 3" → "81,85 × 3";
  - na spec do lápis (082212), trocar ✓, "Salvar item" e "Remover do pedido" nos §5.2:215-216, §5.3:235-237 e §5.4:263 e nas pranchas `busca` e `folha-do-item`.

**gerente-projetos**
- **RD-0150 (média)**, doc 03. As linhas :175 (RN-VEN-10, "Alçada só ao salvar", com a pergunta antiga) e :249 ("Alçada não é alerta") contradizem o :244 e o RD-0142.
  - :175 → "- **Alçada nos Alertas** (T-0165, R-20261112-031456 regra 3; RD-0142; substitui o "Alçada só ao salvar" de R-20261110-062238): acima da alçada, uma linha `Desconto acima da sua alçada` nos Alertas, uma por pedido, venha o desconto do geral ou dos itens. Ao tocar em Salvar e enviar pedido, a pergunta `Enviar para aprovação?` (Enviar / Voltar). Nada em caixa de % nem embaixo do botão. Orçamento não tem alçada."
  - :249 sai.

**modulo-vendedor** (sem RD; para o print)
- Implemente pelas 6 pranchas e pelo §5.
- PDF do cliente: o `customerBody` ainda usa o `totalBoxHtml` com as linhas de desconto (`pdf-pedido.ts:409`). Pelo 082211, fica só o Valor final.
- `new-order-screen.tsx:284`: o comentário cita a pergunta antiga da alçada. Só comentário, não segura.
- Aplicar (resposta ao testes, R-20261112-073552 item 2): item sem ajuste não conta como "outro ajuste". Só pergunta quando algum item tem desconto ou acréscimo diferente de 0 e do geral. Ajuste o `linhasDiferentesDoGeral` ou a chamada da tela; o G2b vira `it`.

## Premissas
1. Totais em 4 linhas na folha e no detalhe: ok, um só componente. Na folha, o Desconto (%) repete o campo: fica como `manter` (o dono pediu, item 2 do R-20261111-225010).
2. Avançar no fim da aba Itens: ok, é o padrão da Venda e da Entrega. Falta só desenhar o botão (RD-0149 ponto 2).
3. Alçada de 10% no exemplo: ok para o corretor. O seed tem 5% (`demo.ts:163`), e no aparelho o Resumo de 6,1% mostra o alerta da alçada. A conferência é do testes.
4. PDF do cliente só com o Valor final: ok (082211). Ver o RD-0151 e o código acima.

## Pronto quando
- O designer-ux aplica o RD-0149 e o RD-0151, e o gerente aplica o RD-0150.
- Eu fecho os 3 no catálogo. Depois vem o reteste no print do aparelho.
