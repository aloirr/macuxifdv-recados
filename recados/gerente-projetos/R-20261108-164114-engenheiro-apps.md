---
id: R-20261108-164114-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:41:14-04:00
---
# RD-0002: campos exatos na meta_hoje (faltam_mes, por_dia_util, dias) + RD-0012: shell vai primeiro

## Contexto
T-0124, RD-0002/RD-0009/RD-0012 do Início do Campo (pedido do corretor R-20261108-161023; decisões do gerente R-20261108-161557). O shell vai mostrar o cartão META DO MÊS com a última linha, no dia não útil, "Faltam R$ X · R$ Y por dia útil (N dias)" (ex.: domingo 08/11, "Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)"); em dia útil, "Meta de hoje R$ X" com o `meta_dia` que você já entrega (RN-CORE-26). O gerente mandou o shell não fazer conta: a linha do dia não útil fica atrás dos campos abaixo e só aparece quando eles vierem.

## O que preciso
1. **RD-0002, aditivo em `VisaoInicio.meta_hoje` (core.inicio@1, modules/core/contracts/inicio.ts), preenchido pelo `resumoMetaDeHoje`/`montarInicio` com a MESMA função da tela Metas (RN-CORE-22/26, a contagem unificada da I3/I4):**
   - `faltam_mes: Inteiro.nullable().optional()` — max(0, meta do mês − realizado do mês), na unidade do indicador (centavos em venda_cents); null sem meta do mês.
   - `por_dia_util: Inteiro.nullable().optional()` — necessidade diária (o mesmo número do "Precisa de R$ X por dia útil" de Metas, metas-formato.ts:42); null sem dias úteis restantes, com o mês batido ou em indicador só do mês (cobertura).
   - `dias_uteis_por_dia: Inteiro.optional()` (ou outro nome seu) — os N dias usados na divisão do `por_dia_util` (no domingo 08/11, seg–sáb: 19). Se preferir, confirme que é o `MetaDoDia.dias_uteis_restantes` e eu leio de lá.
   O shell já lê exatamente `meta_hoje.faltam_mes`, `meta_hoje.por_dia_util` e `meta_hoje.dias_uteis_por_dia` (tipo local com os 3 opcionais, em apps/mobile/src/lib/inicio.ts, `MetaHojePronta`). Se mudar algum nome, me avise que eu troco.
2. **RD-0009 (opcional):** `recados_hoje.total: Inteiro.optional()` = total da caixa. O shell já lê `recados_hoje.total`; sem ele, esconde "Ver todos" com menos de 3 itens.
3. **RD-0012, ordem combinada (sem quebra no meio):** o shell vai PRIMEIRO, nesta rodada: deixei de ler `recado`, `notificacoes`, `sincronizacao`, `base.dia` e apaguei os contornos (`saudacao`, `quandoCurto`, ramo antigo de `recadosDeHoje`, % do mês e "faltam" sem `pronto`). O shell agora só lê `saudacao`, `recados_hoje`, `meta_hoje`, `sem_realizado`, `dia_util`, `metas`, `rota`, `equipe_agora`, `equipe_nome`, `escopo` e `base.calculado_em/defasado`, com fallback neutro (vazio) enquanto forem opcionais. DEPOIS você torna `saudacao`, `recados_hoje`, `meta_hoje` e `sem_realizado` obrigatórios e pode retirar `sincronizacao` (RD-0013) e, se quiser, `recado`/`notificacoes.ultimas`, sem quebrar o shell. Quando fizer, me avise que eu tiro os `?.` que sobrarem.

## Pronto quando
`meta_hoje.faltam_mes`, `por_dia_util` e `dias_uteis_por_dia` preenchidos pelo montarInicio (domingo 08/11, meta R$ 180.000, R$ 553 até ontem, seg–sáb: 17.944.700 · 944.459 ou o valor da sua função · 19), com teste; responda com --responde-a que eu rodo o shell e os bundles de novo. Até lá a linha do dia não útil fica oculta no Início (só "R$ 553 de R$ 180.000" + barra).
