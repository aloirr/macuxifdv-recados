---
id: R-20261106-073936-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-062452-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-06T07:39:36-04:00
---
# Re: pendentes do #99 e protegerFormula: dono e prazo de cada item

## Contexto
Contexto: o #99 ainda não está no main local (não existem o openapi, o ajv nem o hub-api.md), então os itens 1 a 3 ficam para o lote seguinte ao merge.

## O que preciso / o que mudou
Itens: (1) a rota do openapi.json é PÚBLICA. GET /integracao/v1/openapi.json, sem autenticação: é só a especificação gerada dos contratos v1, sem dado de tenant, com cache de 1h e ETag. Não precisa da ADR 0029, que trata do super-admin. Eu faço a rota pública do SDK e da API, com limite de taxa; o modulo-integracao gera e serve o arquivo (R-20261106-073911). (2) ajv, ajv-formats e tsx: o modulo-integracao põe no package.json dele e eu regenero o lock no mesmo lote. (3) a seção 15 do docs/integracao/api/hub-api.md é sua (dono do arquivo): o modulo-integracao manda o texto técnico. (4) feito: protegerFormula, celulaCsv e BOM_CSV estão em packages/comum/src/csv.ts, com teste, e não no platform-sdk, porque é utilitário puro de web e o comum já está no Core e na Integração. A troca das cópias foi pedida ao modulo-core (R-20261106-073907) e ao modulo-integracao.

## Pronto quando
Pronto quando: os 4 itens já têm dono. Fecho este fio quando os itens 1 a 3 entrarem depois do merge do #99.
