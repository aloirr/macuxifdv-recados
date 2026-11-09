---
id: R-20261106-234111-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:41:11-04:00
---
# T-0088 S1: passagem AsyncStorage→SQLite, arquivo por usuário e tenant, registro/logout/bloqueio e busca 'indexando' no SDK

## Contexto
T-0088, fatia S1 (engenheiro-software) do desenho docs/desenho/T-0088.md (adendo §9). Nada muda no servidor nem nos contratos; sem dependência nova; sem git, Docker ou .env.

## O que fiz
- `packages/platform-sdk/src/sqlite/arquivo.ts`: `arquivoDoUsuario` (`macuxi-u-<u>-t-<t|demo>.db`, ids UUID, id hostil = null), `ARQUIVO_DE_USUARIO_RE`, `bancosDeUsuario`.
- `sqlite/passagem.ts`: `passarDoAsyncStorage` em 3 grupos (A fila/aceitos/arquivos/mod:* e B estado copiados e conferidos — divergência = abortada, sessão no AsyncStorage, nova tentativa na próxima abertura; C linhas/cursores — falha = sai do SQLite e `pull: 'refazer'`, fila intacta); marcador `_migracao:asyncstorage` (concluída nunca recopia; gravado em FULL); `apagarOrigemSePossivel` (só após concluída + sync completo, ou 7 dias).
- `sqlite/aparelho.ts`: `escolherArmazenamento` (§4: com espelho nunca volta ao AsyncStorage, falha = erro) e `criarArmazenamentosDoAparelho` (uma instância por arquivo, passagem única mesmo com aberturas simultâneas, espelho, logout `fechar` sem apagar, bloqueio `apagarTodos` com todos os usuários).
- Adaptador: `buscaSemEsperarIndexacao` + motivo aditivo `indexando` no `MotivoSemBusca`; `ArmazenamentoSqlite.emTransacao` obrigatório no tipo.
- Refinamento do desenho: `sync:geracao_base` foi para o grupo B (ADR 0021: sem ela a troca de base perderia os aceitos).
- Exports só em `sqlite/index.ts` (índice raiz e `src/api*.ts` intocados — T-0091 em paralelo).

## Testes
`sqlite/arquivo.test.ts`, `sqlite/passagem.test.ts` (passagem completa, falha no A, fila divergente, falha no C, app morto no C com reentrada, fila offline do motor antigo saindo do SQLite uma vez e na ordem, dois usuários e dois tenants, logout, bloqueio, reserva × erro) e `busca.test.ts` (`indexando`). platform-sdk: lint, typecheck e test verdes (609 testes); apps/mobile: lint, typecheck e test verdes (240). `verificar engenheiro-software`: meus arquivos OK; as 4 violações listadas são anexos do dono do produto em `.coord/recados/anexos/`, não minhas.

## Pendências
A1/A2 (engenheiro-apps, API no R-20261106-234003), B1 (banco-dados, nomes no R-20261106-234007), C1 (modulo-catalogo, R-20261106-234009), T1 (testes), revisão final R minha. Premissas: ids da sessão são UUID; demo = tenant `demo`; a remoção da origem roda no `abrir`.
