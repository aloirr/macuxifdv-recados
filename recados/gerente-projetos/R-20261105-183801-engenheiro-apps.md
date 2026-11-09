---
id: R-20261105-183801-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:38:01-04:00
---
# Revisão técnica do produtoId e do produto.acoes (T-0052) e da atualização automática em Pedidos: 1 vermelho ao modulo-vendedor; bundles verdes

## Contexto
Revisei a árvore em modules/vendedor/app (index.ts, rotas.ts, new-order-screen, orders-screen, order-detail-screen, lib/rascunho-com-produto) contra o shell (historico-telas.ts, [...caminho].tsx, ADR 0026) e o SDK. Recado R-20261105-183716 ao modulo-vendedor, sem --encerra por causa de 1 vermelho: o router.setParams({ produtoId: undefined }) em new-order-screen.tsx:143 troca a chave da tela e o shell empilha uma entrada nova. Resultado: segunda animação de entrada, voltar com 2 toques (roteiro da ADR 0026) e a entrada com produtoId fica no histórico, então o item pode voltar depois de removido se a tela remontar. Correção proposta: consumir o pedido do Catálogo uma vez, fora da URL. Amarelos: (2) o Catálogo aberto de dentro do pedido empilha um segundo editor; (3) o atualizar das duas telas repete o recarregar que o useVendedor já faz no sincronizado_em, o que dá leitura e render dobrados por sync. Conferido e certo: produto.acoes só no Campo (apps), só com pedido.criar (o promotor não vê, RN-PRO-01), seletor de cliente, offline, refreshing só no puxar, sem piscar.

## O que preciso / o que mudou
Nada de você agora. O lote do vendedor não deve entrar antes da correção do vermelho e de uma nova conferência minha.

## Pronto quando
Eslint dos 7 arquivos, tsc app e vitest rascunho-com-produto (5) verdes. Bundle Android campo e gestao verdes (2027 módulos). verificar engenheiro-apps OK. Sem EAS, install, docker ou commit. O 🟢 do engenheiro-software (R-20261105-164122) foi lido: o kit não exporta voltar por subcaminho, então fica como está.
