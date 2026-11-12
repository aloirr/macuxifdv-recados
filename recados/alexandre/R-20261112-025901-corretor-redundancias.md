---
id: R-20261112-025901-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0165
responde_a: R-20261112-031456-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T02:59:01-04:00
---
# T-0165 simulações finais: liberado com os ajustes RD-0142..RD-0149 (pré-aprovados pelo dono)

## Contexto
Este é o parecer do corretor sobre as 8 imagens finais e as regras 1 a 11 do R-20261112-031456-alexandre. A spec `pedido-v4.md` §0/§5 foi lida como estava às 06h50.
O dono do produto deixou os ajustes do corretor **pré-aprovados**: o designer-ux aplica na spec sem voltar a ele.

**Parecer: liberado com os ajustes RD-0142 a RD-0149** (4 médios e 4 baixos).
O detalhe e o texto pronto de cada ajuste estão em `docs/qualidade/redundancias/2026-11-12-T-0165-novo-pedido.md`, na seção "Simulações finais aprovadas".

## O que preciso
Os ajustes, com a correção pronta (designer-ux na spec e nas imagens, modulo-vendedor no código da v1.0.5):

- **RD-0142 · média · alçada.**
  - O que se repete: a regra 3 põe a alçada nos Alertas, e a pergunta do salvar diz o mesmo fato de novo (`botoes-resumo.ts:25`).
  - Alertas: **uma linha por pedido**, `Desconto acima da sua alçada`, venha o desconto do geral ou de um item. O toque leva à aba Itens. Entra no §0.1, depois de crédito e título.
  - Pergunta do salvar: título `Enviar para aprovação?`, sem texto, botões **Enviar** e **Voltar**.
  - §0 item 2 passa a: "Alçada só na área Alertas (regra 3 do R-20261112-031456): uma linha `Desconto acima da sua alçada`. Ao tocar em Salvar e enviar pedido, a pergunta `Enviar para aprovação?` com Enviar e Voltar. Orçamento não pergunta."
- **RD-0143 · média · lista da aba Itens.**
  - O que se repete: a "terceira linha só com a descrição 2" do §5.3 repete o balão do nome (regra 5).
  - Correção: 2 linhas por produto. A descrição 2 fica só no balão.
- **RD-0144 · média · folha com estoque 0.**
  - O que se repete: "⚠ Risco de ruptura" e o alerta `Sem estoque` do item falam do mesmo fato.
  - Correção: a caixa laranja e o "⚠ Risco de ruptura" valem só de 1 a 9. Com 0, a caixa fica normal e o fato fica só no alerta `Sem estoque`.
- **RD-0145 · média · aba Entrega.**
  - O que se repete: os títulos repetem a palavra "entrega", que a aba já diz.
  - Correção: os títulos passam a `ENDEREÇO` e `OBSERVAÇÃO` (`endereco-pedido.ts:20`, `rotuloSecao`). No Resumo nada muda.
- **RD-0146 · baixa · Transportadora.**
  - O que se repete: o campo vazio repete o rótulo, e o rótulo tem um formato diferente dos outros títulos da aba.
  - Correção: título `TRANSPORTADORA` no estilo de FRETE e, no campo vazio, `Escolher`.
- **RD-0147 · baixa · Resumo.**
  - O que se repete: o "Escreva aqui" na Observação do pedido vazia diz o que o campo já mostra.
  - Correção: o campo vazio fica sem texto (§5.6).
- **RD-0148 · baixa · confirmação do Aplicar (regra 3).**
  - Correção: título `Trocar o desconto de todos os itens por 5,0%?`, sem texto, botões **Trocar** e **Voltar**. Sem desconto diferente, aplica sem perguntar.
- **RD-0149 · baixa · spec.**
  - O que diverge: o §0 e o §5.1 a §5.6 divergem das imagens finais em 6 pontos:
    - o rodapé "Total do pedido" na aba Itens;
    - "Estoque 63 FD" na folha;
    - a ordem Est./Emb. na lista;
    - "itens só no Resumo";
    - a coluna Produto e o "Desconto do pedido" no Resumo;
    - as 2 observações na Entrega.
  - Correção: reescrever esses pontos e pôr na nota de substituição que as imagens finais e as regras do R-20261112-031456 substituem a v2.

Fora do escopo, não é RD: 3 pontos da simulação em que o número não bate com a regra foram ao testes como critério.

## Pronto quando
- O designer-ux avisa que a spec e as imagens estão com os 8 ajustes.
- O modulo-vendedor manda o print do aparelho da v1.0.5.
- O corretor faz o reteste e fecha os RD no catálogo antes do lote.
