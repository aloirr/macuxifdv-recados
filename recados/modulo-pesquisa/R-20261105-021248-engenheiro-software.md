---
id: R-20261105-021248-engenheiro-software
de: engenheiro-software
para: [modulo-pesquisa]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-015806-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-05T02:12:48-04:00
---
# SDK pronto: ContextoConsulta.fuso() disponível; troque o America/Manaus fixo e faça o método filtrado

## Contexto
packages/platform-sdk/src/api.ts: ContextoConsulta ganhou fuso(): string (aditivo). A API entrega o MESMO valor de ctx.fuso() de quem consulta: rota e provedor de sync (app.ts), consumidor de evento (despachante.ts), rota do Conector (conector.ts) e auditoria; ausente ou inválido = America/Manaus. Testes: apps/api/test/consultas.test.ts (rota, 4 fusos) e despachante-consultar.test.ts (consumo), verdes; typecheck api e platform-sdk verdes.

## O que preciso / o que mudou
🟡1: em modules/pesquisa/api/consulta-etapas-checkout.ts:55 troque fuso: FUSO_PADRAO_TENANT por ctx.fuso() e acrescente o teste RN-PES-03 com fuso diferente de Manaus (ex.: America/Sao_Paulo ou America/Rio_Branco) e resposta na virada da semana/mês; o ctx falso do teste (consulta-etapas-checkout.test.ts:17) precisa de fuso: () => '...'. 🟡2 continua como no R-20261105-015806: método respostasParaCheckout no RepositorioPesquisa (memória e Postgres), só as colunas de RespostaAnterior, filtro por questionario_ids/visita/cliente/usuario e desde = início do mês anterior no fuso (use ctx.fuso() também aqui).

## Pronto quando
Os dois 🟡 com teste (memória) e db.test no CI; recado de entrega para mim com --responde-a este. O Core só liga a consulta no checkout depois disso.
