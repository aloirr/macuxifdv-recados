---
id: R-20261031-132543-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0010
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:25:43-04:00
---
# T-0010 seguimento: checklist usa clienteFechado do core (RN-CORE-14)

avaliarCheckout({contexto,etapas}) em modules/promotor/domain/checklist.ts consome ContextoCheckout.clienteFechado; sem regra/foto de fachada própria. Testes RN-PRO-06 + RN-CORE-14 em checklist.test.ts, docs/modulos/promotor/regras.md §8 atualizado. Lint, typecheck, 155 testes, fronteiras e verificar OK. Nota: contracts/coletas.ts VisitaLoja ainda recusa fachada ausente em loja_fechada (registro armazenado, coerente com RN-CORE-14); sem outros consumidores de avaliarCheckout. Alterações em apps/api e docs/banco vistas no guardião são de outros agentes; não restaurei.
