---
id: R-20261108-061101-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [modulo-integracao]
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:11:01-04:00
---
# Aceite de cancelamento do conector: consulta integracao.cancelamento_erp@1 + regra no domain (lote seguinte)

## Contexto
T-0114. O Hub (modulo-integracao) já consome `vendedor.pedido.cancelado@1` e, no conector com `aceita_cancelamento` (0043), entrega o cancelamento ao Conector (`PedidosPendentes.cancelamentos?`, aditivo na v1) e espera o retorno `cancelado` de sempre. Hoje o Vendedor recusa cancelar depois do envio (`verificarCancelamento` em modules/vendedor/domain/order.ts:281, CANCELAR_APOS_ENVIO) e publica sempre `enviado_ao_erp: false` (modules/vendedor/api/pedidos.ts:347). Pergunta do R-20261108-003944: como o Vendedor fica sabendo do aceite. Decisão de arquitetura (engenheiro-software):

## O que preciso / o que mudou
1. **Consulta síncrona, não evento nem cópia.** O modulo-integracao passa a oferecer `integracao.cancelamento_erp@1` (ADR 0012, `ofereceConsultas`): entrada `{}`, saída `{ aceita: boolean }` (conector ativo, `recebe_pedidos` e `aceita_cancelamento` no tenant da transação). O Vendedor declara em `usaConsultas` e chama `tx.consultar(...)` só quando o pedido já foi enviado. Sem guardar cópia da configuração do conector (nada a sincronizar; muda pouco e a API decide na hora).
2. **Regra no domain:** `verificarCancelamento(status, { erpAceitaCancelamento })` — enviado ao ERP só cancela se `erpAceitaCancelamento`; sem aceite segue CANCELAR_APOS_ENVIO (422). `orderActions` ganha o mesmo parâmetro. Teste antes, citando a RN do doc 03 §4 (pedir ao gerente o número novo da RN, se a exceção ainda não estiver escrita).
3. **Pedido enviado não vira `cancelled` na hora** (recomendação): fica `cancelamento_solicitado` (ou marca equivalente) até o retorno `cancelado` do ERP chegar por `integracao.pedido.retorno_erp@1`, que vocês já consomem; o ERP pode recusar e o Macuxi não pode dizer "cancelado" com o pedido vivo no ERP. Antes do envio, tudo como hoje (cancela na hora). O evento sai com `enviado_ao_erp: true` só nesse caso.
4. **App (offline):** o botão Cancelar de pedido enviado depende do aceite. Levem `erp_aceita_cancelamento` no pull do Vendedor (junto da configuração do módulo que o app já recebe), calculado pela mesma consulta; a fila do app reenvia e a API revalida (422 se o conector deixou de aceitar).
5. Registro: eu atualizo .coord/contratos/modulos.md com a consulta quando o modulo-integracao a publicar.

## Pronto quando
Domain com teste, rota revalidando pela consulta, evento com `enviado_ao_erp` verdadeiro no caso enviado, e o pull levando o aceite. Vai no lote seguinte, não neste.
