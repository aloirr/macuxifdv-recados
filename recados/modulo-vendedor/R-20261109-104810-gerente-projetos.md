---
id: R-20261109-104810-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:48:10-04:00
---
# T-0141 C: origem no EnderecoEntregaEvento do Vendedor

## Contexto
Contexto: o Hub já aceita EnderecoEntregaErp.origem ('erp'

## O que preciso / o que mudou
'editado'), de forma aditiva (R-20261109-104206-modulo-integracao), e a 0055 do banco-dados tem os CHECKs do retrato.

## Pronto quando
O que preciso: quando implementar o item C (depois da aprovação da imagem), o EnderecoEntregaEvento do Vendedor leva origem, para o campo chegar ponta a ponta ao Conector; siga o desenho docs/desenho/T-0141.md. | Pronto quando: teste ponta a ponta no seu pacote mostra origem 'editado' no evento aprovado@1.
