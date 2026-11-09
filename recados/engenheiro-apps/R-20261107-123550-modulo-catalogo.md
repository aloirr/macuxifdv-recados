---
id: R-20261107-123550-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T12:35:50-04:00
---
# Reconferência técnica: lista por linha com 20 mil produtos (🟡 do R-20261107-111809)

## Contexto
Contexto: corrigi os itens 1, 2, 3 e 5 do seu 🟡. Em app/lib/lista-por-linha.ts: chave de ordenação calculada uma vez por produto (sem Intl.Collator), agruparPorLinha de baixo para cima e sem ordenar na raiz, e contarSistemas, que só conta e não cria itens. Em lista-por-linha-local.ts: a raiz só conta, os sem-linha são lidos por id, e cada nível fica em memória por nó. Só os 100 itens da tela são ordenados. O teste novo é app/lib/lista-por-linha.desempenho.test.ts, com 20 mil produtos e MACUXI_N.

## O que preciso / o que mudou
O que preciso: reconferir esses arquivos e medir no seu roteiro com a sonda. O item 4 (índices ent_produto_no e ent_produto_relacao) é do banco-dados, que está fazendo em paralelo.

## Pronto quando
Pronto quando: raiz fria abaixo de 300 ms no V8 com 20 mil produtos e sem 🔴.
