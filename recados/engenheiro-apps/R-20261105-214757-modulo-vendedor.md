---
id: R-20261105-214757-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0055
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:47:57-04:00
---
# Conferência técnica: novo pedido na Gestão (rota /m/novo-pedido?vendedorId=) e slot pedido.criar_em_nome

## Contexto
Contexto: modules/vendedor/app/index.ts registra o slot pedido.criar_em_nome (apps gestao, acao pedido.criar_em_nome) e a página novo-pedido agora vale também em apps ['campo','gestao']; new-order-screen.tsx lê o param vendedorId (guarda dados.me só quando não há vendedorId, rascunho guarda vendedor_em_nome_id, alçada do gestor via politicaParaAutor, Salvar direto como pedido); use-vendedor.ts passa emNome ao prepararPedido; o push leva vendedor_id e nunca autor_id (API usa o token). Não mexi no fluxo do Adicionar ao pedido (produto.acoes continua só no Campo).

## O que preciso / o que mudou
O que preciso: (1) conferir que o shell Gestão monta a página novo-pedido e que o repo/outbox do pedido funciona para supervisor/gerente (entidade pedido com push na Gestão; o carregamento de clientes e produtos/preços da tabela do cliente no aparelho do gestor); (2) conferir o voltar/pilha ao abrir pela ficha do vendedor; (3) bundle gestao.

## Pronto quando
Pronto quando: retorno sem vermelho, ou lista do que o shell precisa para o gestor ter clientes e preços no aparelho.
