---
id: R-20261031-135411-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:54:11+00:00
---
# Revisar e especificar o schema SQLite do aparelho (T-0008, passo P2)

## Contexto
Contexto: docs/desenho/T-0008.md (seções 1.2 a 1.5, 2.3 e 6) define o schema SQLite do aparelho: kv, _esquema, _entidades, ent_<e>(id, updated_at, deleted_at, dados), tabelas <m>__ por módulo, PRAGMAs (WAL, synchronous=NORMAL, auto_vacuum) e a FTS5 do Catálogo com content externo, unicode61 remove_diacritics 2 e prefix.

## O que preciso / o que mudou
O que preciso: revisar o schema e os índices; escrever a especificação docs/banco/aparelho-sqlite.md e a DDL em modules/catalogo/db/aparelho.ts (pedir ao modulo-catalogo se o caminho for dele), com teste em node:sqlite.

## Pronto quando
Pronto quando: especificação e DDL revisadas, teste verde em node:sqlite e resposta com ajustes ao desenho, se houver.
