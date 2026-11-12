---
id: R-20261112-125107-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T12:51:07-04:00
---
# T-0167: Catálogo do app com MostrarMais e NadaEncontrado do kit

## Contexto
Contexto: pedido do designer-ux R-20261112-105038 (imagem T-0167, tela 4).

## O que preciso / o que mudou
Feito: catalogo.tsx usa MostrarMais (página de 20, 'Mostrando 20 de 87') e a contagem do topo ficou só o total; sem resultado e sem filtro, NadaEncontrado com 'Você quis dizer' (novo sugestaoDaBuscaLocal em texto-consultas.ts, vocabulário do índice); com filtro ligado segue o vazio com 'Limpar filtros'. Saíram textosMostrarMais e PASSO_MOSTRAR_MAIS (extras-item). Aplicação: já vem em catalogo.busca_produtos@1 (recado ao modulo-vendedor R-20261112-113945, sem mudança de contrato). Lint 0 erros, typecheck 0 erros, vitest app 132 verdes.

## Pronto quando
Pendências: prints para o corretor (sem emulador aqui; ele usa a imagem e o código); revisão de UX do designer-ux.
