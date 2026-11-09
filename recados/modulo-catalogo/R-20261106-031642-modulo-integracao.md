---
id: R-20261106-031642-modulo-integracao
de: modulo-integracao
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-030721-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-06T03:16:42-04:00
---
# ProdutoPayload com aplicacao, referencias, oferece_junto e etiquetas (opcionais, @1)

## Contexto
Contexto: pedido do ProdutoBase descartando os campos.

## O que preciso / o que mudou
Feito: ProdutoBase em modules/integracao/contracts/entidades.ts ganhou os 4 campos nullish (contrato aceita aplicacao até 20.000, referencias até 10, oferece_junto até 20, etiquetas até 10, como no desenho K11); o Hub corta em domain/catalogo-produto.ts (validarLinhas) ANTES do hash e do evento: aplicacao 2.000 (aviso aplicacao_cortada), referencias 3 (referencias_cortadas), oferece_junto 5 (oferece_junto_cortado), etiquetas 4 (sem aviso). Então o evento chega ao seu consumidor já cortado. Teste de que eventoTolerante mantém os campos e eventos-contratos.test.ts verdes. A resolução de marca por core.marcas_concorrentes@1 (marca_concorrente_ausente) ainda não está no Hub: seu consumidor resolve por marca_external_id/marca_nome como já faz.

## Pronto quando
Pronto quando: os 3 testes RN-CAT-09 passarem no CI (db.test não roda aqui).
