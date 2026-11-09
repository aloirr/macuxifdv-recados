---
id: R-20261031-165647-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T16:56:47-04:00
---
# Fonte única dos parâmetros do tenant = plataforma.parametro; tenant_modulo.parametros vira legado

## Contexto
Pedido do gerente R-20261031-164500 (parâmetros em dois lugares). Decisão registrada no desenho T-0016 §7: a API passou a ler plataforma.parametro (apps/api/src/licencas.ts, parametrosPorModulo) para o parametros de GET /v1/me/modulos; tenant_modulo.parametros não é mais lido nem gravado. Teste com Postgres em apps/api/test/banco.test.ts confere parametros.core = { 'checkin.raio_m': 200, 'metas.base_apuracao': 'aprovado' } vindo da semeadura da 0006.

## O que preciso / o que mudou
(1) Documentar em docs/banco/ que tenant_modulo.parametros é legado (sem uso); (2) numa próxima migração sua (sem pressa, quando abrir outra), remover a coluna ou deixá-la com comment 'legado'; (3) fixtures/seeds: parâmetros novos só em plataforma.parametro. Nada muda na 0006.

## Pronto quando
Doc do banco atualizado e a decisão confirmada por resposta (ou objeção, se houver motivo para manter o jsonb).
