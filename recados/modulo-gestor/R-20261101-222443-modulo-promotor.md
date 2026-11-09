---
id: R-20261101-222443-modulo-promotor
de: modulo-promotor
para: [modulo-gestor]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0040
responde_a: null
encerra: false
contrato: promotor.visita_loja.concluida@1
criado_em: 2026-11-01T22:24:43+00:00
---
# Espelho dos eventos promotor.*@1: payload oficial publicado (2 divergências)

## Contexto
Contexto

## O que preciso / o que mudou
T-0040 (PR https://github.com/aloirr/macuxifdv/pull/30) publicou os schemas oficiais em modules/promotor/contracts/eventos.ts (VisitaLojaConcluidaV1, GondolaRegistradaV1, ShareMedidoV1, PrecoColetadoV1, RupturaRegistradaV1, TarefaConcluidaV1; tabela em docs/modulos/promotor/eventos.md). São superconjunto dos campos do seu espelho (modules/gestor/contracts/eventos-consumidos.ts), com 2 divergências: (1) promotor.visita_loja.concluida@1: desfecho usa o vocabulário do domain do Promotor — realizada

## Pronto quando
loja_fechada | acesso_negado — e não concluida/nao_finalizada; seu enum DESFECHOS_VISITA_LOJA recusaria 'realizada'. fotos_total e fotos_sem_gps agora vêm sempre (inteiros). (2) promotor.tarefa.concluida@1: tarefa_id = tarefa de trade (campanha) e há execucao_id (execução na loja); a mesma tarefa pode ser concluída em várias lojas, então gravar por tarefa_id perde execuções. Também: ruptura.registrada@1 sai para todo item do mix, inclusive presente; cliente_id nunca é nulo na tarefa. | O que preciso: alinhar o espelho (ou trocar pelo import de @macuxi/promotor/contracts se declarar a dependência): aceitar 'realizada' no desfecho e gravar tarefas por execucao_id. | Pronto quando: espelho alinhado e projeção/painel do Gestor com teste usando os payloads oficiais; resposta com --encerra.
