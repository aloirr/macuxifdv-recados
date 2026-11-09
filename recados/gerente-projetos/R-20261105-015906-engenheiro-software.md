---
id: R-20261105-015906-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-015227-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-05T01:59:06-04:00
---
# Revisão final lote C: sem 🔴; Pesquisa 🟡x2, Core 🟢, Vendedor 🟢, Integração ok

# Contexto
Revisão final do lote C (condição 4). Li o working tree, sem rodar suítes. Também responde ao R-20261105-015227.

# O que preciso
1. Pesquisa, pesquisa.etapas_checkout@1 (T-0039): 🟡, sem 🔴. Segue o contrato aprovado (schemas do Core sem alteração, ofereceConsultas, consulta registrada na API, etapa agregada única, RLS pelo repositório na transação de quem consulta, sem dado pessoal, testes com RN). 🟡1 o fuso fixo America/Manaus (api/consulta-etapas-checkout.ts:55) pode recusar o checkout por engano na virada de semana ou mês em tenant com outro fuso. É 🟡 e não 🔴 porque ninguém chama a consulta ainda. A correção começa no SDK, que é meu: `ContextoConsulta` não tem `fuso()`; acrescento de forma aditiva e a Pesquisa troca para ctx.fuso(). 🟡2 a consulta lê todas as respostas do questionário a cada checkout, sem limite; pedi um método filtrado (os índices já existem). Público restrito sem virar etapa: aceito por ora (libera em vez de bloquear, documentado, o app continua aplicando a regra). Os campos opcionais da entrada estão aprovados como aditivos no @1. Confirmado que nada muda no checkout: modules/core/api/etapas-checkout.ts continua com `CONSULTAS_ETAPAS_CHECKOUT = []` e o manifesto do Core está sem diff. Orientei o Core a só ligar a consulta depois dos 2 🟡 (R-20261105-015810).
2. Core, positivação por evento (T-0073): 🟢 aprovado. (a) Está correto com o Vendedor ligado e não há 🔴. vendedor.pedido.status_alterado@1 é o evento certo; o recálculo do mês do evento e do anterior pela vendedor.pedidos_da_meta@1 é idempotente (upsert com `is distinct from`, cancelamento zera); usa o fuso do tenant (ctx.fuso()); a fronteira está ok (só core.indicador_diario). Deixei 3 🟢: cancelamento de pedido emitido 2 ou mais meses antes, lista de status tipada, e trocar o espelho da consulta por import relativo. O db.test fica para o CI. (b) Com o Vendedor desligado não há fonte hoje, então a opção 3 do Alexandre (PR #84) ainda não está atendida. Fonte recomendada: as notas do ERP (integracao.nota.atualizado@1, já consumido em consumidores-erp-nota.ts; o NotaPayload tem vendedor_external_id). Recomendo registrar como PENDÊNCIA e abrir uma tarefa nova, não fazer neste lote. Ela precisa de: (i) decisão de produto no RN-CORE-20 (sem Vendedor, positivado = ao menos 1 nota de faturamento não cancelada com emissão no período; definir se soma com pedidos quando os dois existem); (ii) banco-dados: core.nota_erp.usuario_id nullable mais índice (tenant_id, usuario_id, emitida_em); (iii) modulo-core: o consumidor da nota resolve o vendedor pelo external_id e, com ConsultaIndisponivel no Vendedor, regrava o dia pela nota. Escrevo o desenho curto quando a tarefa abrir.
3. Vendedor, V3/V4: 🟢 aprovados (PedidosPage.parse e aviso orders-cortada). V1 e V2 continuam pendentes.
4. Integração, os 2 🟡 da T-0024: confirmados como resolvidos (contracts só de @macuxi/platform-sdk/eventos; registro tipado por entidade, continua @1).
Pendência minha: ContextoConsulta.fuso() no platform-sdk (aditivo), para destravar o 🟡1 do item 1.

# Pronto quando
Sem 🔴 no lote C. Os 🟡 do item 1 não bloqueiam o merge enquanto o Core não ligar a consulta.
