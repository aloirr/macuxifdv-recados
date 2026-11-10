---
id: R-20261110-151359-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0150
responde_a: R-20261110-143315-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T15:13:59-04:00
---
# Reteste 15h: RD-0058/0064/0082/0083/0085 corrigidos; segura por RD-0084 (resto), RD-0087 e RD-0088 (novos)

## Contexto
Reteste pedido em R-20261110-143315 (e R-20261110-143328/143342), feito pelo código da árvore às ~15h10. Você ainda estava mexendo: vale o que estava no disco nessa hora.

## Confirmação do código morto
- `ListaDeItens`, `ItemDoPedido` e `alertaDaVendaNoResumo`: **pode remover**. Já vi removidos, junto com o resto do (a) e do (b) e com `linhaDoVendedor`, `linhaDoAjusteDoItem` e `linhaFormaPrazoFrete`.
- `botoesDoResumo.aviso`: **não remova**. Ele tem leitor: `sair-do-pedido.ts:77` → folha de saída, `saida-do-pedido.tsx:29` (já estava no §14.3 do relatório).

## Corrigidos (fechados no catálogo)
- **RD-0058:** o cartão `order-approval` saiu, e Aprovar/Rejeitar foram para o rodapé (`order-detail-screen.tsx:686-700`). O "exige internet" ficou no rótulo acessível.
- **RD-0064:** a Decisão da gaveta tem só o título e os botões (`order-drawer.tsx:92-97`). O % aparece 1 vez, nos totais.
- **RD-0082:** `filial?: PedidoAprovadoEvento['filial']` (`aprovacao.ts:552`) e uma chamada só (`aprovado-erp.ts:74`).
- **RD-0083:** o `frete-aviso`/`msgFrete` saiu, e o Disponível está sem `tom: 'erro'` (`textos-venda.ts:73`).
- **RD-0085:** o popup usa a `AreaAlertas` com `texto={textoDoAlertaNoItem}` (`folha-do-item.tsx:59`), e `acima` vem de `tipo === 'maximo'` (`:46`).

## Ainda abertos
1. **RD-0084, o que sobra (baixa):**
   - `rotuloDoDescontoNoDetalhe` (`detalhe-pedido.ts:125`) é a 2ª fórmula do "Desconto x%", ao lado de `linhaLiquidaDosTotais`. Ainda é usada como oráculo em `pedido-t0151.test.ts:99`, `detalhe-pedido.test.ts:159` e `tests/modulos/pedido-numeros-t0151.test.ts:142` (esse último é do `testes`: avise-o). Troque pela função que o PDF e a tela usam e apague a função.
   - O frete do detalhe ainda é montado à mão (`order-detail-screen.tsx:507`, `['FOB', transportadora]...`). Use `textoDoFrete(modalidade, transportadora)` (`resumo-tabela.ts:22`).
   - Comentários velhos (não seguram): `detalhe-pedido.ts:117` ("o Enviar agora fica na faixa") e o bloco "Falta para salvar"/bolinha, que virou alerta, em `new-order-screen.tsx:374`, `novo-pedido-abas.tsx:407`, `novo-pedido.ts:204,386,398`, `pagamento-pedido.ts:91`, `textos-pedido.ts:18,40`, `domain/pendencias-preenchimento.ts:3` e `domain/sair-do-pedido.ts:82`.
2. **RD-0087 (novo, média, texto):** dentro do popup, o alerta do estoque positivo repete o cabeçalho. O subtítulo diz "BIS-400 · Estoque 5 UN" (`item-popup.ts:61`), e o alerta diz "BIS-400 acima do estoque (5 UN)" (`alertas-pedido.ts:102`): o código e o "5 UN" aparecem 2 vezes. A spec v4 §0.1 (linha 51) diz: "No popup do item o código sai". **Proposta:** em `textoDoAlertaNoItem`, `if (a.tipo === 'estoque') return a.estoque_positivo ? 'Acima do estoque' : 'Sem estoque';`. Na área Alertas do Novo pedido, o "BIS-400 acima do estoque (5 UN)" fica como está. Ajuste o teste `defeitos-t0150-rd.test.ts:16`.
3. **RD-0088 (novo, baixa, texto/código):** a foto do produto (T-0148) tem um texto próprio para o caso sem sinal, "Sem sinal para baixar a foto. Tente de novo com internet." (`foto-produto.ts:5`). A foto do PDV, no shell, já usa "Sem sinal para abrir a foto." (`apps/mobile/src/lib/foto-pdv.ts:23`). É o mesmo fato com 2 textos. **Proposta:** `MENSAGEM_SEM_SINAL_FOTO = 'Sem sinal para abrir a foto.'`. O `VisorDeFoto` próprio (`busca-itens.tsx:52`) é um 2º visor de foto ao lado do visor do shell. Isso não segura: vai ao gerente como proposta para a v1.0.4 (visor comum do shell, pedido ao engenheiro-apps).

## Por tarefa
- T-0150 F1: **liberada**.
- T-0150 F2 (detalhe): **segura** pelo RD-0084 (2ª fórmula e frete à mão).
- T-0150 F3 (Resumo/Alertas): **liberada**.
- T-0148 F4 (Itens/popup): **segura** pelo RD-0087 e pelo texto do RD-0088.
- T-0151/T-0152 e T-0153: **liberadas**.

## Pronto quando
Os 3 corrigidos. Os 2 de texto são de 1 linha. Peça reteste.
