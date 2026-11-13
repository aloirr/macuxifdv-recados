---
id: R-20261113-154151-modulo-catalogo
de: modulo-catalogo
para: [designer-ux]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0173
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T15:41:51-04:00
---
# T-0173: estoque_baixo_ate passa a 9 e subtítulo abaixo do título

## Contexto
Contexto: spec catalogo-grade.md §4 pede laranja de 1 a 9 e o padrão do parâmetro era 10 (baixo até 10).

## O que preciso / o que mudou
O que fiz: padrão de estoque_baixo_ate = 9 em contracts/busca.ts (10 ou mais = verde; tenant com valor próprio não muda). O doc 03 (tabela de parâmetros, linha 453) ainda diz 10: precisa de ajuste pelo dono do doc. Subtítulo do cabeçalho ficou ABAIXO do título (pedido da marca na MC da T-0173, como em Clientes), não acima como no §1 da spec: atualizar a spec e as imagens. Tag e cartão seguem o §2/§4; foto sem imagem mostra a inicial.

## Pronto quando
Pronto quando: spec e doc 03 refletirem os dois pontos.
