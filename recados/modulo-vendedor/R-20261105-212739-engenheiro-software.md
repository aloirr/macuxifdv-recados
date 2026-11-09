---
id: R-20261105-212739-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:27:39-04:00
---
# T-0084/T-0085: aplicacao no item (retratoAplicacao, caixa por item), parâmetros, seletor pela busca do Catálogo e PDFs

## Contexto
O desenho está em `docs/desenho/T-0084.md` §7 (RN-VEN-19: aplicação no orçamento e no pedido, caixa **por item** e retrato) e `docs/desenho/T-0085.md` §5 (RN-CAT-10: referência fora do PDF do cliente). O Catálogo oferece duas consultas novas (API e aparelho):
- `catalogo.textos_produto@1`: aplicação e referências de até 500 produtos;
- `catalogo.busca_produtos@1`: o ranking do Catálogo, com `serve_em` e `equivale_a`.

## O que preciso
**Lote 1 — contracts e domain**
1. **Contracts:**
   - `ItemPush.aplicacao: z.string().max(1000).nullable().optional()` (ausente = null);
   - `PedidoItemSyncSchema.aplicacao?`;
   - `PedidoAprovadoEvento.itens[].aplicacao?` (`vendedor.pedido.aprovado@1`, aditivo).
2. **Parâmetros:** `aplicacao_no_orcamento_padrao` = true, `aplicacao_max_orcamento` (50..1000) = 300 e `referencia_no_orcamento` = false.
3. **`domain/aplicacao.ts`:** `retratoAplicacao(texto, incluir, max)`, com os testes do §7:
   - texto até 300 fica igual;
   - corte na palavra inteira + "…";
   - palavra única longa;
   - desmarcado dá null;
   - idempotente.

**Lote 2 — app e API**
1. **App:**
   - o seletor busca por `catalogo.busca_produtos@1` com os ids do seletor (plano B: `searchProducts` em `ConsultaIndisponivel`);
   - a lista mostra a aplicação em 2 linhas, com as marcas do `serve_em`;
   - o item mostra as 2 linhas e a caixa "Incluir aplicação no orçamento", que vem marcada pelo parâmetro;
   - retrato ao salvar ou enviar a partir de `catalogo.textos_produto@1`; na edição, o retrato já existente fica.
2. **API (`receber` e `PUT` do orçamento):**
   - null continua null;
   - texto grava `retratoAplicacao(texto, true, parâmetro atual)`;
   - nunca recusa por tamanho e nunca troca pelo cadastro.
3. **Saídas:**
   - "Aplicação: …" no detalhe (Campo, Gestão e BKO) e nos dois PDFs;
   - "Equivale a" só no PDF interno, ou também no do cliente com `referencia_no_orcamento`;
   - o evento `aprovado@1` leva o campo.
4. **Manifesto:** `usaConsultas` + `catalogo.textos_produto@1` e `catalogo.busca_produtos@1`.

## Pronto quando
- Lote 1 verde (lint, typecheck e testes).
- Lote 2:
  - critérios 6 e 7 da T-0084 (item desmarcado grava nulo; corte em 300; detalhe e PDFs) e 5 da T-0085 demonstrados;
  - o promotor continua sem pedido (regra 7);
  - entrega ao gerente.
- O lote 2 depende do lote 1 do modulo-catalogo (as consultas) e da migração 0033 (`pedido_item.aplicacao`).
