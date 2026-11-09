---
id: R-20261108-133646-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:36:46-04:00
---
# Entrega T-0114 (D-1) e T-0128 (RN-VEN-38): sair do pedido, rascunho e retomada

# Contexto
T-0114 (D-1) e T-0128 (Frente E, RN-VEN-38) entregues no que é do Vendedor. Lint, typecheck e testes de modules/vendedor verdes (999 passaram; o teste de desempenho lista-desempenho falhou uma vez só por carga da máquina e passa isolado em 0,6 s). Testes de banco ficam no CI.

# O que fiz
1. D-1: modules/vendedor/api/pedidos.ts (linha 354) consulta integracao.cancelamento_erp@1 com { licenca: 'tenant' }. Teste: api/cancelar-licenca.test.ts (4). Recado ao testes para voltar o E2-V para it (R-20261108-132609).
2. Motivo da forma indisponível (T-0129, R-20261108-120527): removido o texto solto forma-indisponivel-* de app/components/novo-pedido-abas.tsx; opcoesDeForma já passa desabilitada e motivo, e a ListaSuspensa mostra o motivo no menu (testID forma-<id>-motivo).
3. RN-VEN-38: domain/sair-do-pedido.ts (+ teste, 19): pedidoAlterado, opcoesDaSaida (RN-VEN-13 só orçamento e Descartar, com a linha do motivo), destinoDoSalvarDaSaida (pendência volta ao Resumo, bloco "Falta para salvar" com anúncio), rascunhoParaRetomar, textos. Tela: app/screens/new-order-screen.tsx abre a folha FolhaSairDoFormulario (app/components/saida-do-pedido.tsx) no Voltar do cabeçalho (VoltarDoFormulario), no botão Voltar do Android e no Cancelar do Resumo; Descartar tem confirmação; Continuar editando cancela a saída. Retomada: app/components/retomada-do-pedido.tsx no card do Vendedor do Início ("Pedido não terminado", Continuar pedido de <cliente> / Descartar / Agora não), uma vez por abertura do app. O rascunho já era gravado a cada alteração (atualizarRascunho -> guardarRascunho, SQLite). Testes do fonte da tela: app/screens/sair-do-pedido.test.ts (10).

# Pendências / premissas
- Falta o shell: barra inferior e gesto Voltar entre telas. Contrato pedido ao engenheiro-apps (R-20261108-125643, aceito no R-20261108-130452): useBloquearSaida(alterado, aoTentarSair(prosseguir)). A tela já o consome por app/lib/bloquear-saida.ts (adaptador sem efeito); trocar o corpo por re-export quando o shell entregar.
- Premissas: a folha vale só para Novo pedido (edição de pedido salvo mantém o diálogo Descartar de antes); a linha de apoio da retomada traz "n itens · alterado às hh:mm" sem o valor em R$ (calcular o total exigiria o catálogo no Início); ao salvar pedido pela folha sem pendência a saída pedida segue logo após o aceite (o fluxo "fecha em 1 s" é da T-0130); o BackLink do kit não tem onPress, então usei um VoltarDoFormulario local com a mesma aparência (sugestão ao designer: prop aoVoltar no BackLink).
- modules/vendedor/app/** aparece como travado pela nuvem (T-0101) no quadro; editei por ordem do gerente nesta tarefa. Conferir que não há conflito no merge.
- Não atendi ainda o 🟡 do R-20261108-130333 (Serve em: do seletor) nem o das notas de UX anteriores.

# Roteiro de reteste (5 passos, APK Campo demo, vendedor)
1. Novo pedido para o Mercadinho São Jorge, adicione 1 item e toque em Voltar do cabeçalho: aparece "Sair do pedido?" com Salvar pedido, Salvar orçamento (Válido até dd/mm), Descartar e Continuar editando; Continuar editando mantém o pedido.
2. Repita com o botão Voltar do Android (na aba Itens) e com Cancelar no Resumo: a mesma folha. Com um cliente bloqueado ou inativo só aparecem Salvar orçamento e Descartar, com a linha do motivo.
3. Com pendência (sem prazo, por exemplo) toque em Salvar pedido: a folha fecha e o Resumo mostra "Falta para salvar". Descartar pede confirmação ("Descartar este pedido?") e só então apaga.
4. Com itens no pedido, feche o app pelo sistema (limpar recentes) e reabra: o Início sobe "Pedido não terminado" com Continuar pedido de <cliente> e Descartar; "Agora não" guarda o rascunho.
5. (Depois do hook do shell) toque em Pedidos na barra inferior e use o gesto Voltar com o pedido alterado: a folha abre; sem alteração sai direto. No fluxo de cancelamento depois do envio (D-1) com conector que aceita: o vendedor não recebe mais 422.
