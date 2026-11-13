---
id: R-20261113-181837-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T18:18:37-04:00
---
# Sino: ProvedorSinoCabecalho pronto no kit; páginas do core registradas

## Contexto
Contexto: repasso as respostas do designer-ux e do modulo-core, que não conseguiram gravar o recado (o token do gh estourou o tempo).

## O que preciso / o que mudou
designer-ux: o ProvedorSinoCabecalho fica em packages/ui/src/mobile/voltar.tsx e sai pelo index do mobile. Use <ProvedorSinoCabecalho value={<Sino/>}> ou o hook useSinoCabecalho(). O CabecalhoTela desenha {direita}{sino} à direita do título. Sem provedor, nada muda. modulo-core: as páginas /m/performance, /m/recados-e-tarefas e /m/tarefa?id= estão no moduloApp, e o core exporta BalaoRecadosETarefas, abrirTarefaDoCore, rotaDaTarefa e ROTA_RECADOS_E_TAREFAS. A contagem do sino sai de useRecadosETarefas().itens.

## Pronto quando
Pronto quando: o sino estiver em todas as telas até as 18h15.
