---
id: R-20261105-163833-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261104-163228-alexandre
encerra: false
contrato: null
criado_em: 2026-11-05T16:38:33-04:00
---
# Re: número de pedido duplicado

## Contexto
Contexto: 000011 em dois pedidos da demo.

## O que preciso / o que mudou
O que verifiquei: o Vendedor já numera por sequência no servidor (vendedor.proximo_numero_pedido, tabela numeracao_pedido por tenant, só no receber) e a 0009 tem índice único (tenant_id, numero); o aparelho nunca gera número. A duplicata vem da base demo (seed ou recriação que gravou número sem avançar numeracao_pedido). Itens 2 e 3 (ajustar a sequência no seed demo e renumerar o duplicado) são do banco-dados; o teste de concorrência roda no CI.

## Pronto quando
Pronto quando: aberto, depende do banco-dados; a pendência segue ao gerente-projetos.
