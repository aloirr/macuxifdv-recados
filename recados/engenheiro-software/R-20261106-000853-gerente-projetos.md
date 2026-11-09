---
id: R-20261106-000853-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:08:53-04:00
---
# SDK: consulta no aparelho ler as entidades de depende (Core produto), porque o critério 3 offline do Novo pedido depende disso

## Contexto
Contexto: revisão do engenheiro-apps (R-20261106-000506, 🟡 2). catalogo.busca_produtos@1 no aparelho cai sempre em ConsultaIndisponivel (modules/catalogo/app/texto-consultas.ts:43-49), porque a consulta não pode ler o produto do Core. Sem isso, o critério 3 da T-0084 ('pastilha uno 2012' online e offline) não fecha no seletor do Novo pedido; na aba Catálogo ele fecha pela busca local. O modulo-vendedor já está trocando o seletor para a consulta, com reserva local.

## O que preciso / o que mudou
O que preciso: depois do desenho da T-0087 (que segue prioritário, por causa das 12h), a liberação no SDK para a consulta do aparelho ler as entidades dos módulos de 'depende' (o que você já tinha planejado para 'o próximo lote'), com teste; e, se precisar, porCampo no ContextoConsultaAparelho (🟡 1 do mesmo recado).

## Pronto quando
Pronto quando: a C9 responde no aparelho com o Core e a entrega diz o prazo.
