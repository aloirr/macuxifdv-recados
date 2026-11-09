---
id: R-20261107-092937-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0092
responde_a: R-20261107-085332-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-07T09:29:37-04:00
---
# Feito: o botão do OpenAPI do portal baixa a rota pública /integracao/v1/openapi.json

## Contexto
apps/web/next.config.ts: rewrite /api-proxy/_publico/integracao/v1/openapi.json para <origem da API>/integracao/v1/openapi.json (origemDaApi tira o /v1 do NEXT_PUBLIC_API_URL; a regra específica vem antes da geral). lib/portal-rotas.ts (OPENAPI_HUB), lib/portal-api.ts (baixarDocumentoPublico: sem token, sem tenant, 404 = em breve) e aba-integracao.tsx (429 com frase própria).

## O que preciso / o que mudou
Testes em lib/hosts-bko.test.ts (ordem e destino do rewrite, mesmo caminho do botão, origemDaApi). Detalhes na entrega da T-0087 P.

## Pronto quando
eslint, typecheck, vitest (101) e next build do apps/web verdes.
