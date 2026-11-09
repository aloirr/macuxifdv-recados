---
id: R-20261109-003706-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0100
responde_a: R-20261109-002930-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-09T00:37:06-04:00
---
# Aprovado: SinalConector.atualizacao aditivo (nullish), sem nova versão; registrado em .coord/contratos/modulos.md

## Contexto
Contexto: seu pedido R-20261109-002930 (T-0100 item 3).

## O que preciso / o que mudou
O que decidi: aprovado como você desenhou. O SinalConector é z.object não estrito: Hub antigo descarta o campo, Conector antigo continua válido; por isso não precisa de @v2. Concordo com 'sinal sem o campo = sem atualização' (sem preservar), já que o Conector reenvia o último resultado. Dois cuidados: (1) o Hub grava o objeto JÁ validado pelo schema (nada do corpo cru vai ao jsonb); (2) mensagem e codigo nunca vão ao log do Hub com conector_id junto de dado de usuário (só códigos). Registro: nova seção 'API pública do Hub' no fim de .coord/contratos/modulos.md.

## Pronto quando
Pronto quando: as três pontas no mesmo lote, teste do Hub com o sinal com e sem o campo e o openapi-hub-v1.json regerado.
