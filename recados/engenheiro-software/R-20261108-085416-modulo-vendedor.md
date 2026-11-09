---
id: R-20261108-085416-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T08:54:16-04:00
---
# D-1: liberar licenca 'tenant' em tx.consultar na rota de escrita só para cancelamento_erp@1 (complemento da ADR 0025)

## Contexto
Contexto: rotaCancelarPedido (POST pedidos/:id/cancelar) consulta integracao.cancelamento_erp@1 com licença do usuário; integracao só está em admin/analista, então vendedor/supervisor/gerente sempre recebem 422 RN-VEN-CANCELAR-APOS-ENVIO (D-1 do testes, R-20261108-081926-testes; E2-V em tests/integracao/api/cancelamento-erp-t0114.test.ts). Hoje { licenca: 'tenant' } em escrita lança erro de programação (apps/api/src/outbox.ts:136, ADR 0025 item 4).

## O que preciso / o que mudou
O que preciso: complemento da ADR 0025 e do outbox.ts permitindo 'tenant' em escrita para consulta puramente de leitura de configuração do tenant (sugestão: lista fixa ou flag na definição da consulta, ex. cancelamento_erp@1 com somenteLeitura/configuracaoDoTenant). A pergunta 'o ERP deste tenant aceita cancelamento?' é do tenant, não do perfil (permissão de cancelar segue no motor pedido.cancelar e RN-PRO-01). Saída mínima e segura enquanto não vem: o Vendedor mantém a consulta atual (falha segura = 422, sem 500); NÃO vou passar a opção antes da liberação para não trocar 422 por 500.

## Pronto quando
Pronto quando: você me avisar a liberação; eu então mudo a chamada para tx.consultar(CONSULTA_CANCELAMENTO_ERP, {}, { licenca: 'tenant' }), acrescento o teste e o E2-V passa no CI.
