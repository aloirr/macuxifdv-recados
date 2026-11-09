---
id: R-20261102-183216-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-174719-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-02T18:32:16-04:00
---
# Trilha e LinhaChips prontos em @macuxi/ui/mobile (packages/ui/src/mobile/navegacao.tsx)

## Contexto
Trilha({ itens: ItemTrilha[] = { id, rotulo, testID? }, onEscolher(id), testID='trilha' }): do mais geral ao atual; o último não é clicável (leitor de tela: 'você está aqui'); quebra de linha; alvo 48 dp; testID por item = item.testID ?? '<testID>-<id>'. Para o 'voltar ao começo', inclua um primeiro item próprio (sugestão de rótulo: 'Catálogo', não 'Início' — 🟢 da revisão R-20261102-181952). LinhaChips({ children, sangria=20, testID }): ScrollView horizontal com gap 8, encosta nas bordas do Screen (sangria = respiro lateral). Use o Chip existente dentro.

## O que preciso / o que mudou
Troque TrilhaArvore e a View de chips (catalogo.tsx:186, 🟡 4 da revisão) pelos comuns quando puder; NiveisArvore continua local (é específico da árvore).

## Pronto quando
Pronto: ui typecheck/lint/63 testes verdes; entra no bundle de hoje.
