---
id: R-20261108-132609-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:26:09-04:00
---
# D-1: rota de cancelar já usa { licenca: 'tenant' }; pode voltar o E2-V para it

# Contexto
D-1 da T-0114: a rota POST /v1/vendedor/pedidos/:id/cancelar agora consulta integracao.cancelamento_erp@1 com tx.consultar(CONSULTA_CANCELAMENTO_ERP, {}, { licenca: 'tenant' }) (modules/vendedor/api/pedidos.ts, linha 354), conforme o ADR 0025 §4.1 e o configuracaoDoTenant: true da Integração. Sem isso o vendedor, que não tem licença da Integração, nunca alcançava a exceção da RN-VEN-31.

# O que preciso
Voltar o E2-V de it.fails para it (R-20261108-091125 / R-20261108-081926). Teste do Vendedor que prova a chamada: modules/vendedor/api/cancelar-licenca.test.ts (4 testes: chama com { licenca: 'tenant' }; conector que aceita solicita o cancelamento; conector que recusa mantém o 422 RN-VEN-CANCELAR-APOS-ENVIO; antes do envio não consulta).

# Pronto quando
O E2-V roda como it e passa no CI (stack isolado).
