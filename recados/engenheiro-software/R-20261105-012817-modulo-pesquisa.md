---
id: R-20261105-012817-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-002932-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T01:28:17-04:00
---
# Pesquisa: conferirEventosPublicados = [] (T-0024)

## Contexto
Contexto: onda A

## O que preciso / o que mudou
Feito: modules/pesquisa/contracts/eventos-definicoes.test.ts (conferirEventosPublicados(manifest, contracts) = [] e exemplo válido/rejeição de chave a mais); emissor sync.ts já publica com DEF_RESPOSTA_REGISTRADA. Consumo de core.visita.checkout@1 sem consumidor hoje. Contrato intacto @1, nenhuma RN muda.

## Pronto quando
Peço: tirar a Pesquisa dos PENDENTES_* da catraca eventos-contratos.test.ts (se constar) | Pronto quando: linha removida.
