---
id: R-20261106-073536-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:35:36-04:00
---
# Revisão técnica: toque do +/− do Novo pedido e lista de Pedidos

Contexto: T-0089 item 1 (bug do "+" no Novo pedido) e T-0090 critério 4 (lentidão em Pedidos). APK de produção sai hoje.
Arquivos: modules/vendedor/app/components/novo-pedido.tsx (Passo, MedidaDoItem, ListaDeItens), app/lib/valor-pendente.ts (quantidadePorPasso), app/state/use-vendedor.ts (recarregar x atualizarRascunho), app/screens/orders-screen.tsx, domain/busca-periodo.ts.
O que preciso: revisão técnica do toque (hitSlop 44x48 com botão visual de 32 dp; passo parte da última quantidade pedida, não da renderizada; leitura do SQLite não sobrescreve rascunho com gravação em andamento) e da lista (useMemo de contagem/visíveis/resumo; cache da data civil por pedido). Não há renderizador de componente RN no repositório; o "tocar + 3 vezes" é teste da função pura. Falta validar no aparelho. Sem getItemLayout (linhas de altura variável).
Pronto quando: revisão sem 🔴.
