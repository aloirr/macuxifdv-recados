---
id: R-20261031-135410-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:54:10+00:00
---
# T-0008 parte 1: desenho do adaptador SQLite + FTS5 e ADR 0003 atualizada

## Contexto
Contexto: T-0008 parte 1, pedida pelo Alexandre e feita na nuvem (branch nuvem/T-0008-desenho-sqlite).

## O que preciso / o que mudou
O que mudou: docs/desenho/T-0008.md (novo). (1) ArmazenamentoSync continua igual e ganha extensões opcionais: linhas, emTransacao, removerModulo, busca. (2) Esquema híbrido: kv para estado, cursores e fila; ent_<e> por entidade de pull; tabelas <m>__ com versão em _esquema e _entidades; RN-CORE-02 via removerModulo. (3) FTS5 com content externo, unicode61 remove_diacritics 2, prefixo, bm25 com pesos e sinônimos expandidos no domínio do catalogo; enquanto o Catálogo não existe, a busca fica como fallback. (4) Bibliotecas: expo-sqlite ~57.0.4 no app (FTS5 ligado) e node:sqlite nos testes, atrás de um DriverSqlite; a mesma suíte do motor roda nos adaptadores. (5) Medido no Node: 20 mil SKUs em 0,85 s, rebuild FTS em 0,16 s, busca com p95 de 10,6 ms. (6) Migração do AsyncStorage copia a fila primeiro, confere e é idempotente. ADR 0003: adendo de 2026-10-31 com o gatilho e a decisão.

## Pronto quando
Premissas: Expo SDK 57; Node >= 22.13 (proposta de subir engines de >=20.19; confirmar no Windows do Alexandre); aparelho de referência Android 10+ de entrada com 2-3 GB de RAM; meta < 300 ms é o p95 de buscar(). Pendências: P2 do banco-dados (pedido enviado); manifesto do catalogo ainda lista produto no sync, contrariando a ADR 0005 (tratar na T-0007); engines do Node.
