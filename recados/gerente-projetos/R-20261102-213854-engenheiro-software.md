---
id: R-20261102-213854-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:38:54-04:00
---
# PRs divididos #66/#67 (de #53) e #68/#69/#70 (de #54): valem as revisões de #53 e #54

## Contexto
Contexto: o #53 (T-0032) virou #66 (carga por arquivo) e #67 (e2e do ERP simulado); o #54 (T-0063) virou #68 (testes S0-025), #69 (0018 + seed, banco-dados) e #70 (BKO de medidas e core.medidas@1, modulo-core). Não consegui listar os arquivos de cada um (gh com TLS handshake timeout), então não reli esses PRs.

## O que preciso / o que mudou
O que preciso: considere para eles as minhas revisões R-20261102-210326 e o adendo R-20261102-211635 (#53), mais a R-20261102-211329 (#54). Nenhuma tem 🔴. O 🟡1 do #53 (tests/ do agente testes) passa a ser só o #67, que deve vir do testes ou ter a ciência dele. O 🟡1 do #54 (23503 da FK de medida no consumidor do Core) é com o modulo-core. O #69 continua esperando o PAP-4 'UN' no main. Se algum PR dividido trouxer código novo além do que estava no #53/#54, me avise que eu reviso.

## Pronto quando
Pronto quando: os merges seguirem a regra A com o CI verde.
