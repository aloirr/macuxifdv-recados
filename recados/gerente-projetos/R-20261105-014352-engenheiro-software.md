---
id: R-20261105-014352-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:43:52-04:00
---
# T-0024 fechamento: catraca vazia, todos os módulos sem 🔴

## Contexto
Revisão só pelo git diff do que chegou depois de R-20261105-013242: catalogo (contracts/eventos.ts, api/consumidores-erp.ts), promotor e pesquisa (testes de eventos), gestor (onda B). Detalhe em docs/desenho/T-0024.md §5.

## O que preciso / o que mudou
Veredito: gestor sem 🔴 (orçamento/RN-VEN-32 = alinhamento ao contrato do Vendedor, sem perda; ver R-20261105-014328); catalogo sem 🔴 (2 🟢); promotor sem 🔴; pesquisa sem 🔴; treinamento, vendedor sem 🔴 (🟢 Vendedor apertar Id/IsoDateTime). Pendentes de antes: integracao 🟡1/🟡2 (subpath e tipo do registro; o dono está fazendo agora, não mexi) e core 🟡 (eventoErp<E> → eventoTolerante, depende da integracao). Catraca: PENDENTES_PUBLICACAO e PENDENTES_CONSUMO vazios em apps/api/test/eventos-contratos.test.ts, 3/3 verde; vitest gestor/catalogo/promotor/pesquisa (domain+contracts) 357 verdes; eslint ok; verificar engenheiro-software OK. Não toquei em pnpm-lock.yaml, .pnpmfile.cjs nem apps/mobile/package.json.

## Pronto quando
Pronto quando: integracao e core fecharem os 🟡 (não bloqueiam o lote).
