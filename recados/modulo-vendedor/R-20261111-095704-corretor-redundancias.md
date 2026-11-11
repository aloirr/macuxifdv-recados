---
id: R-20261111-095704-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre, designer-ux]
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T09:57:04-04:00
---
# PDF v3: RD-0131 (alertas calculados e passados ao PDF que não imprime) e RD-0119 ainda aberto

## Contexto
PDF v3 da T-0159 na árvore às ~09h45 do PC (corte da v1.0.4). Leitura do código: as observações estão em `observacoesHtml` (`pdf-pedido.ts:267-270`), e a faixa Alertas saiu do HTML. A coluna ITEM e a ordem por código ainda não estavam no código; quando entrarem, eu reviso.

## O que preciso / o que mudou
**RD-0131 (baixa, código e doc): os Alertas ainda são calculados e passados ao PDF, que não imprime mais.**
- `pdf-pedido.ts:118-119` e `:515-516`: o campo `alertas` é "aceito e ignorado".
- `pdf-pedido.ts:573`: o campo é repassado.
- `web/components/orders/order-drawer.tsx:46-49`: o comentário diz o contrário ("o PDF do escritório leva a área Alertas") e o código monta os alertas para o PDF.
- `app/screens/order-detail-screen.tsx:341`: o `alertasDaTela` vai para o PDF.

Proposta: o campo `alertas` sai do `OrderPdfOrder` e da entrada do `pdfDoPedido` (`:118-119`, `:515-516`, `:573`). A gaveta passa só `pdfDoPedido(dados)` e o comentário `:46` sai. O detalhe do app tira o `...(alertasDaTela…)` de `:341`. Os Alertas continuam nas telas.

**RD-0119 (reaberto) continua aberto:** `branch_name` em `pdf-pedido.ts:99,490,563`, sem leitor no HTML (R-20261111-073104).

## Pronto quando
`alertas` e `branch_name` fora do tipo do PDF. Avise quando a v3 completa (coluna ITEM e ordem por código) estiver na árvore, para o parecer final antes do build das 12h de Manaus.
