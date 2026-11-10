---
id: R-20261110-141225-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0150
responde_a: R-20261110-124212-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T14:12:25-04:00
---
# Reteste 13h40: T-0153 lista liberada; F1-F4 e T-0151 seguram por RD-0058/0064/0082/0083/0084/0085 (correções de 1-5 linhas)

## Contexto
Reteste pelo código, árvore das 13h40 (o seu detalhe é das 13h11 e a lista das 13h16), contra as imagens aprovadas e o pedido-v4. Respondo ao R-20261110-115831 (fatias 1 e 2) e ao R-20261110-124212 (fatias 3 e 4). Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §14.

## Liberado
- **T-0153 lista de Pedidos: liberada.** RD-0076 corrigido (SeloAtualizacao no cabeçalho, sem faixas nem rodapé, "· 1.000 mais recentes" no total). Limpeza opcional: o placeholder tem os 2 ramos iguais (orders-screen.tsx:285) e styles.rodape (:439) ficou sem uso.
- **RD-0079 corrigido:** a faixa da fila saiu do detalhe. O lugar do "Enviar agora" (:541-545) é o 🔴 2 do designer, não é redundância.

## Segura (o achado e a correção exata)
1. **RD-0058 (detalhe, T-0150 F2 e T-0151):** order-detail-screen.tsx:593-596. O cartão order-approval diz "Desconto 8,8%", o mesmo % da linha líquida dos Totais (:569). Correção: a linha `Desconto ${formatPct(...)}` sai; Aprovar e Rejeitar vão para o RodapeAcoes (= 🔴 3 do designer). O "Sem sinal: aprovar exige internet" vira o apoio dos botões ou sai, como o designer decidir.
2. **RD-0064 (BKO, T-0151):** order-drawer.tsx:95-97. A Decisão diz "Desconto X%" e os totais logo abaixo dizem "Desconto (x%)" (:125). Correção: o `<span data-testid="pedido.decisao.alcada">` sai; a Decisão fica com o título e os botões.
3. **RD-0082 (F1, baixa, sem mudança):** domain/aprovacao.ts:551 `filial?: PedidoAprovadoPayload['filial']` (o tipo do contracts, sem a forma à mão). Em api/aprovado-erp.ts:110: `const filial = filialParaEvento(p.filial);` e `...(filial ? { filial } : {})`.
4. **RD-0083 (F3, média):** há 2 avisos fora dos Alertas.
   - Aba Entrega: a linha vermelha frete-aviso, "Informe a transportadora do frete FOB." (novo-pedido-abas.tsx:244-248, msgFrete em :210), repete o alerta "Falta transportadora do frete FOB · aba Entrega". O bloco sai, e o freteValido sai junto se ficar sem leitor.
   - Aba Venda: o Disponível negativo sai em vermelho (textos-venda.ts:74, `tom: 'erro'`). Isso repete "Limite de crédito excedido", e a spec v4 §1 manda "sem vermelho". O tom sai; fica o "−R$".
5. **RD-0084 (F2, F3 e F4, baixa): sim, é redundância, pode remover** (com os testes):
   - (a) novo-pedido-itens.tsx: ListaDeItens, ItemDoPedido, MedidaDoItem, TEXTO_VALOR_TOTAL e o reexport da :247. Ficam AjusteDoItem e ServeEm.
   - (b) textos-venda.ts: textoDoAlerta, TEXTO_SEM_ALERTA, ROTULO_ALERTAS, alertaDaVendaNoResumo, ROTULOS_DO_RESUMO, linhaDaEntregaNoResumo e linhaDaVendaNoResumo.
   - (c) detalhe-pedido.ts: linhaDoVendedor, linhaDoAjusteDoItem e linhaFormaPrazoFrete. Sai também rotuloDoDescontoNoDetalhe, que é a 2ª fórmula do "Desconto x%" ao lado de linhaLiquidaDosTotais: o pedido-t0151.test.ts:99 passa a usar a função do PDF. O texto do frete montado à mão em order-detail-screen.tsx:505 passa a usar o textoDoFrete (resumo-tabela.ts:22).
   - (d) Comentários velhos: new-order-screen.tsx:374, novo-pedido-abas.tsx:413 e detalhe-pedido.ts:137.
   - **botoesDoResumo.aviso NÃO é morto:** a folha de saída lê (sair-do-pedido.ts:77 → saida-do-pedido.tsx:29). Fica.
6. **RD-0085 (F4, baixa):** o popup desenha os próprios Alertas (folha-do-item.tsx:57-66, sem ícone nem cartão), e o `acima` sai de startsWith('Acima') (:44). Correção: alertasDoItemNoPopup devolve AlertaDoPedido[]; o popup usa `<AreaAlertas alertas={a} texto={textoDoAlertaNoItem} testID="popup-item-alertas" />` (o parâmetro `texto` já existe e está sem uso) e `acima = a.some((x) => x.tipo === 'maximo')`.

## Situação por fatia
- **F1:** segura (RD-0082).
- **F2:** segura (RD-0058 e RD-0084 c).
- **F3:** segura (RD-0083 e RD-0084).
- **F4:** segura (RD-0085 e RD-0084 a).
- **T-0151:** segura (RD-0058 e RD-0064).
- **T-0153 lista:** liberada.

Tudo é remoção ou troca de 1 a 5 linhas. Me avise por recado e eu confiro na hora.

Ao testes (sem RD): "Estoque 5 UN" × "Sem estoque" no popup; "Falta cNPJ da transportadora" (alertas-novo-pedido.ts:22); nota "Aguardando envio" no pedido recusado na fila (:205).
