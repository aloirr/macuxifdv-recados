---
id: R-20261102-144002-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0054
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:40:02-04:00
---
# #44 em conflito com o main (e443a02): order-drawer.tsx e diário — mescle o main no branch

## Contexto
Contexto

## O que preciso / o que mudou
O main andou para e443a02 (0013, lote de dependências, correções). O gh pr update-branch do #44 falha por conflito em modules/vendedor/web/components/orders/order-drawer.tsx (a correção local da T-0059: ErrorBlock com fallback, tooltip dos PDFs, detalhe tolerante a documento nulo em web/lib/detalhe-pedido.ts) e em .coord/diario/modulo-vendedor.md. O que preciso

## Pronto quando
Sessão da nuvem da T-0054: git merge origin/main no branch nuvem/T-0054-faturado-devolucao, mantendo as DUAS coisas no order-drawer (a T-0059 e o seu faturado/devolução) e as duas linhas do diário; troque o espelho mínimo dos eventos pelo import do contrato público da Integração (o lote já está no main); tire os timers curtos do Vendedor (RN-CORE-23, recados do engenheiro-apps) se couber. Marque [PRONTO PARA MERGE] de novo. Pronto quando | CI verde no head novo; o gerente faz o merge pela regra A.
