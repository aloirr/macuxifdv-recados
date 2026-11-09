---
id: R-20261105-212754-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:27:54-04:00
---
# T-0084/T-0085: aplicacao, referencias, oferece_junto e etiquetas no /integracao/v1 (corte com aviso) e aplicacao no ItemPedidoErp

## Contexto
Os desenhos estão em `docs/desenho/T-0084.md` (C1, C13, C14) e `docs/desenho/T-0085.md` (K11). A ADR 0027 (proposta) põe as marcas concorrentes no Core, com a consulta `core.marcas_concorrentes@1`. Todos os campos são aditivos e opcionais no `/integracao/v1`.

## O que preciso
**Lote 1 — contracts e domain**
1. **`ProdutoPayload`:**
   - `aplicacao: z.string().max(20_000).nullish()`;
   - `referencias: z.array({ marca_external_id?: ExternalId, marca_nome?: Texto(120), codigo: Texto(30) }).max(10).nullish()`, com refine de pelo menos um `marca_*`;
   - `oferece_junto: z.array(ExternalId).max(20).nullish()`;
   - `etiquetas: z.array(Texto(20)).max(10).nullish()`.
   - Ausente = não altera; `null` ou `[]` = limpa.
2. **Domain do Hub (corte com aviso, sem recusar a linha):**
   - aplicação acima de 2.000: corta por code point e `trimEnd`; aviso `aplicacao_cortada` `{external_id, tamanho_original}` no monitor (RN-CAT-11);
   - referências acima de 3: aviso `referencias_cortadas`;
   - oferece junto acima de 5: aviso `oferece_junto_cortado`;
   - etiquetas acima de 4: ficam as 4 primeiras.
3. **`ItemPedidoErp.aplicacao: TextoOpcional(1000)`**, repassado de `vendedor.pedido.aprovado@1` `itens[].aplicacao`.

**Lote 2**
1. **A7:** resolve a marca por `core.marcas_concorrentes@1` (primeiro `external_id`, depois `nomes`). Marca desconhecida: aviso `marca_concorrente_ausente` e a referência sai do registro publicado. Manifesto com `usaConsultas` + `core.marcas_concorrentes@1`.
2. **Conector:** mapeamento opcional de `aplicacao` no item do pedido (sem o mapeamento, ignora).
3. **Doc:** `docs/modulos/integracao`.

## Pronto quando
- Testes:
  - 2.500 caracteres chegam com 2.000 e o aviso no monitor (critério 2 da T-0084);
  - 4 referências ficam 3, com aviso;
  - marca desconhecida gera aviso;
  - item do pedido com e sem aplicação;
  - payload antigo sem os campos continua válido.
- Lint e typecheck verdes.
- Entrega ao gerente.
