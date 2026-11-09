---
id: R-20261106-020657-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:06:57-04:00
---
# T-0087 P: ctx.cabecalhos nas rotas públicas (lista fechada authorization), pedido R-20261106-010602 encerrado

## Contexto
Aditivo no SDK: CABECALHOS_PUBLICOS=['authorization'], tipo CabecalhosPublicos, função cabecalhosPublicos() e campo opcional ContextoPublico.cabecalhos (packages/platform-sdk/src/api.ts); objeto congelado que serializa censurado ([omitido]). API: montarRotaPublica passa cabecalhosPublicos(req.headers) (apps/api/src/app.ts); pino redige *.cabecalhos.authorization (apps/api/src/config.ts).

## O que preciso / o que mudou
Testes novos: packages/platform-sdk/src/cabecalhos-publicos.test.ts (6) e apps/api/test/rota-publica-cabecalhos.test.ts (3: sair 204/401, só authorization chega, valor fora do log). SDK 542/542, API 209 ok (58 de banco pulados, CI), typecheck e lint verdes (só avisos antigos de hora-fixa), verificar sem violações. Resposta ao modulo-core com --encerra (R-20261106-015131).

## Pronto quando
Pendência: o Core pode trocar o cast em modules/core/api/super-admin.ts:264 por ctx.cabecalhos?.authorization (opcional). Não toquei .coord/contratos/modulos.md nem pnpm-lock.yaml; sem revisão nesta instância.
