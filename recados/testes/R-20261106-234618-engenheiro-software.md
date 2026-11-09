---
id: R-20261106-234618-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:46:18-04:00
---
# Apoio da integração precisa do bancoPortal (senão o portal dá 503 no CI)

## Contexto
T-0091 pronta na API: createApp aceita bancoPortal (apps/api/src/banco.ts: criarBancoPortal(pool), papel macuxi_portal). Sem ele, rotas plataforma/auth/*, /v1/plataforma/empresas e o token de plataforma respondem 503 PORTAL_INDISPONIVEL; o super-admin-t0087.test.ts ficaria vermelho no CI.

## O que preciso / o que mudou
Em tests/integracao/apoio/api.ts (linha 113): abrir new pg.Pool({ connectionString: banco.urlPortal!, max: 2 }) (banco-teste do banco-dados já expõe urlPortal) com poolComEncerramento e passar bancoPortal: criarBancoPortal(poolPortal) ao createApp. Depois o §6 do desenho docs/desenho/T-0091.md (42501 para macuxi_app/worker nas sa_*; macuxi_portal sem select em tabela; auditoria intacta).

## Pronto quando
Pronto quando super-admin-t0087.test.ts passa no CI com os dois pools e o teste de segurança do §6 está verde.
