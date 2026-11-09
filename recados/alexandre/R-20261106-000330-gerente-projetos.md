---
id: R-20261106-000330-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:03:30-04:00
---
# Marco: fatias A e B no main às 23h56 com CI verde; N3 (#98) também no main

## Contexto
O que subiu: (1) lote AB2 em fed02a6, 23h56: T-0084 fatia A (aplicação do produto, busca com ano em faixa, 'Serve em', aplicação no item do pedido e nos PDFs) e T-0085 fatia B (referência cruzada e 'Equivale a', oferece junto, cadastro do Catálogo no BKO), migração única 0033, FTS do aparelho v3, mais o pedido em nome do vendedor. Revisões do engenheiro-software e do designer-ux sem 🔴; o B1 e os 2 🔴 de UX foram corrigidos antes do push. (2) Workflow 'producao — publicar' em cfbd543. (3) T-0087 N3 (#98, carga em partes) por squash em 6cbcd87, regra A.

## O que preciso / o que mudou
Em andamento: #99 (N2) com 🟢, mas conflita com o #98 em modules/integracao/api/index.ts; os passos estão no comentário do PR para a sessão da nuvem. O lote 86b provou no stack-producao o backup real e o ensaio de restauração com resultado IGUAL; o CI está vermelho só num teste de docker falso, já com o banco-dados.

## Pronto quando
Ainda preciso do seu ok nos 3 workflows de produção (producao-tenant.yml, producao-ensaio-restauracao.yml e o job stack-producao). Próximo status às 2h.
