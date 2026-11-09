---
id: R-20261104-025708-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T02:57:08-04:00
---
# testID novos do novo pedido e do orçamento (app Campo, fatia 6)

## Contexto
T-0071, fatia 6 (app Campo): novo pedido em 3 abas com ajuste em % ou R$, tela do orçamento e sugestões. Os e2e antigos usavam os testID da aba "Condições"; abaixo estão os atuais (arquivos em modules/vendedor/app/components/novo-pedido*.tsx e app/screens/{new-order,order-detail}-screen.tsx).

## O que preciso
Atualizar os e2e do Vendedor para estes testID (k = código ERP do produto, com "-<UN|CX|FD>" quando o produto tem mais de uma medida):
- **Abas** (`abas-pedido`): Itens, Detalhes, Resumo. Rodapé `rodape-pedido` com `avancar`. Salvar: `send-order`; folha `folha-salvar` com `salvar-enviar` e `salvar-orcamento`; cancelar: `cancelar-pedido` e `descartar-confirmar`/`descartar-voltar`.
- **Itens**: `card-frete-prazo`, `frete-CIF`/`frete-FOB`, `terms-<descrição>`, `product-search`, `trilha-catalogo` (abre /m/catalogo?cliente=..&pedido=1), `product-<erp>`, `medida-<k>` (chip da medida), `preco-<k>` ("R$ 17,90 → 17,01"), `qty-<k>`/`inc-<k>`/`dec-<k>`, `total-<k>`, `equivalente-<k>` ("−R$ 0,89", "= 5,3%" ou "+ desconto" sem ajuste; toque abre o painel, mesmo testID `ajuste-<k>`), `ajuste-painel-<k>`, `ajuste-tipo-<k>-desconto|acrescimo`, `ajuste-modo-<k>-pct|valor`, `ajuste-pct-<k>` (+ `-menos`/`-mais`) no modo %, `ajuste-valor-<k>` (+ `-menos`/`-mais`) no modo R$ (centavos por unidade da medida).
- **Detalhes**: `entrega-trocar`, `observacao`, `sugestoes-combina`, `sugestoes-leve-mais`, `sug-add-<produtoId>` (+ soma 1 UN), `sug-troca-<produtoId>` (⇄ troca pela embalagem maior).
- **Resumo**: `resumo-pedido`, `resumo-entrega`, `pedido-ajuste-tipo-desconto|acrescimo`, `pedido-ajuste-modo-pct|valor`, `discount-input` (% do pedido), `discount-valor` (R$ do pedido), `pedido-equivalente`, `totais-pedido`, `faixa-alcada`.
- **Detalhe do orçamento**: `orcamento-selo` (texto "Orçamento · até dd/mm", "Vencido"...), `orcamento-converter` (agora "Transformar em pedido"), `pedido-editar`, `pedido-duplicar`, `action-pdf` (rótulo "PDF"), `pedido-excluir` (rótulo "Cancelar orçamento" no orçamento), folha `folha-conferencia` com `conferencia-enviar`, `conferencia-voltar`, `conferencia-bloqueio`.
- Removidos: tudo da aba "Condições" (chips de condição/Entrega ficam em Itens e Detalhes).
- Regras para os casos: 398,30 → 379,79 (4,6%, sem aprovação); Transformar copia ajustes/frete/endereço (sem % e R$ juntos); Editar orçamento recebido exige sinal (PUT /v1/vendedor/orcamentos/:id).

## Pronto quando
Os e2e do Vendedor (novo pedido, orçamento → pedido, offline) usam estes testID e passam; avise se faltar algum testID que o caso precise.
