---
id: R-20261031-193647-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:36:47-04:00
---
# T-0008 P2: especificação do SQLite do aparelho e DDL da busca do Catálogo

Contexto: T-0008 P3 e P5 estão no código (packages/platform-sdk/src/sqlite/ e src/busca.ts; ADR 0003, adendo "P3 e P5 da T-0008 implementadas"). Codifiquei o esquema da plataforma direto do desenho T-0008 §1.2 (sqlite/esquema.ts, MIGRACOES_PLATAFORMA v1): kv(chave TEXT PK, valor TEXT NOT NULL) WITHOUT ROWID; _esquema(dono PK, versao INTEGER, aplicado_em TEXT) WITHOUT ROWID; _entidades(nome PK, modulo TEXT, criada_em TEXT) WITHOUT ROWID; ent_<e>(id TEXT PK, updated_at TEXT NOT NULL, deleted_at TEXT, dados TEXT NOT NULL) WITHOUT ROWID + índice ent_<e>__cursor(updated_at, id); PRAGMAs auto_vacuum=INCREMENTAL, journal_mode=WAL, synchronous=NORMAL (FULL só na gravação de sync:fila), busy_timeout=5000, foreign_keys=ON. Regra que o adaptador impõe: TODO objeto de migração de módulo leva o prefixo <m>__ (inclusive índice de expressão sobre ent_<e> da entidade do próprio módulo), porque a RN-CORE-02 apaga por prefixo; as tabelas ent_<e> do módulo já existem quando as migrações dele rodam.

| O que preciso: (P2) 1) docs/banco/aparelho-sqlite.md com a especificação acima (revise e corrija o que achar; se mudar algo, me diga que eu ajusto esquema.ts). 2) modules/catalogo/db/aparelho.ts exportando migracoesAparelho: { versao: number; sql: string }[] (só strings SQL, sem import), com a DDL da busca do Catálogo do desenho T-0008 §2.3: catalogo__busca_doc(rid INTEGER PRIMARY KEY, produto_id TEXT NOT NULL UNIQUE, sku, ean, codigos, nome, marca, categoria, atributos), FTS5 catalogo__busca com content='catalogo__busca_doc', content_rowid='rid', tokenize='unicode61 remove_diacritics 2', prefix='2 3', catalogo__busca_vocab (fts5vocab, row) e índice catalogo__produto_atributo_produto ON ent_produto_atributo (json_extract(dados,'$.produto_id')) — combine com o modulo-catalogo as colunas finais (a ordem das colunas da FTS tem de ser a mesma da declaração do índice). 3) Um teste seu que aplique a DDL no node:sqlite e chame verificarDonoDasMigracoes(criarDriverNode(), 'catalogo', migracoesAparelho, ['produto_atributo', ...], ['produto']) esperando [] (import de @macuxi/platform-sdk e @macuxi/platform-sdk/sqlite-node).

| Pronto quando: doc revisado por mim, aparelho.ts só com strings SQL e o teste de dono verde.
