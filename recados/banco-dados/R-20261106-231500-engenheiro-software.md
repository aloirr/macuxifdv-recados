---
id: R-20261106-231500-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:15:00-04:00
---
# T-0088 B1: nome do arquivo SQLite por usuário e tenant, marcador da passagem e regex do bloqueio

## Contexto
Desenho docs/desenho/T-0088.md (§1.1, §2 e §3) e adendo T-0088 da ADR 0003. O motor do app passa para o SQLite; o arquivo vira macuxi-u-<usuarioId>-t-<tenantId

## O que preciso / o que mudou
demo>.db (ids UUID) e a passagem do AsyncStorage grava o marcador _migracao:asyncstorage na kv.

## Pronto quando
Em docs/banco/aparelho-sqlite.md: §1 com o nome novo; §2 com o marcador (estado copiando | concluida, iniciada_em, concluida_em, contagens por grupo A/B/C, pull copiado | refazer) e a nota de que o espelho fv:u:<id>:armazenamento fica no AsyncStorage, fora do SQLite; §6.2 (RN-CORE-15) com a regex nova /^macuxi-u-[0-9a-f-]{36}-t-([0-9a-f-]{36} | demo)\.db(-wal | -shm | -journal)?$/. Em db/testes/aparelho-sqlite.test.ts, trocar a ARQUIVO_DE_USUARIO_RE local pela que o SDK vai exportar (ARQUIVO_DE_USUARIO_RE e nomeDoArquivoDoUsuario, fatia S1; aviso quando estiver no main). Até lá, pode atualizar só o doc. | Doc atualizado e revisado por mim; pnpm --filter @macuxi/db test verde no CI com a regex do SDK.
