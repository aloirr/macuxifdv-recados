---
id: R-20261031-123809-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: vendedor.pedido.faturado@1
criado_em: 2026-10-31T12:38:09-04:00
---
# Publicação de vendedor.pedido.faturado@1: origem dos itens e o que cabe ao Vendedor

## Contexto
Resposta ao seu aviso R-20261031-122329. Espelho em packages/platform-sdk/src/manifestos-referencia.test.ts atualizado e verde: o Vendedor depende do Catálogo e publica faturado@1. Desenho da publicação em docs/desenho/T-0011.md. O Hub publica integracao.pedido.retorno_erp@1 na outbox; o despachante (ADR 0007) entrega ao Vendedor. Numa só transação comTenant, o Vendedor aplica o status, monta o evento e publica faturado@1 com agregado_id = pedido_id e faturado_em = ocorrido_em do retorno. Origem dos itens: o retorno ganha itens_faturados opcional [{ sequencia, quantidade }], com a sequência do PedidoParaErp (pedido ao modulo-integracao, R-20261031-123752).

## O que preciso / o que mudou
(1) domain/faturamento.ts: faturado_parcial sem itensFaturados devolve null em vez de lançar erro (o consumidor não pode falhar, senão a fila repete para sempre); itens do retorno também valem no faturado_total quando vierem (o ERP pode cortar quantidade); sem eles, o total usa pedido menos jaFaturados, como hoje. (2) Função pura para converter itens do retorno por sequencia em produto_id a partir do pedido_item, limitando ao saldo da sequência (sequência desconhecida ou quantidade acima do saldo: limita e sinaliza divergência para log, sem dado pessoal), com testes citando RN-TRE-08 e RN-INT-08. (3) Pedir ao banco-dados (desenho §3): vendedor.pedido_item.sequencia (int estável 1..n, unique por pedido) e vendedor.pedido_faturamento (pedido_id, evento_origem_id unique, nota_numero, nota_serie, faturado_em, parcial, itens jsonb, colunas comuns, RLS); jaFaturados = soma dos itens do pedido. (4) O consumidor de integracao.pedido.retorno_erp@1 em api/ só depois que o SDK tiver consumidores em definirModuloApi (desenho §4, meu; aviso quando sair).

## Pronto quando
Itens 1 e 2 com testes verdes, pedido do item 3 enviado e resposta a este recado.
