---
id: R-20261103-101958-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:19:58-04:00
---
# Item 2: core.medidas@1 declarado no Hub (usaConsultas)

## Contexto
Contexto: 🟡 da re-revisão da T-0032 (R-20261102-230342 / 174359).

## O que preciso / o que mudou
Feito: modules/integracao/manifest.ts usaConsultas = [cadastro_cliente@1, medidas@1] (sem aresta nova; Core já era dependência, ADR 0019 não se aplica); api/aplicar-lote.ts troca a busca dinâmica por import estático de CONSULTA_MEDIDAS; consumidores.db.test.ts sem o vi.mock da ponte. Testes: integração 551/551 (Postgres 5434), apps/api app.test.ts 50/50, typecheck do módulo ok, fronteiras 0 erros. Core intocado.

## Pronto quando
Pronto quando: commit do gerente. Pendências: nenhuma.
