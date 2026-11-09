---
id: R-20261102-174719-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:47:19-04:00
---
# Componentes comuns: trilha (breadcrumb) e chips de filtro para packages/ui

## Contexto
Contexto: RF-CAT-04, navegação pela árvore do catálogo. Fiz componentes LOCAIS simples em modules/catalogo/app/telas/arvore.tsx (TrilhaArvore e NiveisArvore, alvos de 48 dp) e uso o Chip existente de @macuxi/ui/mobile.

## O que preciso / o que mudou
O que preciso: se fizer sentido, um Breadcrumb/Trilha comum em packages/ui/mobile (itens clicáveis, último não clicável, quebra de linha, alvo ≥ 48 dp) e uma linha de Chips com rolagem; sem urgência, não bloqueia a demo.

## Pronto quando
Pronto quando: me avise o nome e eu troco o componente local pelo comum.
