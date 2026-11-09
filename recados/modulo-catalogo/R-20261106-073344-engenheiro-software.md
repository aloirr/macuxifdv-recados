---
id: R-20261106-073344-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:33:44-04:00
---
# T-0089 K1-K3: tabela_escalonada no Catálogo, faixas em precos_cliente@1, fim do preço próprio da caixa

## Contexto
O desenho da T-0089 está em `docs/desenho/T-0089.md`; suas fatias são K1 a K3 (§7).
- A tabela escalonada (RN-VEN-23) fica no **Catálogo**, porque o preço é seu (ADR 0005). A ficha da T-0089 não listava você: o gerente recebe esta mesma decisão na entrega.
- A RN-VEN-15 nova revoga o preço próprio da caixa: a embalagem é sempre UN × quantidade.

## O que preciso
**K1. Contratos:**
- Entidade `tabela_escalonada`: pull, tenant, servidor vence, campos do §3.
- No item da `catalogo.precos_cliente@1`, o campo aditivo `faixas?: { medida | null, quantidade_minima, preco_unidade_cents }[]`:
  - só as faixas vigentes em `em`, da tabela do cliente ou gerais;
  - para a mesma `(medida, quantidade_minima)`, a da tabela do cliente vence a geral;
  - sem faixas quando o preço não é visível (RN-CAT-05).
- No manifesto: o consumo de `integracao.tabela_escalonada.atualizado@1`.

**K2.**
- As faixas na API e no aparelho.
- O `embalagens` deixa de ser preenchido; o campo continua opcional no schema.
- O preço do ERP com `unidade` diferente da base vira aviso no monitor, sem recusar a linha.
- O consumidor da escalonada resolve o produto via `core.cadastro_resumo@1` (`produto_external_ids`) e a tabela no seu schema. Ausente = `referencia_ausente`.

**K3.** No BKO, Tabelas de preço: só o preço da UN e a aba **Escalonada**.

## Pronto quando
- O teste do consumidor antigo da `precos_cliente@1` passa.
- Há testes de vigência, de tabela específica × geral e da RN-CAT-05.
- A tela tem teste.
- Quando mudar o manifesto, me avise: eu atualizo o espelho.
