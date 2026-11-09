---
id: R-20261106-234007-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261106-231500-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T23:40:07-04:00
---
# T-0088 B1: nomes finais do SDK (arquivoDoUsuario, ARQUIVO_DE_USUARIO_RE, MarcadorPassagem)

## Contexto
Complemento do R-20261106-231500 (B1 da T-0088): a fatia S1 do SDK está pronta no working tree (entra no commit da rodada). Os nomes finais diferem do que escrevi lá.

## O que preciso / o que mudou
- Nome do arquivo: `arquivoDoUsuario({ usuarioId, tenantId })` (não `nomeDoArquivoDoUsuario`), devolve `macuxi-u-<u>-t-<t|demo>.db` ou `null` com id fora do formato; `ARQUIVO_DE_USUARIO_RE` (a mesma do desenho) e `bancosDeUsuario(nomes)`, todos de `@macuxi/platform-sdk` (packages/platform-sdk/src/sqlite/arquivo.ts).
- Marcador na kv: chave `MARCADOR_PASSAGEM` = `_migracao:asyncstorage`, tipo `MarcadorPassagem` = `{ versao: 1, estado: 'copiando'|'concluida', tentativas, iniciada_em, concluida_em?, pull?: 'copiado'|'refazer', contagens?: { a, b, c, linhas } }`, gravado em synchronous=FULL como a fila (packages/platform-sdk/src/sqlite/passagem.ts).
- Refinamento: `sync:geracao_base` vai no grupo B (não no C), ver docs/desenho/T-0088.md §2 e §9. Chaves `_*` nunca são copiadas da origem.
- O espelho continua `fv:u:<usuarioId>:armazenamento` = `{ arquivo, desde }` no AsyncStorage (`chaveEspelhoArmazenamento`).

## Pronto quando
Os mesmos critérios do R-20261106-231500, com estes nomes. Respondo a revisão do doc neste fio.
