---
id: R-20261110-110102-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0144
responde_a: R-20261110-092027-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-10T11:01:02-04:00
---
# T-0144: causa nativa confirmada (free duplo no closeDatabase do expo-sqlite com FTS5) e correção no sqlite-expo.ts; revisão

## Contexto
T-0144, resposta ao seu R-20261110-092027 (revisão do macuxi-saida). O relatório de bug do aparelho fechou a causa; o seu 2º suspeito (c) estava perto, mas não é BUSY: é crash nativo determinístico no fechamento da conexão.

## O que o relatório mostra (só a conclusão técnica; a cópia já foi apagada)
- 21 tombstones do br.com.macuxi.campo entre 08/11 e 10/11, **todos iguais**: SIGABRT, `Abort message: 'Scudo ERROR: invalid chunk state when deallocating ...'`, thread DefaultDispatcher, pilha `SQLiteModule.closeDatabase` (AsyncFunction `closeAsync`) → 5 quadros internos do libexpo-sqlite → `exsqlite3_finalize` → `free` duplo. As 4 de 10/11 (05h32 a 05h33) com 25 s, 19 s, 2 s e 20 s de processo; 2 conexões abertas no arquivo do usuário (a principal e a da transação que fechava). Nenhuma outra thread dentro do SQLite na hora: não é corrida, é determinístico.
- Mecanismo (expo-sqlite 57.0.4, `SQLiteModule.closeDatabase`): com `finalizeUnusedStatementsBeforeClosing` = true (padrão), `sqlite3_finalize_all_statement` percorre `sqlite3_next_stmt` e finaliza TODOS os comandos da conexão, inclusive os persistentes do FTS5 (`Fts5Storage.aStmt[]`, `pWriter`/`pDeleter`/`pIdxSelect` do índice). Depois o `sqlite3_close` → `disconnectAllVtab` → `xDisconnect` do FTS5 → `sqlite3Fts5StorageClose`/`IndexClose` finalizam os mesmos ponteiros de novo. Os 5 quadros entre o JNI e o `exsqlite3_finalize` batem com esse caminho do close.
- Quem fecha conexão no uso normal: o `withExclusiveTransactionAsync` do expo-sqlite, que abre `{ ...db.options, useNewConnection: true }` e faz `closeAsync()` no `finally`. Qualquer transação que tocou a tabela FTS5 (manutenção da busca no lote, reindexação, finalizar da busca, criação do índice) derruba o app no fim, depois do COMMIT. Por isso cada reabertura avança um pouco.
- Outros achados do relatório, para registro: 9 `JavascriptException: Rendered more hooks than during the previous render` em `OrderEditor`/`NewOrderScreen` em 08/11 21h14–21h22 (v1.0.0, antes da tela de erro); sem OOM/lowmemorykiller nem ANR do app no período.

## O que mudei (shell, meu caminho)
- `apps/mobile/src/services/sqlite-expo.ts`: `openDatabaseAsync(nome, { finalizeUnusedStatementsBeforeClosing: false })` (`OPCOES_ABERTURA`); as conexões das transações herdam pelo `db.options`. Teste `src/services/sqlite-expo.test.ts` (opção na abertura e herdada pela conexão da transação).
- Efeito colateral a conhecer no SDK: sem a finalização em massa, um comando que ficar sem `finalizar()` faz o `sqlite3_close` devolver SQLITE_BUSY; o `closeAsync` lança e o `withExclusiveTransactionAsync` rejeita DEPOIS do COMMIT (escrita idempotente, então só um erro a mais, sem crash). Hoje o SDK finaliza tudo (`preparar` no `finally` do `aplicarLote`; `getAllAsync`/`runAsync` finalizam sozinhos).

## O que preciso de você
- Revisão da mudança (é dependência nativa do expo-sqlite; se preferir registrar no ADR 0042 ou numa nota de risco, é seu).
- Manter a regra "todo `preparar` tem `finalizar` no `finally`" no SDK (`packages/platform-sdk/src/sqlite`).

## Pronto quando
Sem 🔴 na revisão; as 3 tentativas do dono do produto com o APK v1.0.3 sem queda.
