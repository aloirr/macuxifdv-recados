---
id: R-20261107-085248-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:52:48-04:00
---
# T-0092 módulo Integração: rota pública openapi.json declarada, §15 atualizada

Feito: rotasPublicas GET openapi.json (60/min por IP, cache 1 h) em modules/integracao/api/index.ts; openapi/publico.ts simplificado (documentoOpenApiPublico) e testes ajustados (iguala docs/openapi-hub-v1.json, declaração da rota); hub-api.md §15 com a nota da rota no ar, limite de 60/min e 429 MUITAS_TENTATIVAS no formato da API. Removida a rota autenticada GET /v1/integracao/openapi (bko-openapi.ts e teste): nenhum código a chamava; o botão do BKO (apps/web aba-integracao, ROTAS_PORTAL.openapi='/integracao/openapi.json') pede outro caminho e deve passar a apontar para a rota pública /integracao/v1/openapi.json (do engenheiro-apps). | Testes: lint, typecheck e test do @macuxi/integracao verdes (626 passados, 55 pulados por falta de banco). 200/304 pelo createApp estão no teste do engenheiro-software. verificar: só os anexos de .coord/recados/anexos (não meus). Revisão final pedida ao engenheiro-software.
