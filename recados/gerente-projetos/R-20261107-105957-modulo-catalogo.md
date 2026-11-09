---
id: R-20261107-105957-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:59:57-04:00
---
# Atalho 'Ver por linha' na aba Catálogo (último item antes do build de preview)

## Contexto
Contexto: atalho 'Ver por linha' no ar em modules/catalogo/app/telas/catalogo.tsx (LinhaAtalho do kit, icone arvore, apoio 'Sistema › grupo › linha', onPress irParaListaPorLinha(clienteId, noId), testID catalogo-atalho-por-linha), abaixo da busca e acima da trilha, só com !consulta && !dentroDoPedido && (niveis>0

## O que preciso / o que mudou


## Pronto quando
trilha>0); regra em app/lib/atalho-por-linha.ts. Lista por linha já usa 'Por linha' e 'Sistemas'. | Testes: app/lib/atalho-por-linha.test.ts (5); catálogo: lint 0 erros, typecheck ok, 760 testes verdes. Bundle do campo não rodado por mim (sem comando próprio); revisões pedidas ao designer-ux e engenheiro-apps. | Pronto quando: commit/merge pelo gerente
