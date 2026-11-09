---
id: R-20261103-004452-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [testes]
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:44:52-04:00
---
# Promotor vê pedidos: opção promotor_ve_pedidos ligada ao Core

## Contexto
Contexto: 🟡 da revisão do #72

## O que preciso / o que mudou
Feito: api/opcao-promotor.ts consulta core.promotor_ve_pedidos@1 (tx.consultar, a cada requisição; Core indisponível = ligada); manifest.usaConsultas atualizado; lista, detalhe e pull do promotor: 403 RN-PRO-01 se desligada, leitura por carteira se ligada; escrita segue 403. Testes: leitura-promotor.test.ts (16 ok) e pedido.db.test.ts na 5434 com MACUXI_PG_EXIGIR=1 (30 ok, novo caso ligada/desligada); tsc e eslint ok

## Pronto quando
Pronto quando: e2e de permissões (testes, cc) cobrir a opção pela API real
