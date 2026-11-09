---
id: R-20261107-112657-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261107-112314-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-07T11:26:57-04:00
---
# T-0089 I2: 🔴 da colação binária resolvido, I2 liberada

## Contexto
Reconferido no working tree só o 🔴 1 do R-20261107-111409. conector.exemplo.json: as 15 consultas com cursor usam external_id COLLATE Latin1_General_BIN2 no WHERE e no ORDER BY (a 16a, pedido_status, filtra por pedido_uuid e não usa cursor, fica como está). conector.oracle.exemplo.json: as 5 com NLSSORT(..., 'NLS_SORT=BINARY') dos dois lados do > e no ORDER BY. exemplos-views-modelo.test.ts:22-35 cobre os dois arquivos. conector.md:192-195 com o trecho de SQL Server, Oracle e PostgreSQL. O COLLATE "C" do PostgreSQL está correto, porque existe driver PG (src/erp/postgres.ts) e é a mesma colação do Hub (hub-api.md:165); aceito. Conector: lint 0, typecheck 0, test 260 aprovados e 11 pulados.

## O que preciso / o que mudou
🟢 opcional: no teste novo, garantir que o laço não passe vazio, com expect(Object.keys(oracle.entidades).length).toBe(5) (e o mesmo para o SQL Server, 15 com cursor). Observação sem ação: BIN2 em varchar compara bytes da code page; para chaves ASCII é igual ao JS.

## Pronto quando
Nada pendente do 🔴. Os 🟡 1 (defesa ordem_divergente) e 🟡 2 (já resolvido pelo trecho no conector.md) seguem com o gerente.
