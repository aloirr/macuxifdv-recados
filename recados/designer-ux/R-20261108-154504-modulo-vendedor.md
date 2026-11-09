---
id: R-20261108-154504-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0136
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:45:04-04:00
---
# T-0136 Frente K entregue: Novo pedido em 4 abas (Venda · Itens (n) · Entrega · Resumo)

# Contexto
T-0136 (Frente K, tarefa-mãe T-0131, RF-VEN-11): o Novo pedido passa a ter 4 abas, Venda · Itens (n) · Entrega · Resumo, abrindo na Venda. Vale em Campo e Gestão (pedido em nome), Novo pedido, Editar orçamento e Editar pedido, tudo do aparelho (offline). Resumo mantido (L refaz). Sem L/G/M e sem "Equivale a:" no PDF.

# O que foi feito
- domain: `domain/alertas-venda.ts` (`alertasDaVenda`, `tomDoAlerta`: bloqueado, inativo, cadastro incompleto, título vencido com qtd/valor/dias, crédito excedido; erro antes de aviso). `pendencias-preenchimento.ts`: abas venda/itens/entrega/resumo; forma e prazo = "aba Venda", FOB sem transportadora e CNPJ = "aba Entrega".
- app/lib: `textos-venda.ts` (textos dos alertas pelo kit `alertaInadimplencia`/`TEXTO_CLIENTE_LIBERADO`, linha do Limite, Prazo médio, frase do frete "CIF: frete incluso no preço" / "FOB: transportadora X"); `textos-pedido.ts` (abasDoPedido com `Itens (0)` e bolinha por aba, ABA_INICIAL, próxima/anterior).
- app/components/novo-pedido-abas.tsx: `AbaVenda` (Alertas, forma, prazo, Limite total/disponível, Prazo médio, "Atualizado ..." com ícone sync/wifiOff), `AbaEntrega` (endereço + Trocar, frete só com a frase, observações), `FimDaAbaItens` (Leve mais e Combina no fim de Itens), `TotalDoPedido` no topo de Itens; `CardPagamento` sem o total. `AbaDetalhes` e `CreditoDoClienteCard` removidos. Prazo médio saiu do cabeçalho.
- app/screens/new-order-screen.tsx: 4 abas, abre em Venda, Avançar/voltar do Android (Resumo→Entrega→Itens→Venda; só da Venda sai, RN-VEN-38), sugestões carregadas na aba Itens, bolinha na aba da correção.
- docs/modulos/vendedor/novo-pedido-distribuidora.md atualizado. Manifest sem mudança (sem entidade, evento ou extensão nova).

# Testes
domain/alertas-venda.test.ts (novo), pendencias-preenchimento.test.ts, app/lib/textos-venda.test.ts (novo), textos-pedido.test.ts, textos-pedido-ux.test.ts, telas-t0101.test.ts (4 abas, forma/prazo em Venda, sem valor de frete), sair-do-pedido.test.ts. Vendedor: typecheck verde; vitest 1034 passaram, 100 de banco pulados (sem Docker; CI decide); eslint --fix nos arquivos tocados sem erro (o `pnpm lint` do pacote inteiro estoura os 120 s do ambiente local, rodei por arquivo). `coord verificar modulo-vendedor`: OK.

# Toques do pedido mais simples (cliente sem alerta, CIF, 1 item), contados
Antes (3 abas, abre em Itens, forma/prazo já com padrão): incluir o item, tocar a aba Resumo, Salvar, Enviar pedido na folha = 3 toques de navegação/salvar depois do item.
Agora só com a K: Venda (forma/prazo com padrão) → tocar Itens (ou Avançar) = +1, incluir o item, tocar Resumo, Salvar, Enviar na folha = 4. A K sozinha custa 1 toque a mais, porque a tela abre na Venda e Itens passa a ser o 2º passo. Compensação: a L tira a folha intermediária "Salvar pedido" (Salvar e enviar pedido direto), o que devolve o toque: fica 3 no build (como na spec §1.1). Atenção do gerente: o critério 2 da T-0136 só fecha com a L; se quiser fechar antes, a única saída é abrir em Itens, o que contraria o texto do dono do produto.

# Pendências / para o reteste
- Prints do APK de cada aba (critério 3) dependem do build; sem APK local.
- Crédito excedido usa a mesma regra da API (total do pedido > disponível, disponível mínimo 0); cliente sem dados de crédito: nenhum alerta de crédito e a frase "Sem dados de crédito deste cliente".
- Roteiro de reteste: (1) abrir Novo pedido: cai na Venda; (2) cliente com título vencido, bloqueado e liberado: alertas/linha única; (3) trocar forma/prazo na Venda; Limite, Prazo médio e "Atualizado ..." (também sem sinal); (4) Itens (0) → (1) ao incluir; Leve mais e Combina no fim; (5) Entrega: Trocar endereço, CIF/FOB só com a frase, FOB sem transportadora deixa bolinha em Entrega e o Resumo cita "aba Entrega"; (6) sem forma/prazo: bolinha em Venda e "aba Venda"; (7) item sem preço ou sem item: bolinha em Itens; (8) Voltar do Android percorre as abas; (9) repetir em Editar orçamento, Editar pedido e pedido em nome (Gestão).
