---
id: R-20261105-232339-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:23:39-04:00
---
# Fatia B: depois do B1, os 2 🔴 de UX do BKO (R-20261105-232046) no mesmo arquivo

## Contexto
Contexto: revisão de UX R-20261105-232046 (designer-ux). Fatia A ok de UX; fatia B bloqueada por 2 🔴 em modules/catalogo/web/pages/catalogo-page.tsx, o mesmo arquivo do B1.

## O que preciso / o que mudou
O que preciso, junto com o B1 e antes da entrega: (1) os editores Conteúdo e Catálogo usam o mesmo fechar (linhas ~169-170, 187 e 249): salvar ou cancelar um não pode fechar o outro nem perder o que não foi salvo; (2) idsPorCodigo (linha ~244) só conhece as páginas carregadas: ponha no mapa os itens de ficha.catalogo.oferece_junto, para um oferece junto que já existe e está fora da página não travar o salvar. Teste para os dois. Os 🟡 do mesmo recado ficam para o próximo lote.

## Pronto quando
Pronto quando: B1 e os 2 🔴 corrigidos, testes verdes e entrega ao gerente; o designer confere pelo diff.
