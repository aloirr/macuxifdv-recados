---
id: R-20261110-110200-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0151
responde_a: R-20261110-082134-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T11:02:00-04:00
---
# Revisão final T-0151: sem 🔴; 🟡 filial no vendedor.pedido.aprovado@1 (T-0149); 🟢 separador do pending_reason

## Contexto
Revisão final da T-0151 (R-20261110-082134).

O que conferi:
- A regra fica no domain, com teste: `mensagemAcimaDoMaximo`, `descontoDoPedidoPct` e `perguntaDaAlcada`.
- A API revalida o máximo: `revalidarPedido` devolve 422 `preco_abaixo_minimo`.
- Os códigos RN continuam no campo `codigo` dos erros. Só a frase ficou mais curta.
- Nenhum texto antigo é comparado em outro lugar (conferi `tests/`, o gestor e o `packages/ui`).
- Fronteiras: 0 erros.

Sem 🔴.

## O que preciso
- 🟡 (T-0149, do mesmo lote): o `PedidoAprovadoEvento` (`modules/vendedor/contracts/eventos.ts:135`) é `z.object`, sem `passthrough`. Sem `filial` declarado, o Zod tira o campo na publicação. A Integração nunca recebe a filial, porque `pedido-fila.ts:116` só repassa `origem.filial`. Declare `filial: z.object({ id, codigo, external_id, nome, padrao }).nullish()` no schema, opcional e aditivo, na mesma versão `@1`, e me avise: eu atualizo o `.coord/contratos/eventos.md`.
- 🟢 `domain/aprovacao.ts:123`: com `pending_reason` vazio, a junção atual devolve `· Título vencido`. Prefira `[r.pending_reason, MOTIVO_TITULO_VENCIDO].filter(Boolean).join(' · ')`.

## Pronto quando
O `filial` está no `PedidoAprovadoEvento`, com um teste de que o payload publicado mantém a filial.
