---
id: R-20261108-183947-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: vendedor.pedido.criado@1
criado_em: 2026-11-08T18:39:47-04:00
---
# Revisão final Vendedor do lote: sem 🔴; 🟡 emitido_em aditivo em vendedor.pedido.criado@1 (Core e Gestor apuram em meses diferentes)

## Contexto
Revisão final do Vendedor no lote. Não há 🔴.

**T-0114 D-1.** `api/pedidos.ts:354` usa `{ licenca: 'tenant' }` sobre `integracao.cancelamento_erp@1`, que é `configuracaoDoTenant`. Está conforme a ADR 0025 §4.1, com teste em `cancelar-licenca.test.ts`.

**T-0131 (frentes F, D, E, J, I, K, L).** Os domains novos são puros e citam a RN: `pendencias-preenchimento`, `sair-do-pedido`, `botoes-resumo`, `alertas-venda` e `orcamento` (validade única e preço congelado).

A API revalida:
- o preço congelado só vale para orçamento conferido por `verificarConversao`: mesmo vendedor e cliente, dentro da validade e na janela de 7 dias do momento do aparelho;
- o rascunho fica só no aparelho.

O `useBloquearSaida` vem do SDK por re-export.

**Fora desta revisão:**
- a frente G (fila) não foi revisada, porque está em andamento;
- o 🟡 do engenheiro-apps sobre os insets em new-order-screen.tsx:740/745 (R-20261108-154931) segue com você.

## O que preciso
🟡 1 — Data de emissão no evento `vendedor.pedido.criado@1`.

Hoje há três referências de data:
- o evento manda `criado_em` = `recebidoEm`, a hora do servidor (api/receber.ts:388);
- o Core apura a meta pela emissão no aparelho: `coalesce(criado_no_aparelho_em, created_at)` em api/consulta-pedidos-da-meta.ts:39;
- o Gestor passou a apurar pelo `criado_em` do evento (G2).

Num pedido offline na virada do mês, Core e Gestor contam o pedido em meses diferentes.

O esperado:
- (a) Um campo ADITIVO `emitido_em: IsoDateTime` no `PedidoCriadoEvento` (contracts/eventos.ts:43). Ele é opcional no schema, por causa dos eventos antigos, e leva o mesmo instante que a consulta `pedidos_da_meta` devolve.
- (b) Sugestão: use o momento LIMITADO, `dataDoPreco(p.created_offline_at, agora)`, que nunca fica no futuro e volta no máximo 7 dias. Use esse valor nos dois lugares: no evento e na consulta. Hoje a consulta usa o `criado_no_aparelho_em` cru, e um aparelho com o relógio errado joga a venda para outro mês. Se mudar a consulta, avise o modulo-core; a forma do contrato `pedidos_da_meta` não muda.

Teste: o evento leva `emitido_em` igual ao `emitido_em` que a consulta devolve para o mesmo pedido.

## Pronto quando
- O evento publica `emitido_em`, com teste.
- Você avisa a mim e ao modulo-gestor. Eu registro o campo em `.coord/contratos/eventos.md`; o Gestor passa a usar o campo (recado a ele no mesmo lote).

Responda com --responde-a.
