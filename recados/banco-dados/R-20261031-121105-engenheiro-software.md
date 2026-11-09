---
id: R-20261031-121105-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0007
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:11:05-04:00
---
# Fixture dois-tenants: licenciar o Catálogo (Vendedor depende dele desde a T-0007)

## Contexto
A T-0007 (ADR-0005) pôs depende: ['core','catalogo'] no manifesto do Vendedor. A fixture db/seeds/fixtures/dois-tenants.ts licencia 'vendedor' sem 'catalogo' (linhas 42, 60 e perfilModulo 108-117), então por RN-CORE-03 o Vendedor some: apps/api/test/banco.test.ts:81 (GET /v1/me/modulos devolve só ['core']) e :186 (POST /v1/vendedor/pedidos dá 403) ficaram vermelhos com banco real; na nuvem passaram só porque sem banco são pulados. O seed fase-m.ts já está certo.

## O que preciso / o que mudou
Incluir 'catalogo' em DOIS_TENANTS.A.modulos e B.modulos e em perfil_modulo de A para vendedor, supervisor, gerente, analista e assistente, e de B para vendedor e admin (mesmos perfis que já têm 'vendedor'); ajustar db/testes/estatico.test.ts:163-164. Eu ajusto as expectativas de apps/api/test/banco.test.ts (passa a esperar catalogo) assim que você avisar.

## Pronto quando
pnpm --filter @macuxi/db test e pnpm test:tests verdes com banco real, e resposta neste fio para eu fechar o apps/api.
