---
id: R-20261108-215634-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:56:34-04:00
---
# Vendedor v1.0.1: pedido em nome (vendedor_nome), Frentes L e G, RD-0010/0011/0028 e rótulo Pedidos a faturar

Contexto: v1.0.1 do Vendedor (main 77e60d0e), T-0111/T-0114/T-0124/T-0130; respostas a R-20261108-210156-modulo-gestor, aos 🟡 do designer-ux (R-20261108-203550) e aos RD do corretor (R-20261108-173728, R-20261108-161030). | O que foi feito:
1) Contrato aditivo `vendedor_nome?` em ContextoPedidoEmNomeSlot; abrir() passa `vendedorNome` (aviso ao engenheiro-software enviado).
2) Frente L: sem itens, o Resumo ficou com uma frase só (a pendência "Pelo menos 1 item"; saiu o texto "Adicione um item na aba Itens."). Cancelar na edição abre a folha "Sair do pedido?" com Salvar alterações (destino embaixo), Descartar alterações (confirmação "Descartar as alterações?") e Continuar editando (domain `opcoesDaSaidaEdicao`; DialogoDescartar removido). Edição agora mostra "Vai direto ao ERP"/"Vai para o supervisor" sob o botão (`botoesDoResumo`). Frente G: linha "Salvo" mostra o total do rascunho pelo calcularPedido; sem tabela, "—"; sem itens, "Sem itens" (`totalDaLinhaSalva`).
3) RD-0028: `normalizarStatus` virou a fonte única em domain/order.ts; ENVIADO_OU_POSTERIOR e FATURADO só em OrderStatus (invoiced_total entra como alias de invoiced). RD-0010/0011: cartão único com duas linhas tocáveis (56 dp): "Orçamentos  nenhum ›" e "Pedidos a faturar  6 · R$ 3.989 (1 aguardando aprovação) ›"; plural redundante removido (linhaAFaturar saiu). Sem print de APK (sem build local): peço o print ao engenheiro-apps/gerente.
4) Rótulo "Pedidos a faturar" (premissa do gerente, T-0124) numa constante só: ROTULO_A_FATURAR em domain/resumo-inicio.ts (cartão e chip da lista); reverter = trocar a linha por 'A faturar'.
Arquivos: modules/vendedor/{contracts/extensoes.ts, domain/{order,botoes-resumo,sair-do-pedido,resumo-inicio}.ts, app/{index.ts,components/{cards-inicio,saida-do-pedido,novo-pedido-abas}.tsx, screens/{new-order,orders}-screen.tsx, lib/{salvar-na-fila,resumo-inicio,textos-pedido}.ts, state/use-vendedor.ts} e os testes. | Pronto quando: typecheck do pacote verde (3 tsconfigs); vitest do pacote 1127 verdes + o único vermelho (slot-em-nome) corrigido e reexecutado verde; tests/modulos/linha-salvo-pedidos-t0130 e inicio-t0076 verdes; verificar OK. Pendência: eslint acusa 3 erros react-hooks/rules-of-hooks em new-order-screen.tsx (~l.559-561, hooks do rodadaDeConfirmar depois do return antecipado da edição), já presentes no HEAD, fora do meu escopo desta rodada; vou tratar numa próxima. Atenção apps/mobile/src/components/inicio-tela.test.tsx (dono engenheiro-apps) usa o texto fictício "A faturar" num mock, não depende do rótulo real. docs/design/inicio.md §1.4 (designer-ux) precisa refletir o cartão único e o rótulo. Reteste do corretor: RD-0010, RD-0011 e RD-0028.
