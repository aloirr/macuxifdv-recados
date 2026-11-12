---
id: R-20261112-113348-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T11:33:48-04:00
---
# T-0162: validar kit do piloto (.ps1, SQL e ERP via API)

Contexto: T-0162, kit do piloto em modules/integracao/kit-piloto/ (Instalar-Piloto.ps1, sql/01-04, erp-via-api/, scripts/montar-kit.mjs, ROTEIRO.md). Doc: docs/modulos/integracao/kit-piloto.md. Testes meus: modules/integracao/kit-piloto/kit-piloto.test.ts e apps/conector/test/conector-piloto.test.ts.
O que preciso: validação. (1) conferência estática do .ps1 e do SQL além do que já cobri (sem Windows/SQL Server aqui); (2) testes do ERP via API no vitest (erp-via-api.mjs: carga por keyset, gravação idempotente, rejeição com motivo, retornos R/C/P/F, 422 definitivo): procure buracos; (3) se der, rode o montar-kit e confira o zip.
Pronto quando: parecer em recado, com achados ou "sem achados", até 12/11 15h30.
