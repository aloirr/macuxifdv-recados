---
id: R-20261103-185025-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T18:50:25-04:00
---
# Desenho da T-0073 pronto (core.inicio@1, RN-CORE-26, recado do dia com 0021)

## Contexto
T-0073: desenho curto entregue em docs/desenho/T-0073.md (só documento, sem código).

## O que fiz (decisões)
1. Contrato novo core.inicio@1 = GET /v1/core/inicio (ação inicio.ver). Traz só o que falta no aparelho: o realizado de vendas e positivação partido em até ontem e hoje, pela consulta que já existe (vendedor.pedidos_da_meta@1), e os nomes da equipe. Meta do mês, visitas, rota, notificações, recado e parâmetros já vêm do pull. Offline: uma etapa de sync guarda a cópia, e montarInicio (puro) recalcula com o domain. Na virada do dia sem sinal, o hoje vira ontem e a tela avisa a base.
2. RN-CORE-26 em domain/meta-do-dia.ts: assinaturas e 8 casos (100.000 centavos em 18 dias úteis no dia 10/11/2026; meta batida; último dia do mês; domingo; calendário seg–sex; soma da equipe). A equipe soma as metas do dia de cada pessoa, não aplica a fórmula ao total. Cobertura aparece como valor do mês. O mix fica fora porque o indicador não existe.
3. Pedidos para aprovar: card do GESTOR no slot inicio.cards, lendo o cache fila (FilaAprovacao) que o Gestor já tem. O Core não lê gestor.*. O slot ganha ordem? opcional. É uma fatia pequena do modulo-gestor (4).
4. Equipe agora: equipeAgora no domain do Core, com pull visita/rota_parada da equipe. Status em_visita, em_rota, parado (≥ [inicio.parado_min 60] min do último checkout com paradas pendentes), sem_checkin e rota_concluida. Sem expediente e sem GPS.
5. Recado do dia: colunas em core.notificacao, marcadas por envio_id no escopo de quem marca (supervisor e gerente, ação notificacao.recado_do_dia). A data é hoje no fuso do tenant e é o servidor que decide. Um recado do dia por pessoa por dia. O fallback é inicio.recado_do_dia_padrao, ou "Bom trabalho hoje!".
6. HÁ MIGRAÇÃO: a 0021_core_recado_do_dia (2 colunas, 2 checks, FK, índice único, índice por envio; RLS já existe e não entra política nova). Pedido ao banco-dados em R-20261103-184906 para 04/11 10h.
7. Promotor: mesmo Início, só com os indicadores em que tem meta. Sem card de aprovação. A API não chama o Vendedor para ele sem meta de venda.

## Plano e pendências para você
- Fatias com donos e horários no §5; o prompt da nuvem do modulo-core no §6, autocontido, para você repassar ao dono do produto.
- Fatia 4 nova: modulo-gestor (nuvem nuvem/T-0073-gestor-inicio ou local, ~2h em 04/11). Ponha no quadro e ordene com a T-0072 na nuvem em modules/gestor/app/**.
- Doc 03 (seu): parâmetro inicio.parado_min [60] e a regra do §1.5; notas da soma da equipe, do mix e da cobertura; chaves metas.dias_uteis_semana e inicio.recado_do_dia_padrao.
- Premissas a confirmar, se quiser: parado sem expediente; promotor com meta de venda vê só o agregado.
- Backlog: push silencioso na marcação; tela do BKO dos parâmetros do Início; indicador mix.
- Testes: nenhum. Só documento; não rodei suíte.

## Pronto quando
Desenho aprovado e fatias no quadro até 04/11 9h.
