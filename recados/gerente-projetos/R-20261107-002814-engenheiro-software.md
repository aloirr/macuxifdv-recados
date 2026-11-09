---
id: R-20261107-002814-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:28:14-04:00
---
# T-0088: revisão do A1 sem 🔴; demo passa a usar o SQLite (nome do arquivo aceita qualquer id)

## Contexto
T-0088: revisão do A1 do shell (R-20261107-000958) e o ponto da demo. Os ids da demo não são UUID, então a sessão ficava no AsyncStorage e o SQLite não podia ser conferido no aparelho.

## O que fiz
1. A regra estava no SDK e corrigi lá: `packages/platform-sdk/src/sqlite/arquivo.ts`. `arquivoDoUsuario` aceita qualquer id. Um UUID entra em minúsculas, como antes. Qualquer outro id vira `h` + 32 hex do SHA-256 do id exato, em TS puro e sem `node:*`. O id nunca entra cru no nome. Um tenant cujo id é a palavra "demo" vira hash, sem colidir com o `demo` de quem não tem tenant. Tenho a `ARQUIVO_DE_USUARIO_RE` nova e o bloqueio apaga também os arquivos com hash. `null` (reserva) só quando falta o id do usuário. Não há o que migrar: nenhum APK com a T-0088 saiu ainda.
2. Testes: `sqlite/arquivo.test.ts` (16 testes: ids hostis, ausência de colisão entre usuário, tenant e caixa, SHA-256 conferido com o node:crypto) e um caso novo em `sqlite/passagem.test.ts` (demo `u-vend-01`: SQLite, passagem da fila, reabertura no logout, remoção no bloqueio). SDK: lint, typecheck e 617 testes verdes; o grafo do app segue sem `node:*`.
3. Revisão do A1 sem 🔴 (R-20261107-002655 ao engenheiro-apps). Uma instância por arquivo, passagem com a tela por cima, logout que fecha sem apagar, bloqueio que apaga todos e medição com as mesmas opções: tudo confere com o desenho. Aceitei os dois desvios: `requestIdleCallback` e logout sem esperar o sync no ar. 🟡 1: `apps/mobile/src/lib/armazenamento-aparelho.test.ts:134-144` ficou vermelho com o SDK novo (1 teste). 🟡 2: textos de `ids_invalidos` em `lib/armazenamento-aparelho.ts:98` e `services/armazenamento.ts:10`. Os 🟢 ficaram a critério dele.
4. Docs: adendo §10 em `docs/desenho/T-0088.md` e uma nota no adendo T-0088 da ADR 0003. Pedido ao banco-dados (R-20261107-002722) para pôr a regex nova em `docs/banco/aparelho-sqlite.md` e em `db/testes/aparelho-sqlite.test.ts:644`, que ainda tem a regex antiga.

## Pendências
- O push fica vermelho até o engenheiro-apps ajustar o 🟡 1: o vitest do apps/mobile tem 1 falha por causa da mudança do SDK.
- `verificar engenheiro-software`: os meus arquivos estão OK. Há 4 violações em `.coord/recados/anexos/*` (anexos de 06/11, sem dono), que não são minhas.
- Não revisei o C1 do modulo-catalogo (R-20261106-235212): ficou fora do escopo pedido.

## Pronto quando
A revisão final (R) sai depois dos 🟡 do A1, do C1, do T1 e do A2 com o build.
