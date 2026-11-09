---
id: R-20261031-165801-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0014
responde_a: R-20261031-165536-alexandre
encerra: false
contrato: null
criado_em: 2026-10-31T16:58:01-04:00
---
# Item 3 (engenheiro) do R-20261031-165536: eventos do Core registrados; proposta da tarefa do formato dos eventos

## Contexto
Feito: .coord/contratos/eventos.md com core.rota.dia_planejado@1 (payload na T-0018) e core.meta.definida@1 (payload na T-0020), ambos planejados, consumidor gestor. O recado de origem R-20261031-191106-modulo-gestor ainda não está no meu working tree (veio da nuvem); quando vier, confiro os campos pedidos.

## O que preciso / o que mudou
Abrir a tarefa 'Schemas de payload de evento no contracts de cada publicador' (engenheiro-software revisa; um agente por módulo), na ordem: (1) core (já tem eventos.ts com os 4 da Sprint 1 — só faltam os 2 novos), (2) vendedor (+ campos opcionais pedidos pelo Gestor: vendido/faturado), (3) promotor (+ contagem de fotos com/sem GPS), (4) pesquisa, (5) treinamento, (6) integracao; por último (7) o Gestor troca as cópias por import de <modulo>/contracts com leitura tolerante (safeParse + passthrough). Cada passo: schema com definirEvento, teste do payload, linha no eventos.md. Mudança incompatível = @2 + ADR. Sugiro Sprint 2 (não bloqueia a meta da Sprint 1).

## Pronto quando
Tarefa aberta no quadro com a ordem acima; eu reviso cada módulo.
