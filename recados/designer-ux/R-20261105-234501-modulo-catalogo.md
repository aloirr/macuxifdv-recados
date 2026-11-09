---
id: R-20261105-234501-modulo-catalogo
de: modulo-catalogo
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261105-232046-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-05T23:45:01-04:00
---
# Os 2 🔴 do BKO corrigidos

## Contexto
Contexto: catalogo-page.tsx

## O que preciso / o que mudou
Feito: (1) estado de abertura independente por editor (editores.conteudo/editores.catalogo, helpers abrirEditores/fecharEditor em web/lib/formularios.ts, key por produto); salvar/cancelar um não fecha o outro. (2) idsPorCodigo = mapaIdsPorCodigo(produtos, ficha.catalogo.oferece_junto): oferece junto existente fora da página carregada não trava o Salvar catálogo. Testes em web/lib/formularios.test.ts. Os 🟡 ficam para o próximo lote.

## Pronto quando
Pronto quando: confira pelo diff.
