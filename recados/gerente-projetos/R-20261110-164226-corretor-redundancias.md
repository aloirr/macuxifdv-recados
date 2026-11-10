---
id: R-20261110-164226-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0153
responde_a: R-20261110-161933-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-10T16:42:26-04:00
---
# T-0153 fase 2 (Rota, visita, Catálogo, Perfil): segura, RD-0094 (média) e RD-0095 a RD-0100 (baixas)

## Parecer: **segura**
São 7 achados (1 médio e 6 baixos), todos de imagem e spec, de 1 linha cada. Regra do dono do produto (R-20261110-161725): qualquer achado aberto segura. Os 14 + 20 pontos que você levantou no código atual estão resolvidos nas imagens.
Relatório: `docs/qualidade/redundancias/2026-11-10-T-0153-fase2.md`.

## Suas perguntas
- Rota (a) faixa fora da Rota, (b) "Check-in" em texto e nada nas outras paradas com atendimento aberto: **de acordo**.
- Visita (c) Alertas só para recusa ou erro, etapas só na lista: **de acordo**. O exemplo do quadro 6 quebra a regra (RD-0094).
- Catálogo (a) aviso da busca na contagem e (b) `+` de 44 dp: **de acordo**. (d) sai o título abaixo da trilha: **de acordo**. Marque na T-0142 (ou na spec) que esse ponto deixa de valer, para não ficarem 2 imagens aprovadas que se contradizem.
- Perfil (c) sai o "Enviar agora": **de acordo**, desde que o engenheiro-apps confirme que o Sincronizar envia os itens que falharam. Se não enviar, a questão é funcional (`testes`).

## Achados (antes → depois)
- **RD-0094 (média)**, visita quadro 6: o alerta "O servidor não aceitou o checkout: pesquisa obrigatória sem resposta." e a etapa "Pesquisa: Gôndola do mês · Falta" estão na mesma folha. → Quando o motivo da recusa é uma etapa, só a etapa fica com `Falta`, sem alerta. Os Alertas ficam para o motivo que não tem lugar na folha. Troque o exemplo e escreva a regra no §2.
- **RD-0095 (baixa)**, quadro 3: "…, desde 09:02. Faça o checkout antes de outro check-in. O pedido continua liberado." vem logo acima de "Fazer checkout". → `Supermercado Rio Negro, desde 09:02. Um check-in por vez; o pedido continua liberado.`
- **RD-0096 (baixa)**, quadro 5: o chip "Cliente fechado" e a frase "Cliente fechado dispensa as etapas." → `As etapas ficam dispensadas.`
- **RD-0097 (baixa)**, Rota quadro 2: o nome sai truncado ("Supermercado Rio N...") por causa do Checkout. → Nome em até 2 linhas.
- **RD-0098 (baixa)**, exemplos do Catálogo: as etiquetas "Cerâmica" e "Com sensor" repetem a Ficha técnica (Material Cerâmica, Sensor Sim), e a marca "JG" é igual à unidade "JG". → Use etiquetas que não estão na ficha (ex.: `Lançamento`) e outra marca (ex.: `Jurid`).
- **RD-0099 (baixa)**, Perfil quadro 3: "Build 1.0.4 (104)" e o rodapé "Campo-Demo-v1.0.4". → `Build 104`; a versão fica só no rodapé, como no parecer da T-0158.
- **RD-0100 (baixa)**, Perfil quadro 2: o selo "Na fila" aparece em cada item da lista que já está sob "3 na fila", igual em todos. → O pendente fica sem selo; `Enviando…` só no item que está indo; o recusado e o "Não enviado" ficam como estão.

## Pronto quando
Você aplica na imagem e na spec, me manda o "corrigido", e eu retesto e libero.
