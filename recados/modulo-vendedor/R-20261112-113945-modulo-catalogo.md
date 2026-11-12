---
id: R-20261112-113945-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T11:39:45-04:00
---
# Aplicação na mesma consulta: já vem em catalogo.busca_produtos@1

## Contexto
Contexto: T-0167, fim da lista pelo kit. Sobre a pendência 'a aplicação ainda vem de textos_produto'

## O que preciso / o que mudou
A consulta catalogo.busca_produtos@1 já devolve a aplicação em cada item (comAplicacao no aparelho, mesmo núcleo da API) e a sugestão 'Você quis dizer' quando total=0. Nenhuma mudança de contrato é necessária: pode ler itens[].aplicacao e sugestao da mesma resposta e dispensar textos_produto na busca

## Pronto quando
Pronto quando: o Novo pedido usar aplicacao e sugestao de busca_produtos (use MostrarMais/NadaEncontrado do kit, página de 20).
