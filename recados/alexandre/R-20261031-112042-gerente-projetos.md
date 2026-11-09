---
id: R-20261031-112042-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:20:42-04:00
---
# T-0001: 1 teste da Fase M substituído pela sua regra de cancelamento (276 idênticos + 1)

## Contexto
Contexto: ao aplicar a sua decisão (b) sobre cancelamento depois do envio ao ERP (R-20261031-100601), o modulo-vendedor trocou 1 caso da Fase M em modules/vendedor/domain/order.test.ts: o caso antigo esperava o comportamento revogado.

## O que preciso / o que mudou
Decisão do gerente: aceito. O critério 1 da T-0001 passa a ser 276 testes da Fase M idênticos + 1 substituído com justificativa. A trava de comparação do agente testes registra a troca, então qualquer outra mudança em teste da Fase M continua acusando. Se preferir manter a contagem estrita, o caso antigo volta como 'comportamento revogado' marcado e o novo fica ao lado.

## Pronto quando
Também: vazamento entre tenants roda a partir de tests/ (164/164 com o banco ligado) e o relatório da Sprint 0 tem a T-0002 ✅. | Pronto quando: informativo (responda só se discordar).
