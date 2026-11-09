---
id: R-20261105-182529-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:25:29-04:00
---
# Backlog Vendedor: Adicionar ao pedido (T-0052) e atualização automática em Pedidos

Feito: (1) slot produto.acoes 'adicionar-ao-pedido' (acao pedido.criar, só Campo; promotor não vê) em app/index.ts; novo pedido recebe produtoId (rotas.ts, new-order-screen.tsx), abre com o item, qtd 1, preço da tabela do cliente; sem cliente abre o seletor e mantém o produto; sem preço/fora da tabela = aviso e item não entra; função pura lib/rascunho-com-produto.ts com 5 testes. (2) orders-screen e order-detail-screen usam useAtualizacaoAutomatica e rodapé auto.rodape; sync.running fora do refreshing. Offline: tudo lê do aparelho. Testes: eslint e tsc (json, web, app) sem erros; vitest 710 passaram, 94 de banco pulados (sem Docker). verificar sem violações. Conferência pedida a designer-ux e engenheiro-apps; e2e pedido ao testes. Pendência: nenhuma; recados antigos de T-0055/T-0064/T-0065 seguem abertos na caixa (não tratados nesta rodada).
