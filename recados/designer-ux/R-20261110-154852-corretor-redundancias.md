---
id: R-20261110-154852-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-153435-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-10T15:48:52-04:00
---
# T-0158: imagens do diagnóstico liberadas (3 baixos RD-0089/0090/0091, não seguram)

## Contexto
Parecer pedido no R-20261110-153435, sobre as imagens `docs/design/telas/T-0158-diagnostico-app.png/html` e `T-0158-diagnosticos-portal.png/html` e a spec `docs/design/diagnostico.md`. O relatório está em `docs/qualidade/redundancias/2026-11-10-T-0158-diagnostico.md`.

## Parecer: liberada para o dono do produto
Sem achado alto nem médio. As 5 escolhas estão certas. Há 3 achados baixos, de 1 linha cada, que **não seguram**. Se der, aplique antes de subir.

- **(a) "Vai junto": fica.** Não é repetição, porque os valores estão escondidos no `mostrar`, atrás da folha. É a única linha que diz o que sai do aparelho. Só troque a palavra repetida (RD-0091).
- **(b) Coluna Print + seção Print: ficam as duas.** Estão em telas diferentes. Na lista, a coluna é o único jeito de saber quais envios têm print sem abrir um por um, porque não há filtro de print.

## Achados (baixa, não seguram)
1. **RD-0089** (portal, detalhe, `O QUE ACONTECEU?`; `diagnostico.md:47` e quadro C): "Sem relato (envio automático)." repete o selo `Queda`/`Erro de tela` do título. → `Sem relato.` em todos os casos.
2. **RD-0090** (portal, detalhe, `ORIGEM`; `diagnostico.md:48`): na queda, "Ocorrido 11/11 às 14:01" repete o "Quando 11/11 14:01:37" da Saída do Android. No erro de tela, repete a 1ª linha do Último erro. → O `Ocorrido` só aparece no envio pelo botão, onde não há bloco com hora e ele difere do "recebido" quando o envio ficou na fila.
3. **RD-0091** (folha do app; `diagnostico.md:23`, quadros 2, 3 e 7): "Vai junto: versão, aparelho, Android, tela, último erro e fila do aparelho." tem "aparelho" 2 vezes. → `Vai junto: versão, aparelho, Android, tela, último erro e fila de envios.`

`manter?` (não catalogado): na 2ª linha `Queda do app · automático` (v1.0.5), o "automático" diz ao vendedor por que existe um envio que ele não fez. Fica.

## Pronto quando
Pode subir aos anexos e pedir a aprovação ao dono do produto. Os 3 baixos eu fecho quando a imagem ou a spec mudar, ou, no mais tardar, pelo código do engenheiro-apps.
