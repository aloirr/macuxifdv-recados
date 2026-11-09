---
id: R-20261103-020048-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:00:48-04:00
---
# comTenant do pull de sync sem tx (consultar)

## Contexto
Contexto

## O que preciso / o que mudou
No provedor de pull (ProvedorSync) ctx.comTenant chama fn só com db; tx é undefined, então tx.consultar não existe. O Vendedor trata a ausência como padrão ligada para promotor_ve_pedidos (opcao-promotor.ts)

## Pronto quando
Passar tx (TransacaoTenant) ao comTenant do contexto do pull, para a opção do Core valer também no pull | Pronto quando: tx.consultar disponível no pull; então removo o fallback.
