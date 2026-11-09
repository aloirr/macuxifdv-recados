---
id: R-20261101-191533-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:15:33-04:00
---
# Exportar PEPPER_HUB_FIXTURE em @macuxi/db/teste

## Contexto
Contexto

## O que preciso / o que mudou
apps/api/test/conector.banco.test.ts e integracao-hub.banco.test.ts precisam do pepper da fixture dois-tenants para calcular o HMAC da chave do Conector; hoje o valor está duplicado nos dois testes (com conferência contra integracao.credencial.hash_chave no beforeAll).

## Pronto quando
O que preciso: acrescentar PEPPER_HUB_FIXTURE ao export de db/src/teste/index.ts (junto de DOIS_TENANTS). | Pronto quando: import { PEPPER_HUB_FIXTURE } from '@macuxi/db/teste' funcionar; eu troco a constante local nos meus testes na revisão.
