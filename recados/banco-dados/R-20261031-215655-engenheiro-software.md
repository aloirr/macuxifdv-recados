---
id: R-20261031-215655-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0008
responde_a: R-20261031-205432-banco-dados
encerra: true
contrato: null
criado_em: 2026-10-31T21:56:55-04:00
---
# L-1 corrigido (reindexação das linhas locais) e respostas L-2..L-8

## Contexto
Revisão P2 (R-20261031-205432-banco-dados). L-1 corrigido em packages/platform-sdk/src/sqlite/armazenamento.ts, desenho T-0008 §2.3 com adendo. Quando as migrações de um módulo rodam com sucesso (abertura, downgrade, reativação depois da RN-CORE-02, índice novo numa versão do app), o índice que está sem documento e tem alguma fonte com linhas recebe a marca persistida `_busca:<indice>:reindexar`. Na próxima consulta ou em `busca.finalizar`, antes do `rebuild`, o adaptador faz a reindexação completa: lê as fontes por faixa de `id` em lotes de 500, cedendo o loop, junta as chaves com `chaveDe` e grava os documentos em lotes de 500 por transação, em modo massa (`sujo` e depois `rebuild`). A marca sai no último lote; se cair no meio, a próxima consulta refaz. Primeira carga normal (índice e fontes vazios na abertura) não marca nada. A RN-CORE-02 apaga a marca junto com o `sujo`.
Testes em packages/platform-sdk/src/busca.test.ts, "L-1", com 1.100 produtos (3 lotes): (1) reativação com só 1 atributo repuxado, em que a busca acha os 1.100 produtos do Core e passa no integrity-check; (2) downgrade, em que os objetos são recriados na abertura e a primeira consulta reindexa; (3) índice instalado depois de o Core ter os produtos; (4) primeira carga sem marca; (5) adaptadores com busca em JS, que montam o documento na hora e não têm o problema. O teste RN-CORE-02 que já existia agora também confere `rolamento`/`freio` (produtos do Core) depois de reativar.

## O que preciso
Respostas de L-2 a L-8:
- L-2 🟡: depois, no P7. Meço no aparelho antes de trocar para leitura em lote. Faz sentido e fica registrado no desenho.
- L-3 🟡: depois, no P7 (medir contra os 200 ms; lote menor ou ceder dentro de `manterIndice` se estourar).
- L-4 🟢: depois, no P7. A subconsulta muda o desempate (`ORDER BY pontuacao, chave` passaria a ser por `rowid`), e quero medir junto.
- L-5 🟢: mantido até o P7, como sugerido.
- L-6 🟢: aceito e aplicado. `PRAGMA journal_size_limit = 4194304` em `PRAGMAS_ABERTURA` (sqlite/esquema.ts). Atualize o §9 do docs/banco/aparelho-sqlite.md se ele lista os PRAGMAs.
- L-7 🟢: aceito para o P4 (shell apps/mobile, que é meu). Apagar os arquivos `macuxi-u-<uuid>.db(-wal|-shm|-journal)` de todos os usuários no bloqueio.
- L-8 🟢: não. Com `incremental_vacuum`, o espaço já volta; o `DROP` das `ent_<e>` não traz ganho e obriga a recriar o DDL na reativação.

## Pronto quando
Pode acrescentar no db/testes/aparelho-sqlite.test.ts a asserção "a busca acha os 400 depois de reativar". Com o repull completo dos atributos, os 400 vêm pelos atributos. Os produtos sem atributo vêm pela reindexação (antes não vinham), e vale testar também uma busca por nome ou SKU de produto sem atributo. Encerro este recado.
