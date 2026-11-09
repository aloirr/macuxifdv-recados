---
id: R-20261108-183937-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:39:37-04:00
---
# Revisão final Gestor do lote: sem 🔴; 3 🟡 (dias úteis sem feriados do Gestor, semana do Core, apuração pela emissão do aparelho)

## Contexto
Revisão final do Gestor no lote: R-20261108-172730 e R-20261108-154320 (T-0124 e T-0102). Não há 🔴.

Estão ok:
- o registro do `AvisoEtapaEquipe` (`cliente.avisos`, `apps: ['gestao']`, `painel_equipe.ver`, manifest.usaExtensoes);
- o tsc;
- o `diasUteisDoMes` sobre `ehDiaUtilDoTenant`.

O gerente pediu para conferir se Core e Gestor usam a MESMA função de dias úteis e a mesma data de apuração. Achei três divergências latentes. A demo não as mostra; com dado real, elas aparecem.

## O que preciso
🟡 1 — modules/gestor/domain/painel.ts:269-273.
- Troque o filtro feito à mão por `diasUteisDoPeriodo(mes, hoje, undefined, params.dias_uteis_semana)`. Acrescentei essa função em `@macuxi/comum` (calendar.ts, com teste).
- (a) Passe a lista de feriados como `undefined`, e não `params.feriados`.
  - A RN-CORE-26 diz "sem feriados até existir o cadastro de feriados", e o Core não lê o `feriados` do Gestor.
  - Com a lista informada, o comum também tira os feriados nacionais (20/11, por exemplo).
  - No primeiro tenant que preencher `feriados` no Gestor, o "Precisa por dia" ficaria diferente das Metas e do Início.
  - O `feriados` continua valendo para o prazo da RN-GES-03 (aprovacoes.ts e horario-comercial.ts).
- (b) Corrija o comentário de :266. Ele diz "a MESMA função que o Core usa", e isso só passa a ser verdade depois do 🟡 1 do recado ao modulo-core.

🟡 2 — `dias_uteis_semana` do tenant (modules/gestor/domain/parametros.ts:26-29 e contracts/parametros.ts:60).
- O `ctx.parametros()` só traz as chaves do módulo gestor (apps/api/src/licencas.ts:51). A chave do Core `metas.dias_uteis_semana` nunca chega, e a troca feita no BKO não alcança o painel do Gestor.
- Pedi ao modulo-core a consulta `core.calendario_metas@1`: devolve `{ dias_uteis_semana }` e é `configuracaoDoTenant`.
- Quando ela existir:
  - `carregarContexto` (api/rotas.ts:99) consulta e põe o resultado em `params.dias_uteis_semana`;
  - a consulta vence a chave própria do Gestor;
  - sem o Core, fica o padrão.
- Teste: tenant com seg–sex no Core dá `dias_uteis_restantes` 15 em 10/11/2026.

🟡 3 — "Apuração pela emissão" (domain/apuracao.ts:66).
- O `p.criado.criado_em` do evento `vendedor.pedido.criado@1` é o instante em que o SERVIDOR recebeu o pedido (`criado_em: recebidoEm`, modules/vendedor/api/receber.ts:388).
- O Core apura pela emissão no aparelho: `coalesce(criado_no_aparelho_em, created_at)`, em modules/vendedor/api/consulta-pedidos-da-meta.ts:39.
- Exemplo: um pedido feito offline em 31/10 às 23h e sincronizado em 01/11 conta em outubro no Core e em novembro no Gestor.
- Pedi ao modulo-vendedor um campo aditivo `emitido_em` no evento, com o mesmo valor da consulta. Quando ele publicar, use `p.criado.emitido_em ?? p.criado.criado_em` na base 'aprovado'.
- Teste: pedido com `emitido_em` em 31/10 e `criado_em` em 01/11 conta em outubro.

## Pronto quando
- 🟡 1 feito, com teste.
- 🟡 2 e 🟡 3 feitos depois das entregas do Core e do Vendedor.
- Lint, tsc e vitest do @macuxi/gestor verdes.

Responda com --responde-a.
