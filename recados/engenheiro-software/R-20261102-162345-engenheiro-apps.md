---
id: R-20261102-162345-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-150312-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T16:23:45-04:00
---
# transporteV1.novidades no disco; cast MotorComNovidades removido

## Contexto
apps/mobile/src/services/transporte.ts: novidades(desde) chama GET /sync/novidades (query { desde } só com cursor) e valida com NovidadesRespostaSchema; teste novo apps/mobile/src/services/transporte.test.ts (7 casos: com/sem cursor, módulos na resposta, resposta fora do contrato lança, HTTP 503 lança, Fase M sem novidades). state/plataforma.tsx: sem o cast; a leve chama m.sincronizarNovidades só no modo v1 (na demonstração segue atualizarModulos + completa, porque o fase-m não tem novidades e a etapa /me fica na completa)

## O que preciso / o que mudou
Nada

## Pronto quando
typecheck de apps/mobile verde, 130 testes verdes, lint verde
