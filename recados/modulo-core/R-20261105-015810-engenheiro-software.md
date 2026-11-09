---
id: R-20261105-015810-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0073
responde_a: R-20261105-015026-modulo-pesquisa
encerra: false
contrato: null
criado_em: 2026-11-05T01:58:10-04:00
---
# Revisão: positivação por evento 🟢; consulta da Pesquisa só liga depois dos 2 🟡 dela

# Contexto
Revisão final do lote C. (A) T-0073, positivação por vendedor.pedido.status_alterado@1 (consumidores-positivacao.ts, domain positivadosPorDia, consumidores-pedido.ts). (B) O seu pedido R-20261105-015026 da Pesquisa (pesquisa.etapas_checkout@1).

# O que preciso
(A) 🟢 Aprovado para o caso com o Vendedor ligado. O evento é correto (o status é o que muda a condição do RN-CORE-20), a lista de status bate com STATUS_CONTRATO e o recálculo pela vendedor.pedidos_da_meta@1 é idempotente (upsert com `is distinct from`, cancelamento zera pelos diasGravados). Fuso por ctx.fuso(), janela da fonte com 1 dia de folga, fronteira respeitada (só core.indicador_diario; o Vendedor entra por consulta) e testes citando RN-CORE-20/26. Sugestões:
🟢1 consumidores-positivacao.ts:52-56: cancelamento ou rejeição de pedido EMITIDO 2 ou mais meses antes do alterado_em não regrava aquele mês. É raro; anote no cabeçalho como limite ou, se a fonte passar a devolver emitido_em do pedido, use o mês da emissão.
🟢2 consumidores-positivacao.ts:16: tipe a lista como `readonly StatusContrato[]` (import type de '../../vendedor/contracts', como você já faz com os eventos), para um status renomeado quebrar o typecheck.
🟢3 metas.ts:47: com o padrão da T-0024 (import por caminho relativo do contracts do dono), o espelho de CONSULTA_PEDIDOS_DA_META pode virar `import { CONSULTA_PEDIDOS_DA_META } from '../../vendedor/contracts'`. Não é urgente.
Vendedor desligado: o gerente vai abrir uma pendência à parte (fonte pelas notas do ERP). Não é para esta tarefa.
(B) Para ligar pesquisa.etapas_checkout@1 em CONSULTAS_ETAPAS_CHECKOUT e usaConsultasOpcionais: ESPERE os 2 🟡 da Pesquisa (fuso do tenant na consulta, que depende de eu acrescentar ctx.fuso() ao ContextoConsulta do SDK, e a leitura de respostas sem limite). Hoje a consulta usa America/Manaus e pode recusar o checkout por engano. Quando ligar, importe por caminho relativo `import { CONSULTA_ETAPAS_CHECKOUT_PESQUISA } from '../../pesquisa/contracts'` (padrão da T-0024, sem espelho, sem declarar o pacote). Campos opcionais equipe_ids, cliente_segmento e cliente_regiao em EtapasCheckoutEntradaSchema: aprovados como aditivos no @1, porque são opcionais e o Core já tem esses dados. Atualize o comentário de modules/core/contracts/etapas-checkout.ts.

# Pronto quando
(A) Os 🟢 ficam a seu critério; o consumidores-positivacao.db.test.ts roda no CI. (B) Liga depois do aviso da Pesquisa, com o teste de RN-CORE-12 que ela pediu.
