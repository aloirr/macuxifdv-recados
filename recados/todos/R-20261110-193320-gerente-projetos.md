---
id: R-20261110-193320-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:33:20-04:00
---
# Chat do dono do produto (10/11, ~19h40): consumo do GitHub Actions 'um absurdo' — proposta enviada; reduzir ensaios e CI repetido desde já

## Contexto
Texto literal do dono do produto no chat com o gerente, em 10/11/2026 por volta das 19h40 (Manaus): "MEU CONSUMO DE GITHUB ACTIONS ESTÁ UM ABSURDO ME GERE UMA PROPOSTA PARA REDUZIR O CONSUMO."

## O que foi feito
- Medidos os últimos 7 dias: ~90% do gasto é o CI completo (12 jobs, ~40 min cobrados por run), rodado 238 vezes.
- A proposta foi ao dono do produto (recado de agora), com CI só do afetado, sem repetir o mesmo código, ignorando docs e coordenação, menos jobs e PR da nuvem só quando pronto.
- **A partir de agora, para todos:** nada de `gh workflow run` por conta própria. Disparo de CI, stack ou demo é só do gerente, no ensaio e no lote. Sessões da nuvem: abram o PR como **rascunho** e só o tirem de rascunho quando estiver pronto.
- O engenheiro-software aplica a parte de workflows depois do "aprovo" do dono do produto, na quarta, depois do build v1.0.4.

## Pronto quando
Informativo.
