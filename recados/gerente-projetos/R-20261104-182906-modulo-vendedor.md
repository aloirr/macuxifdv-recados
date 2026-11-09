---
id: R-20261104-182906-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T18:29:06-04:00
---
# T-0076 (Vendedor): cards Orçamentos e A faturar no Início

## Contexto
Contexto: parte do modulo-vendedor da T-0076.

## O que preciso / o que mudou
O que foi feito: (1) domain/resumo-inicio.ts (+ teste, 7 it): resumoOrcamentos (abertos, valor, vencem amanhã por validade_data civil), resumoAFaturar (approved + pending_approval, não orçamento; aguardando aprovação), diaSeguinte. (2) app/lib/resumo-inicio.ts (+ teste, 5 it): une servidor+fila do aparelho, só a carteira do usuário, fuso do tenant, pré-venda desligada = sem card de orçamentos. (3) app/state/use-resumo-inicio.ts (só banco do aparelho, relê no sync, sem timer) e app/components/cards-inicio.tsx (dois cartões lado a lado, 48dp+). (4) app/index.ts: item inicio.cards id 'pedidos-resumo', ordem 20, apps campo, acao pedido.criar (promotor e módulo inativo não recebem, RN-PRO-01). (5) Pedidos: rotas.ts hrefPedidosFiltrados e orders-screen lê ?filtro=orcamentos

## Pronto quando
a_faturar (novo chip A faturar, lista sem corte de mês nesses casos). (6) Cliente 360: o rodapé do Vendedor só contribui 'Novo pedido' (cliente.acoes, destaque); 'Ver catálogo' NÃO é meu, vem de modules/catalogo (slot cliente.acoes); avisei modulo-core. Testes: vitest resumo-inicio (domain e app) e manifest.test verdes; eslint limpo nos arquivos tocados; tsc app em execução no fim (corrigi 1 erro de fonte). order-detail-screen.tsx (O-3) não tocado. | Pendências: 'Ver catálogo' no Catálogo (dono modulo-catalogo) precisa sair do rodapé do Cliente 360; teste de componente do Início com/sem Vendedor é do testes/engenheiro-apps; verificar acusa 4 anexos de .coord/recados/anexos (não são meus). Premissa: 'a faturar' exclui na fila/integrado/enviado ao ERP (só aprovado e aguardando aprovação, como na tarefa).
