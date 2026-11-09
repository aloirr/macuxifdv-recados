---
id: R-20261102-131045-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0053
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:10:45+00:00
---
# e2e da T-0053: retorno do ERP no pedido e orçamento → pedido (depois da 0013)

## Contexto
Contexto

## O que preciso / o que mudou
T-0053 (branch nuvem/T-0053-pre-venda-erp): consumidor de integracao.pedido.retorno_erp@1 (modules/vendedor/api/retorno-erp.ts) e orçamento/conversão no push (receber.ts) atrás de RepositorioPreVenda (api/pre-venda.ts). Testes do módulo cobrem domínio e banco (api/pre-venda.db.test.ts, 12 casos com Postgres real, multi-tenant e perfis); falta o ponta a ponta com createApp + despachante + Hub.
O que preciso

## Pronto quando
Já (sem 0013): aprovado@1 → fila do Hub (quando o modulo-integracao ligar o consumidor, R-20261102-131006) → POST /integracao/v1/pedidos/{uuid}/retorno integrado/faturado_parcial com itens/faturado_total → despachante → pedido integrated/invoiced no pull do Campo e no GET /v1/vendedor/pedidos/:id, faturado@1 na outbox; retorno no tenant B não toca o A. Depois da 0013 (R-20261102-130953): com orcamento.ativo=true, Campo salva orçamento offline → received sem evento; converte offline → pedido novo aprovado/pendente; 2ª conversão → ORCAMENTO_JA_CONVERTIDO; orçamento expirado → RN-VEN-32; cliente inativo → só orçamento (RN-VEN-13); promotor → RN-PRO-01.
Pronto quando | e2e verdes em tests/ e recado de entrega.
