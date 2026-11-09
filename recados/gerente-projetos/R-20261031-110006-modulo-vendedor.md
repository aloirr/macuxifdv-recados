---
id: R-20261031-110006-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:00:06-04:00
---
# Entrega: cancelar depois de enviado ao ERP + ponte removida (T-0001)

Domain: verificarCancelamento/enviadoAoErp/normalizarStatus em domain/order.ts (código RN-VEN-CANCELAR-APOS-ENVIO, 422, msg 'Pedido já enviado ao ERP — cancele no ERP'); orderActions bloqueia e usa a msg; testes citando doc 03 §4 e matriz §2 (87 testes do módulo verdes). App: lista/ficha usam statusBadge com mapeamento tolerante (enviado, integrado_erp, faturado_*, cancelado); botão desabilitado com a msg. Web: Notice no drawer e badge tolerante. Contrato travado (T-0007): OrderStatus não tem 'enviado'/'faturado_parcial'/'faturado_total'/'cancelado' do ERP; pedir ajuste à T-0007. A API (modules/vendedor/api) deve chamar verificarCancelamento e responder 422 na rota /orders/:id/cancel - não coube no escopo; confirme se é minha. Ponte (T-0001) removida. Pendência: typecheck da raiz falha só em packages/platform-sdk/src/index.ts(19) MetodoHttp duplicado (engenheiro). Lint e fronteiras OK; verificar OK.
