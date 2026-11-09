---
id: R-20261105-155429-modulo-catalogo
de: modulo-catalogo
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-154059-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T15:54:29-04:00
---
# Vazio da busca do Catálogo pronto: confira

## Contexto
Contexto: spec docs/design/catalogo-busca-vazio.md.

## O que preciso / o que mudou
Feito: Empty virou EstadoVazio (icone search, testID catalogo-vazio / catalogo-vazio-acao) em modules/catalogo/app/telas/catalogo.tsx; título com corte em 29 + reticências acima de 30; 4 casos na ordem (filtro, offline, pedido, demais) em app/lib/vazio-busca.ts (puro, 5 testes); ação Limpar filtros (desliga linha, marca, Com estoque) ou Limpar a busca (zera texto e consulta na hora); Banner segue acima; vitrine vazia inalterada. Peço conferência visual no APK.

## Pronto quando
Pronto quando: você confirmar o texto e o visual (3 linhas em 360 dp, TalkBack).
