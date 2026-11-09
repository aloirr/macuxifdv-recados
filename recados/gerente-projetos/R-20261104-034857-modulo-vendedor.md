---
id: R-20261104-034857-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T03:48:57-04:00
---
# T-0071 fatia 6 (app Campo): ajuste em R$, tela do orçamento, item e sugestões

## Contexto
T-0071, fatia 6 (app Campo) fechada para o APK de 05/11. Itens 1 a 4 prontos; nada fora dos meus caminhos.

## O que foi feito
1. **Ajuste em R$ no app**: `calcularPedido` usa o preço v2 do domain (arredondamento no unitário, rateio pelo maior resto). Rascunho e push levam o ajuste em R$ por unidade (item: `desconto_unitario_cents`/`acrescimo_unitario_cents` + `ajuste_em: 'valor'`) e no pedido (`desconto_valor_cents`/`acrescimo_valor_cents` + `ajuste_em`), nunca % e R$ juntos. Seletor Desc.|Acrésc. e %|R$ no item e no Resumo (a troca de modo leva o equivalente). Referência 398,30 → 379,79 (39830/1467/384/37979, 4,6%) com teste no app; Resumo agora mostra Descontos = tabela − total e a faixa usa o % de 1 casa dos inteiros. Contrato: `ItemPush.ajuste_em` opcional (aditivo, o servidor continua derivando o modo do campo preenchido).
2. **Tela do orçamento**: selo de validade civil no fuso do tenant, Transformar em pedido (cria pedido novo com `orcamento_origem_id`, copia medida/ajustes/frete/endereço/condição/observação; reconferência local de preço, estoque, alçada e cliente com folha "Mudou desde o orçamento" só quando algo mudou), Editar (na fila offline; recebido via `PUT /v1/vendedor/orcamentos/:id` com sinal e `atualizado_em`), Duplicar com os mesmos ajustes, PDF com título Orçamento e validade, cancelar orçamento pela rota própria. O pull passou a mapear `validade_data`, ajuste do pedido em R$ e R$ por unidade do item.
3. **Item**: chip da medida, "R$ 17,90 → 17,01", equivalente ("−R$ 0,89"/"= 5,3%") e trilha do catálogo (abre /m/catalogo?cliente=..&pedido=1).
4. **Sugestões** "Combina com o pedido" e "Leve mais" pela consulta `catalogo.sugestoes_pedido@1` (no aparelho), com clientes parecidos e embalagem maior; "+" soma 1 UN e "⇄" troca pela embalagem maior.
- Componentes de packages/ui usados sem alterar: Botao, Cartao, ChipEstado, Selo, Segmentado, Folha. testID novos avisados ao testes (R-20261104-025708-modulo-vendedor).

## Arquivos
modules/vendedor/app/lib/{novo-pedido,pedidos,pull,pre-venda,acoes-pedido,textos-pedido,documento,sugestoes-pedido}.ts (+ testes, inclusive documento.test.ts novo), app/state/use-vendedor.ts, app/components/{novo-pedido,novo-pedido-abas}.tsx, app/screens/{new-order,order-detail}-screen.tsx, app/rotas.ts, contracts/frete.ts; docs/modulos/vendedor/{novo-pedido-distribuidora,pre-venda-e-erp}.md.

## Testes
Suíte inteira do @macuxi/vendedor: 52 arquivos, 668 testes verdes (MACUXI_PG_PORTA=5434); tsc dos 3 projetos e eslint verdes; `coord verificar modulo-vendedor` sem violações.

## Pendências e premissas
- Orçamento já recebido só edita com sinal (contrato exige `atualizado_em`); orçamento na fila edita offline.
- Trilha do catálogo usa linha › marca do produto (o Vendedor não lê a árvore do Catálogo); a navegação completa é a do Catálogo. O mínimo (RN-VEN-11) não é conferido no aparelho (a API revalida).
- Frete FOB de cópia sem CNPJ de 14 dígitos e fora da lista volta sem transportadora (o vendedor escolhe).
- Fora desta entrega: aba Orçamentos no Gestão (modulo-gestor), revisão de telas (engenheiro-apps) e e2e (testes).
