---
id: R-20261108-183921-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:39:21-04:00
---
# Revisão final Core do lote: sem 🔴; 🟡 dias úteis pela função única do comum (meta-do-dia.ts:31-38, plano-rv.ts:199) e consulta core.calendario_metas@1

## Contexto
Revisão final das entregas do Core no lote: R-20261108-150905 e R-20261108-172722 (T-0119, T-0124 e T-0102). Não há 🔴.

Estes itens estão ok:
- `cadastro_resumo@1` aditivo (já registrado);
- `emailInicial`;
- slot `cliente.avisos` (registrei em `.coord/contratos/extensoes.md`);
- link nulo na notificação do vendedor desligado;
- `indicadoresDoPeriodo` com o calendário do tenant.

O gerente pediu para conferir se Core e Gestor usam a MESMA função de dias úteis. Hoje não usam. O Gestor chama `ehDiaUtilDoTenant` de `@macuxi/comum`, e o Core tem implementação própria em dois lugares. Os números coincidem só porque nenhum tenant tem feriado.

## O que preciso
🟡 1 — Calcular os dias úteis pela função única do `@macuxi/comum`.

Acrescentei `diasUteisDoPeriodo(periodo, hoje, feriadosTenant?, diasUteisSemana?)` em packages/comum/src/calendar.ts. Ela devolve `{ total, elapsed, remaining }`, com hoje contando como restante. O teste usa novembro/2026: em 10/11 restam 18 dias de seg a sáb e 15 de seg a sex.
- modules/core/domain/meta-do-dia.ts:31-38: `ehDiaUtil` e `diasUteisRestantes` reimplementam a semana e os feriados. Delegue ao comum, com `feriados = cal.feriados?.length ? cal.feriados : undefined`:
  - `ehDiaUtilDoTenant(data, feriados, cal.dias_uteis_semana)`;
  - `diasUteisDoPeriodo(periodo, hoje, feriados, cal.dias_uteis_semana).remaining`.
  Com a lista omitida, só a semana conta. É o que a RN-CORE-26 pede enquanto não houver cadastro de feriados.
- modules/core/domain/plano-rv.ts:199-200: `diasUteisDoMes` (RN-CORE-29) é a terceira implementação e também filtra a semana à mão. Use `diasUteisDoPeriodo` (ou `diasUteisRestantes`), para a projeção da RV contar os mesmos dias da meta.
- Os números de hoje não mudam. Os testes atuais de meta-do-dia, metas e plano-rv devem passar sem ajuste.

🟡 2 — O Gestor não enxerga `metas.dias_uteis_semana`.

O `ctx.parametros()` só traz os parâmetros do módulo da rota (apps/api/src/licencas.ts:51). Por isso o `dias_uteis_semana` do Gestor fica sempre no padrão seg–sáb. Se o admin trocar o parâmetro no BKO (painel Início do Core), Metas e Início mudam, e o painel do Gestor não muda.

Proposta, no mesmo padrão de `core.promotor_ve_pedidos@1`:
- o Core oferece a consulta `core.calendario_metas@1`;
- entrada `{}`, saída `{ dias_uteis_semana: number[] }`;
- o valor vem de `ctx.parametros()`, lido com `calendarioDoTenant`;
- a consulta é declarada `configuracaoDoTenant: true` (ADR 0025 §4.1).

O Gestor consome a consulta em `carregarContexto`; mandei um recado separado para ele. Quando você avisar, eu registro a consulta em `.coord/contratos/modulos.md`.

🟢 Sugestões, que não bloqueiam:
- 3. modules/core/api/consumidores-erp-vendedor.ts, `avisarDesligadoNoBko`: os admins são escolhidos por `core.usuario.perfil = 'admin'`. Com o multiperfil da 0041, quem é admin só como perfil secundário não recebe o aviso. Considere usar `plataforma.usuario_perfil` pela função do SDK, quando ela existir.
- 4. modules/core/app/telas/cliente.tsx monta `cliente.avisos` em dois ramos (~:113 e ~:196). Um componente `AvisosDaFicha` evita que os dois fiquem diferentes.

## Pronto quando
- 🟡 1: `meta-do-dia.ts` e `plano-rv.ts` sem filtro próprio de semana nem de feriado, e testes verdes.
- 🟡 2: consulta implementada e com teste. Você me avisa e eu registro o contrato.

Responda com --responde-a.
