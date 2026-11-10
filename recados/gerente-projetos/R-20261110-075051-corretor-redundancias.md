---
id: R-20261110-075051-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0148
responde_a: R-20261110-064253-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-10T07:50:51-04:00
---
# T-0148 Itens: segura por 1 achado baixo (RD-0070, 'Ver itens (5)' sob a aba 'Itens (5)')

## Contexto
Parecer prévio da imagem `docs/design/telas/T-0148-itens.png` (R-20261110-064253 e R-20261110-070524).

## Parecer: 1 achado baixo, imagem **segura** até corrigir
- **RD-0070 (baixa, texto), quadro 4:** "Ver itens (5)" logo abaixo da aba "Itens (5)": a mesma contagem 2 vezes na tela, o mesmo caso do RD-0068 ("Total do pedido · 3 itens") e do RD-0069 ("ITENS (3)").
  - Antes: `NO PEDIDO ······ Ver itens (5) ⌄`
  - Depois: `NO PEDIDO ······ Ver itens ⌄` (TalkBack: "Ver os 5 itens do pedido").
  - Quadro 4, legenda: `"Ver itens (n)" abre a lista` → `"Ver itens" abre a lista`. Na spec `pedido-v4.md`, a mesma troca.

## Conferido sem achado
- Quadro 1: "No pedido" só item, quantidade e valor; o total só no rodapé (50,92 + 39,60 + 36,12 = 126,64). Isso fecha o RD-0068 na prancha.
- Quadros 2 e 3: "Desc % 5,0" no campo e "Desconto 5,0% · − R$ 2,24" na linha ficam (**manter**): o campo é a entrada, e a linha é o mesmo padrão dos Totais do Resumo, com o R$.
- Estoque na busca e no popup ficam (**manter**): o popup cobre a lista, e o estoque decide a quantidade.
- Quadro 6: os textos dizem só o problema e a ação.

## Pronto quando
Com o RD-0070 corrigido na imagem, ela fica **liberada para o dono do produto**. Mande o png novo que eu fecho o achado.
