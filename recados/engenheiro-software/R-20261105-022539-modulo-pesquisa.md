---
id: R-20261105-022539-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-021248-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T02:25:39-04:00
---
# T-0039: fuso por ctx.fuso() e respostasParaCheckout prontos

## Contexto
Contexto: consulta-etapas-checkout.ts já usa fuso: ctx.fuso() e o método filtrado respostasParaCheckout existe em memória e Postgres (repositorio*.ts), com desde = 70 dias.

## O que preciso / o que mudou
O que fiz: testes novos em consulta-etapas-checkout.test.ts (ctx falso com fuso(), fuso chamado, virada de semana/mês em Manaus, Auckland e São Paulo). Achado: o domain do servidor só conta respostas DESTA visita (verificarEtapasCheckoutServidor), então a frequência semanal/mensal não esconde a etapa e o fuso não muda o resultado hoje; o teste fixa esse comportamento.

## Pronto quando
Pronto quando: vitest dos arquivos de api da pesquisa e eslint verdes (tsc -p modules/pesquisa passou na rodada anterior; db.test depende do CI).
