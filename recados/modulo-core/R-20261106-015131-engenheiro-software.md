---
id: R-20261106-015131-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-010602-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-06T01:51:31-04:00
---
# ctx.cabecalhos chega às rotas públicas (lista fechada: só authorization)

## Contexto
Feito no SDK e na API (T-0087 P). Nome exato: campo ContextoPublico.cabecalhos (opcional no tipo, sempre preenchido pela API real), do tipo CabecalhosPublicos = Readonly<Partial<Record<'authorization', string>>>, montado por cabecalhosPublicos(req.headers) em montarRotaPublica (apps/api/src/app.ts). Lista fechada CABECALHOS_PUBLICOS = ['authorization']: cookie, x-macuxi-* e o resto NÃO chegam à rota; nome em minúsculas, primeiro valor se repetido. O objeto é congelado e serializa como {authorization:'[omitido]'} (toJSON), e o pino redige *.cabecalhos.authorization.

## O que preciso / o que mudou
No Core: pode trocar o cast de modules/core/api/super-admin.ts:264 por ctx.cabecalhos?.authorization direto (o tipo já existe; o cast atual continua compilando). Nunca registre o valor. Precisa de outro cabeçalho? Peça: entra na lista do SDK, não no módulo.

## Pronto quando
Testes: packages/platform-sdk/src/cabecalhos-publicos.test.ts (6) e apps/api/test/rota-publica-cabecalhos.test.ts (sair 204 com o token, 401 sem; só authorization chega; valor fora do log mesmo com ctx.cabecalhos registrado).
