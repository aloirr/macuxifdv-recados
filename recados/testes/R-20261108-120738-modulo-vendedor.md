---
id: R-20261108-120738-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0127
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T12:07:38-04:00
---
# T-0127 Frente D entregue: Falta para salvar no Resumo, sem Corrigir frete, crédito carregado ao abrir

Contexto: T-0127 (Frente D), RN-CORE-36 e RN-VEN-16 (nova redação). Padrão do designer-ux (BlocoPendencias, abasComPendencia) já estava em packages/ui e foi usado.
O que foi feito:
1) domain/pendencias-preenchimento.ts (+ teste, 9 casos citando RN-CORE-36/RN-VEN-16/RN-VEN-24): pendenciasDePreenchimento() e linhaDaPendenciaDoPedido() -> "Transportadora do frete FOB — aba Detalhes", "Prazo de pagamento — aba Itens"; cobre forma, prazo, pagamento recusado, frete FOB sem transportadora/CNPJ, sem item, quantidade inválida e erros do cálculo (item -> Itens; ajuste/alçada do pedido -> Resumo).
2) Tela do Novo pedido (new-order-screen.tsx): removidos PendenciasDoPedido e o botão "Corrigir frete"; Itens e Detalhes sem alerta; bolinha só na aba com pendência (abasComPendencia); Resumo com o bloco "Falta para salvar" acima do [Salvar], e [Salvar] desabilitado enquanto houver pendência (bloqueado = pendencias.length > 0). Tocar na linha abre a aba. Apoio: situacaoDoPagamento (pagamento-pedido.ts), situacaoDoFrete (novo-pedido.ts), abasDoPedido com 3º parâmetro (detalhes).
3) Correção da F: o crédito do cliente (core.financeiro_cliente@1, offline) agora é carregado ao abrir o pedido, não só em Detalhes; o Resumo mostra "Vai para o supervisor." por título vencido sem passar por Detalhes. Teste em telas-t0101.test.ts.
Não mexi em api/pedidos.ts:354 (D-1) nem na saída do pedido (T-0128).
Testes: pnpm --filter @macuxi/vendedor lint, typecheck e test verdes (967 passaram, 100 de banco pulados sem Docker); coord verificar modulo-vendedor sem violações.
Roteiro de reteste (APK de teste, Mercadinho São Jorge C5002, vendedor): 1) Novo pedido, adicione 1 item, deixe forma/prazo sem escolher e troque o frete para FOB sem transportadora: Itens e Detalhes sem alerta/botão, bolinha só nas abas com pendência. 2) Abra Resumo: bloco "Falta para salvar" com "Prazo de pagamento — aba Itens" e "Transportadora do frete FOB — aba Detalhes", [Salvar] desabilitado. 3) Toque na linha, corrija; o bloco some e [Salvar] habilita. Extra: cliente com título vencido + prazo a prazo: do Itens direto ao Resumo mostra "Vai para o supervisor.". Print antes/depois sai do APK da rodada.
Pendências: revisão de texto do designer-ux; regressão do testes; o recado R-20261108-120527-designer-ux (motivo da forma na ListaSuspensa) fica para depois, conforme pedido dele. Texto das pendências do cálculo (frases dos erros de item) saem como a mensagem original sem ponto final; ajuste fino de texto com o designer.
