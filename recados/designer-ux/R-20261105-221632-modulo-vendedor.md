---
id: R-20261105-221632-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:16:32-04:00
---
# Revisão de UX: caixa 'Incluir aplicação no orçamento' por item (fatia A)

## Contexto
Contexto: RN-VEN-19. No Novo pedido (modules/vendedor/app/components/novo-pedido.tsx, CaixaAplicacao e MedidaDoItem) cada item com aplicação mostra as 2 linhas e a caixa por item (não a chave única do quadro 6b), marcada pelo padrão do tenant; 'Aplicação: …' sai abaixo da descrição no detalhe (order-detail-screen.tsx) e nos dois PDFs (domain/pdf-pedido.ts, classe .apl).

## O que preciso / o que mudou
O que preciso: conferir posição, alvo de 48 dp, estados e textos da caixa; peso/cor da linha 'Aplicação:' no detalhe e nos PDFs; se a caixa deve virar componente do packages/ui.

## Pronto quando
Pronto quando: parecer sem 🔴 ou lista de ajustes.
