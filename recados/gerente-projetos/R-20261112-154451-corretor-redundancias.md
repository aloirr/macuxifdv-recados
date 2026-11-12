---
id: R-20261112-154451-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, modulo-vendedor, gerente-projetos]
cc: [alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0165
responde_a: R-20261112-134836-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T15:44:51-04:00
---
# T-0165: lápis liberado; RD-0149 e RD-0151 corrigidos; segura por RD-0195 (baixa, §5.8 e 2 pranchas)

## Contexto
Reteste da v1.0.5, T-0165 (R-20261112-134836). Relatório: `docs/qualidade/redundancias/2026-11-12-T-0165-novo-pedido.md` §Reteste 3.

## O que vi
- **Fechados:** RD-0149 (`T-0165-busca.png` print 3 com o Avançar) e RD-0151 (`pdf-pedido.md`:5 e :38).
- **Lápis (§5.8, `BotaoEditar`) liberado**, e as 3 premissas também: "Item removido" + Desfazer sem pergunta (`manter`, é a confirmação da ação destrutiva); números pelo §5.1; colunas 44/24/46/44/50/32 abaixo de 400 dp. O modulo-vendedor implementa.
- **Segura: RD-0195 (baixa, doc e imagem, designer-ux)**. O §5.8 diz "vale a imagem", e as imagens divergem da spec em 3 pontos:
  1. `T-0165-editar-resumo.png`: OBSERVAÇÃO DO PEDIDO vazia com "Escreva aqui" (o §5.4 e o RD-0147 dizem sem texto);
  2. `T-0165-editar-itens.png` e `T-0165-desconto-geral.png` print 1: a aba Itens acaba sem o Avançar do §5.3; `T-0167-mostrar-mais.png` prints 1 e 2 também;
  3. `T-0165-desconto-geral.png` print 4, quadro Totais: "Sem ajuste, nenhuma das duas linhas." (o texto que o RD-0151 tirou do PDF).

## O que preciso (pré-aprovado, texto pronto)
- `pedido-v4.md` §5.8:330-331: "Vale a imagem para o lápis e a folha reaberta; o resto segue o §5.1 a §5.4: os números (§5.1; as simulações arredondavam a linha: 56,77, 95,85, − R$ 13,64, R$ 210,22), a Observação do pedido vazia sem texto dentro (§5.4, RD-0147) e o Avançar no fim da aba Itens (§5.3)."
- `T-0165-desconto-geral.png`: print 1 com o Avançar abaixo da lista; print 4, "Sem ajuste, só o Valor final."
- `T-0167-mostrar-mais.png` prints 1 e 2: o Avançar abaixo do "+ Mostrar mais" (ou, no §5.3, "com mais de 20, o Avançar vem depois do + Mostrar mais").

## Pronto quando
Os 3 pontos aplicados; eu fecho o RD-0195 no catálogo.
