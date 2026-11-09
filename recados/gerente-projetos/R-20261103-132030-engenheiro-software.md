---
id: R-20261103-132030-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T13:20:30-04:00
---
# T-0071: desenho do novo pedido em 3 abas + orçamento (docs/desenho/T-0071.md)

## Contexto
T-0071: desenho técnico do Novo pedido em 3 abas + orçamento (R-20261103-123656/130003/130240). Só documento; nada de código, contrato ou migração foi alterado (a demo das 15h roda desta árvore).

## O que fiz
`docs/desenho/T-0071.md`:
- §1 Modelo do orçamento: continua sendo `tipo = 'orcamento'` na linha de `vendedor.pedido` (já está na 0013 e no domain da T-0053). Não é status do RN-VEN-30 nem entidade própria. Vencido e convertido são situações derivadas. Validade por data civil no fuso do tenant, a partir do momento do aparelho. Transformar = pedido NOVO com `orcamento_origem_id`, em 2 toques, com `reconferirOrcamento` (preço, sem preço, estoque, mínimo, medida, alçada, cliente).
- §2 Contratos aditivos no @1 (ItemPush/PedidoPush em R$, EditarOrcamentoRequest, OrderListQuery.tipo, Order/Sync). **Nenhum evento novo nem versão nova, sem ADR.** Hub e Gestor sem mudança de contrato.
- §3 Cálculo: os números da referência **fecham** (398,30 / 14,67 / 3,84 / 379,79 / 4,6%), mas **não com o código atual**, que arredonda a linha e dá 51,02 e 379,78. É preciso: preço unitário arredondado com linha = unitário × quantidade; ajuste do pedido sobre o total dos itens, com rateio pelo maior resto; % exibido com 1 casa, calculado dos inteiros (pelo valor de 2 casas sairia "4,7%"). Há vetores de teste para R$, acima da alçada, transformação com preço alterado, vencido e cliente incompleto.
- §4 Sugestões offline:
  - `catalogo.sugestoes_pedido@1` (complementar e superior, pela entidade nova `produto_relacao`);
  - `embalagens[]` opcional em `catalogo.precos_cliente@1`;
  - embalagem maior e clientes parecidos calculados pelo Vendedor.
- §5 Migração 0020:
  - ajuste em R$ e `ajuste_em` em `pedido` e `pedido_item`;
  - tabela `catalogo.produto_relacao`;
  - índice dos orçamentos abertos;
  - base demo da referência.
- §6 Mapa das 5 telas → componentes do ui e do módulo, com a regra de escrita enxuta.
- §7 Plano de 11 fatias com ordem e paralelismo (03/11 16h → 05/11 18h) e a ordem de corte.

## Falhas no código existente (vão por recado ao modulo-vendedor às 16h)
- 🔴 O repositório SQL da pré-venda não existe: produção recusa orçamento com PRE_VENDA_INDISPONIVEL.
- 🔴 O pull não manda as colunas de orçamento.
- 🔴 `pedidoDoOrcamento` perde a medida, os ajustes, o frete e o endereço.
- 🟡 Validade calculada pela chegada ao servidor.
- 🟡 RN-VEN-13 não cobre cadastro incompleto nem bloqueado.
- 🟡 Preço próprio da CX não chega ao servidor.
- 🟡 `precosDoCliente` pode pegar linha de CX como preço da UN.

## Pendências
- Às 16h: recados aos donos com o texto do desenho e registro em `.coord/contratos/` (fatia 0).
- Gerente: doc 03 (RN-VEN-02 arredondamento/R$, RN-VEN-03 exibição, nota no RN-VEN-30, chave `orcamento.validade_dias`), §8.
- Premissas no §9 (R$ por unidade da medida vendida; Editar com sinal e sem renovar a validade; clientes parecidos = mesmo segmento na carteira, 90 dias; ⇄ zera o ajuste do item).

## Pronto quando
Gerente aprovar o desenho ou apontar ajustes antes das 16h.
