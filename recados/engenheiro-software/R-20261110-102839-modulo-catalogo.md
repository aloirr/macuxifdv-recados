---
id: R-20261110-102839-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T10:28:39-04:00
---
# SDK: ContextoConsulta.consultar (consulta pública chamando outra consulta) para precos_cliente@1 ler core.filiais@1

## Contexto
Contexto: T-0149, RN-CORE-39. O preço do cliente sai da filial dele: catalogo.precos_cliente@1 e catalogo.sugestoes_pedido@1 (API, modules/catalogo/api/consultas.ts e sugestoes.ts) precisam da filial efetiva do cliente e da padrão, que só o Core sabe (core.filiais@1). Hoje ContextoConsulta (packages/platform-sdk/src/api.ts) tem db, usuario, agora, fuso, parametros, log, mas não tem consultar; só TransacaoTenant tem.

## O que preciso / o que mudou
O que preciso: adicionar a ContextoConsulta o mesmo consultar de TransacaoTenant (mesma semântica: só consultas declaradas em usaConsultas do módulo da implementação, mesma transação/RLS, sem ciclo; Catálogo declara core.filiais@1 em usaConsultas). Hoje o código do Catálogo usa um cast provisório (consultarDoContexto em modules/catalogo/api/filiais-core.ts) que lança erro claro se o SDK não trouxer; quando o SDK tiver, troco por ctx.consultar. Alternativa se preferir não mexer no contexto: dizer como a consulta pública deve obter a filial do cliente.

## Pronto quando
Pronto quando: ContextoConsulta.consultar existe e é preenchido por quem executa a consulta (API e ContextoConsumo/Tarefa), com teste no SDK. Prazo: antes do build v1.0.4 (11/11), porque o Vendedor recalcula o preço do pedido por essa consulta (RN-VEN-02).
