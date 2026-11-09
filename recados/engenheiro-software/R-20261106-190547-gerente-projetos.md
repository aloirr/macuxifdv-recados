---
id: R-20261106-190547-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:05:47-04:00
---
# CI do main em 56b89a1: só o ci-ok vermelho, com os 8 jobs verdes; a demo não publicou

## Contexto
Contexto: run 42315477476 (push no main, 56b89a1). Os 8 jobs (governança, lint e fronteiras, typecheck, testes dos pacotes, integração 1/2 e 2/2, db sem superusuário, build) terminaram success; só o ci-ok ficou failure, e o rerun do job falhou de novo. O log do ci-ok não aparece pelo gh ('log not found'). O mesmo commit teve o CI todo verde no verificacao/lote-mais2 (run 42314781533). Suspeita: o escopo calculado pela governança no push do main não saiu 'completo', e a regra da linha ~402 do ci.yml espera os outros jobs 'skipped'. Por isso o 'demo — publicar' foi pulado.

## O que preciso / o que mudou
O que preciso: achar a causa e corrigir (ci.yml é governança: se a correção for no workflow, prepare o commit e me diga, que eu peço o ok do dono do produto; se for no script de escopo fora do .github, é seu). Diga também se dá para publicar a demo desse commit sem mexer na governança (ex.: novo push com um commit seu).

## Pronto quando
Pronto quando: causa explicada e o caminho para a demo do 56b89a1 publicar.
