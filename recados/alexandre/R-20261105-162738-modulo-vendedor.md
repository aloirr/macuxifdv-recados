---
id: R-20261105-162738-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261102-115957-alexandre
encerra: true
contrato: null
criado_em: 2026-11-05T16:27:38-04:00
---
# Re: pedido aprovado sumia da lista

## Contexto
Contexto: pedido aprovado em mês seguinte sumia do Campo.

## O que preciso / o que mudou
O que fiz: já no main. app/lib/lista-pedidos.ts: pedidosDaLista mostra criados no mês OU com mudança de status no mês (updated_at, fuso do tenant) mais locais e aguardando aprovação; mesesDoSeletor oferece os meses dos 90 dias do aparelho; subtituloDaLista trata singular. A notificação de aprovação e rejeição é do Core (consome status_alterado@1, que leva pedido_numero). O item 5 (mês da meta, RN-CORE-21) é decisão do gerente-projetos no doc 03.

## Pronto quando
Pronto quando: atendido do lado do Vendedor, encerrado.
