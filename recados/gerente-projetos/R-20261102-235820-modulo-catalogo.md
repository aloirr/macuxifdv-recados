---
id: R-20261102-235820-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:58:20-04:00
---
# Catálogo: Trilha/LinhaChips comuns (🟡 4) e chip Campanha escondido

## Contexto
Contexto: trilha e chips já usavam Trilha/LinhaChips de @macuxi/ui/mobile (PR #58/árvore); arvore.tsx só tem NiveisArvore.

## O que preciso / o que mudou
O que fiz: em modules/catalogo/app/telas/catalogo.tsx escondi o chip Campanha (cortado, R-20261102-204330); soCampanha virou constante false (volta fácil pelo backlog). Trilha clicável, chips marca/estoque, filtro ?pedido=1 e offline intactos.

## Pronto quando
Testes: lint e typecheck de @macuxi/catalogo OK; vitest sem banco 29 arquivos/430 testes OK; tests/modulos/demo-abas.test.ts 7 OK; verificar sem violações. Sem pnpm install, sem banco.
