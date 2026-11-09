---
id: R-20261106-212729-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T21:27:29-04:00
---
# Desligar PRECO_PROPRIO_CX_LIGADO na base demo (db/seeds/demo/demo.ts:221) no mesmo lote do Catálogo

## Contexto
Na T-0089, o Catálogo deixou de preencher embalagens[] de catalogo.precos_cliente@1 (RN-VEN-15 nova: a embalagem vale UN × fator). A API e o APK novo ignoram as linhas de tabela_preco_item com unidade não nula. Em db/seeds/demo/demo.ts:221, PRECO_PROPRIO_CX_LIGADO continua true. Com isso, a demo segue semeando o preço próprio da CX, e o APK antigo, que calcula embalagens a partir das linhas locais, mostra um preço de CX diferente do que a API recalcula no receber.

## O que preciso / o que mudou
Preciso de PRECO_PROPRIO_CX_LIGADO = false, de seed-demo.test.ts:203 ajustado e de as linhas com unidade não nula não serem mais criadas, sem apagar as condições antigas. O plano B demo-recriar-base recria a base sem elas.

## Pronto quando
Pronto quando: a flag estiver false, o seed-demo.test.ts estiver verde no CI e você responder a este recado.
