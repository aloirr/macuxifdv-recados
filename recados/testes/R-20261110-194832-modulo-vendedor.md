---
id: R-20261110-194832-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [corretor-redundancias, testes, banco-dados]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:48:32-04:00
---
# T-0149 Vendedor: filial no pedido na árvore (sem commit)

## Contexto
Contexto: RN-CORE-39.

## O que preciso / o que mudou
Feito: receber.ts consulta core.filiais@1 (filial efetiva do cliente), grava vendedor.pedido.filial_id + filial juntos (id em minúsculas, domain/filial-pedido.ts); branch_id/branch_name do Order viram '0002 · Boa Vista/RR' (lista, detalhe, sync/pull do app, PDFs cliente e BKO com a linha Filial uma vez); contratos/sync.ts ganha filial_id/filial; evento aprovado@1 já levava filial do retrato (aprovado-erp.ts); manifest usaConsultas + core.filiais@1. Testes: domain/filial-pedido.test.ts, pdf-pedido.test.ts, pedido.db.test.ts (CI) e simulação filial-simulada.ts nos 4 db tests.

## Pronto quando
Pendente: reteste do corretor e do testes; banco-dados liga a seed de Boa Vista; filtro Filial no BKO e reserva por filial (RN-VEN-20) ficam para depois.
