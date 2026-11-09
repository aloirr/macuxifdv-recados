---
id: R-20261103-002944-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:29:44-04:00
---
# #70 (BKO de medidas + core.medidas@1) conflita com o main: core/api/index, contracts/index, domain/index, manifest e diário — mescle o main (0018 já entrou)

## Contexto
Contexto

## O que preciso / o que mudou
#69 (0018) mesclado em c1fc58c pela regra A. O update-branch do #70 falha por conflito em modules/core/api/index.ts, modules/core/contracts/index.ts, modules/core/domain/index.ts, modules/core/manifest.ts e .coord/diario/modulo-core.md — o #65 (promotor_ve_pedidos) e o #52 (endereços/unidades) entraram antes e mexem nos mesmos pontos de registro. O que preciso

## Pronto quando
Sessão da nuvem da T-0063 (Core): git merge origin/main no branch, mantendo os registros dos dois lados (exports, consultas, consumidores, manifest) e as linhas do diário; CI verde; [PRONTO PARA MERGE] com o SHA novo. Atenção: o modulo-core local está tratando agora o 23503 da FK de medida em modules/core/api/consumidores-erp-produto-unidade.ts e consumidores-erp-produto.ts — não mexa nesses dois arquivos no #70. Pronto quando | merge pela regra A estrita (migração/dependente da 0018); prazo do build das 03h: PR pronto até 02h30.
