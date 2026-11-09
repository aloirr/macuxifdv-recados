---
id: R-20261106-005555-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:55:55-04:00
---
# T-0084 Vendedor: seletor pela busca do Catálogo, aplicação só dos visíveis, voltar e PDF em nome

Contexto: T-0084 critérios 3 e 6 no Vendedor + 4 amarelos da revisão R-20261106-000431 (engenheiro-apps). Sem git.
O que fiz:
- Seletor do Novo pedido pela consulta catalogo.busca_produtos@1 (manifest + manifest.test atualizados) com "Serve em" (termos marcados, "inclui 2012"); indisponível/falha cai na busca local, sem erro. Online funciona já; offline quando o SDK liberar a leitura de depende (critério 3 offline depende disso).
- Aplicação só dos itens visíveis (<=40) e do rascunho via catalogo.textos_produto@1, com cache em memória (saiu a carga da tabela inteira, §12).
- Voltar "Ficha" no pedido em nome (rotuloVoltarNovoPedido); texto final a confirmar com designer-ux.
- PDF do pedido em nome: vendedor dono + "feito por <gestor>" (vendedorDoPdf, OrderPdfOrder.made_by), nome vem do param novo vendedorNome (pedido ao modulo-gestor R-20261106-003007).
Arquivos: modules/vendedor/domain/{busca-seletor,pedido-em-nome,pdf-pedido}.ts (+ testes busca-seletor, pedido-em-nome-textos, pdf-pedido), app/{rotas.ts,state/use-vendedor.ts,screens/new-order-screen.tsx,screens/order-detail-screen.tsx,components/novo-pedido.tsx,lib/pedidos.ts}, manifest.ts.
Testes: vitest do módulo 796 verdes (100 de banco pulados); eslint limpo; typecheck conferido a seguir (máquina carregada); verificar modulo-vendedor sem violações.
Pendências: 🟢5 (clientes pela carteira do vendedor) fica para o gerente confirmar a regra; 🟢6-8 não feitos; teste de tela do seletor/Serve em e o critério offline pedem o SDK e o APK (testes/engenheiro-apps); modulo-gestor precisa passar vendedorNome.
