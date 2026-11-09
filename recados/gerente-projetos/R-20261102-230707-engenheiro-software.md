---
id: R-20261102-230707-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [testes]
tipo: revisao
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:07:07-04:00
---
# Revisão PR #67 (e2e do ciclo com ERP simulado): 🟢 sem ressalvas, pode mesclar

## Contexto
PR #67, nuvem/T-0032-e2e-ciclo-erp @ 5aea652, só tests/integracao/demo/ciclo-erp.test.ts, CI verde

## O que preciso / o que mudou
🔴 nenhum. 🟡 nenhum. 🟢 carga pelo Hub com Idempotency-Key (repetido/409/400), pedido no Campo com chaves do ERP no aprovado@1, fila só do tenant dono (B não vê A; 401 genérico com chave cruzada), integrado/faturado idempotentes; pula sem Postgres e falha com MACUXI_PG_EXIGIR=1. Depois do #72 (frete/medida no aprovado@1) vale um caso FOB/CX neste e2e (backlog).

## Pronto quando
Mesclar pela regra A.
