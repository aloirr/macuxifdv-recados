---
id: R-20261102-123441-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:34:41-04:00
---
# T-0061 rev. 2: frete CIF/FOB sem valor, preço mínimo RN-VEN-11, coluna Medida e frete nos PDFs (nomes finais)

## Contexto
Desenho T-0061 revisão 2 (`docs/desenho/T-0061.md` §3 e §4.3) e ADR 0016 emenda 1, com as decisões R-20261102-105040 (frete: CIF/FOB sem valor; FOB com transportadora obrigatória cadastrada ou digitada), R-20261102-094644 (RN-VEN-11 preço mínimo) e R-20261102-111619 (RN-VEN-15 ajustada, coluna Medida e frete nos PDFs). A 0013 já está no formato final do frete.

## O que preciso / o que mudou
Frete (sai do desenho anterior: `frete.tipo`, `pct`, `valor_cents`, `frete_cents`, `total_a_pagar_cents`, `vendedor.cliente_frete`, parâmetro `frete.transportadora_digitada` e o código `transportadora_digitada_proibida`):
- `TransportadoraDigitada = { nome: trim 2–120, cnpj: /^\d{14}$/ (+ DV no domain com @macuxi/comum/documento), telefone?: até 30 }`.
- `Frete = z.discriminatedUnion('modalidade', [{ modalidade: 'CIF' }, { modalidade: 'FOB', transportadora_id?: Id | null, transportadora_digitada?: TransportadoraDigitada | null }])`, `.strict()` nos dois. `PedidoPush.frete` ausente = parâmetro `frete.modalidade_padrao` (CIF).
- Códigos novos em `CODIGOS_RECUSA_PEDIDO`: `transportadora_obrigatoria` ("Informe a transportadora do frete FOB."), `transportadora_invalida`, `preco_abaixo_minimo`.
- Banco: `frete_modalidade`, `transportadora_id`, `transportadora_digitada`, `transportadora_nome`, `transportadora_documento` (o CNPJ), `transportadora_telefone` (0013). `PedidoSyncSchema` ganha esses opcionais (sem `frete_tipo/pct/cents`).
Domain (teste antes): `totaisDoPedido(itens, pedido)` sem frete; `validarFrete(f)`; `precoMinimoBaseCents({ preco_venda_cents, desconto_maximo_pct })` (meia para cima; null = sem preço de venda); `precoDoItem` devolve `preco_minimo_cents` (= mínimo base × fator, na medida vendida) para o retrato em `pedido_item.preco_minimo_cents`; `descontoMaximoDoItemPct(preco_tabela_cents, preco_minimo_cents)` (2 casas truncado, 0 se a tabela já está abaixo); `rotuloMedida(unidade, fator)` → "UN" / "CX c/ 12".
Desconto máximo efetivo: na API vem pronto em `core.cadastro_resumo@1` `produtos[].desconto_maximo_pct` (+ `preco_venda_cents`); no aparelho, `produto.desconto_maximo_pct` (pull do Core) ?? `ambiente.parametros('core')['produto.desconto_maximo_pct']` ?? 15.
Item do pedido: nada novo no banco (`unidade` = sigla da medida vendida, `fator`, `quantidade_base`).
Detalhe/PDF (`OrderDetail`/`OrderItem`): item `unit`, `factor`, `base_quantity`, `unit_label` (coluna **Medida** depois de Descrição), `surcharge_pct`; pedido `freight: { modality, carrier_name, carrier_document, carrier_phone, carrier_typed }`, `delivery_address`, `price_table_name` (nome da tabela no PDF interno, não o id). Texto: "Frete: CIF – por conta da empresa" ou "Frete: FOB – por conta do cliente · <transportadora> (CNPJ <formatado>)". CNPJ do cliente formatado no PDF. Nome da distribuidora no cabeçalho: depende de `ctx.tenant()` / `tenant.nome` no `/v1/me/modulos`, que é meu (§7 do desenho) — até lá mantenha o cabeçalho atual.
`vendedor.pedido.aprovado@1`: `frete` no formato do doc 06 (`{ modalidade: 'CIF' }` ou FOB com `transportadora: { tipo: 'cadastrada', id, external_id, nome, cnpj, telefone } | { tipo: 'digitada', nome, cnpj, telefone }`); sem `total_a_pagar_cents`.

## Pronto quando
Testes de domain: CIF sem transportadora válido; FOB sem transportadora recusado (app e API); FOB com cadastrada ou digitada (nome e CNPJ válidos) aceito; frete não altera total, desconto efetivo nem meta; preço mínimo com desconto próprio e com o padrão 15%; desconto do item travado no limite; `pdf-pedido` com CIF, FOB, UN e CX.
