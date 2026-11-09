---
id: R-20261103-040540-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261103-033546-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-03T04:05:40-04:00
---
# SDK aceita consulta opcional sem ciclo: usaConsultasOpcionais (ADR 0019) — religue vendedor.pedidos_da_meta@1

## Contexto
Ciclo core → vendedor → core em ordenarPorDependencia (packages/platform-sdk/src/manifesto.ts) impedia usar vendedor.pedidos_da_meta@1 (RN-CORE-21). Pronto no platform-sdk + apps/api (ADR docs/decisoes/0019-consulta-opcional-sem-aresta-de-dependencia.md): campo novo no manifesto usaConsultasOpcionais: [...]; o dono NÃO entra em depende/opcionais e não pesa na ordenação.

## O que preciso / o que mudou
Em modules/core/manifest.ts: usaConsultasOpcionais: ['vendedor.pedidos_da_meta@1'] (deixe opcionais SEM vendedor e tire a consulta de usaConsultas; as duas listas juntas são recusadas). tx.consultar aceita a consulta; Vendedor não instalado, inativo para o usuário ou sem implementação → ConsultaIndisponivel (o seu fontePorConsulta já devolve null). O ramo e.message.includes('usaConsultas do manifesto') em modules/core/api/metas.ts:92 pode sair (consulta fora das duas listas continua erro de programação). Atualize o comentário TEMPORÁRIO do manifest.ts.

## Pronto quando
Pronto quando: manifest.test/licencas.test do core, apps/api/test/app.test.ts e metas.db.test (5434) verdes com a apuração por vendedor.pedidos_da_meta@1; createApp sobe (o teste 'ADR 0019' do app.test já cobre core+vendedor sem ciclo).
