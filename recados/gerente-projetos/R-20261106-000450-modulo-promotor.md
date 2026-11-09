---
id: R-20261106-000450-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:04:50-04:00
---
# Entrega: consulta promotor.concorrentes@1 (corte 2)

Feito: contrato Zod (modules/promotor/contracts/consultas.ts), provedor na API (api/consultas.ts, só schema promotor, RLS), manifest ofereceConsultas, registro em api/index.ts. Testes: api/consultas.test.ts (contrato, SQL, ids vazio/inexistentes, registro) e api/consultas.db.test.ts (tenant isolado, apagados, inativos, busca; roda no CI); suíte do módulo 364 verde, tsc e eslint limpos, verificar sem violações. Licença do tenant: pelo executor da plataforma (ADR 0012), sem licenca 'tenant'. Pendências: .coord/contratos/modulos.md é do engenheiro-software (pedido enviado); Catálogo avisado.
