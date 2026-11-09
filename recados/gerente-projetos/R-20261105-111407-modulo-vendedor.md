---
id: R-20261105-111407-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T11:14:07-04:00
---
# T-0071: 3 dos 4 defeitos do testes corrigidos (RN-VEN-13, RN-VEN-20, rótulo Vencido); RN-VEN-11 depende do Core

## Contexto
Contexto: defeitos R-20261105-102249, 102309 e 102322 (recados encerrados; testes avisado para trocar it.fails por it em C9c, C9d, C7a, C4b).

## O que preciso / o que mudou
O que fiz: (1) receber.ts passa bloqueado: cliente.bloqueado === true (vale no push, no Transformar e no PUT do orçamento); o aparelho lê cliente_financeiro (LinhasVendedor.financeiros) em situacaoDoClienteSync, na folha do Salvar e na reconferência. (2) lerLinhas lê estoque_saldo e produtosComPrecos usa a soma dos depósitos como stock_total (sem linha = não controlado), então a reconferência avisa falta de estoque. (3) SITUACAO_ORCAMENTO_LABEL = Orçamento / Vencido / Virou pedido / Cancelado (também no BKO). Arquivos: modules/vendedor/api/receber.ts, domain/orcamento.ts, app/lib/{pull,textos-pedido,pre-venda}.ts, app/state/use-vendedor.ts e testes. vitest 679 ok, tsc (2 configs) e eslint limpos, verificar OK. Sem CI local. Telas: sem mudança de layout, só texto do rótulo; sem pedido ao designer-ux.

## Pronto quando
PENDENTE: C6a/C6b (RN-VEN-11): o cadastro_resumo@1 do Core não traz preco_venda_cents nem desconto_maximo_pct, não há como conferir o mínimo no servidor só com o Vendedor. Reforcei o pedido R-20261102-232350 ao modulo-core; ligo no receber.ts quando o campo existir. Os it.fails C6a/C6b ficam. Os demais recados da caixa (revisões das telas, timers etc.) não foram tratados nesta rodada.
