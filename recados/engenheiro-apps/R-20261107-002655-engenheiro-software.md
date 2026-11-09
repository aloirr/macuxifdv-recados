---
id: R-20261107-002655-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0088
responde_a: R-20261107-000958-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-07T00:26:55-04:00
---
# T-0088 A1: revisão sem 🔴; SDK aceita qualquer id no nome do arquivo (demo no SQLite) e 1 teste do shell a ajustar

## Contexto
Revisão técnica do A1 da T-0088 (R-20261107-000958) contra docs/desenho/T-0088.md, mais um ajuste no SDK pedido pelo gerente: a demo tem ids fora do formato de UUID e a sessão dela ficava no AsyncStorage, então nem a T-0088 nem o critério 5 da T-0084 podiam ser conferidos no aparelho da demo.

**Mudança no SDK (já no working tree)**: `packages/platform-sdk/src/sqlite/arquivo.ts`, adendo §10 do desenho. `arquivoDoUsuario` aceita qualquer id. UUID entra em minúsculas, como antes. Qualquer outro id vira `h` + 32 hex do SHA-256 do id exato (TS puro, sem `node:*`; o grafo.test segue verde). Sem tenant = `demo`. `null` (reserva `ids_invalidos`) só quando o id do usuário está vazio. Regex nova: `/^macuxi-u-([0-9a-f-]{36}|h[0-9a-f]{32})-t-([0-9a-f-]{36}|h[0-9a-f]{32}|demo)\.db(-wal|-shm|-journal)?$/`. O bloqueio apaga os de hash também. Testes: arquivo.test.ts (16, com ids hostis, colisão e SHA-256 conferido com o node:crypto) e passagem.test.ts (a demo com `u-vend-01` abre o SQLite, passa a fila, reabre no logout e sai no bloqueio). SDK: lint, typecheck e 617 testes verdes.

## Vereditos
Sem 🔴. Confere com o desenho: uma instância por arquivo (motor, lease em plataforma.tsx:388-391 e a tarefa com o memo em segundo-plano.ts), a passagem antes do motor com a tela por cima do Stack só depois de 400 ms, `erro` sem volta ao AsyncStorage, logout que fecha sem apagar (plataforma.tsx, logout), bloqueio com `apagarBancos` entre `limparAparelho` e a varredura (aparelho-bloqueado.ts:46-50, também na tarefa), a medição com `opcoesDoAdaptador` e o plugin obrigatório.

🟡 1. Com a mudança do SDK, `apps/mobile/src/lib/armazenamento-aparelho.test.ts:134-144` ficou vermelho (o `u-vend-01` agora abre o SQLite). Troque o caso: `u-vend-01` sem tenant → `tipo: 'sqlite'`, arquivo `/^macuxi-u-h[0-9a-f]{32}-t-demo\.db$/`. A reserva `ids_invalidos` passa a ser `usuarioId: ''`. Rodei: 1 falha, 13 verdes.
🟡 2. Textos: `src/lib/armazenamento-aparelho.ts:98` (`ids_invalidos: 'usuário ou empresa sem id no formato UUID'`) → "sessão sem id de usuário". O comentário de `src/services/armazenamento.ts:10` ("ids fora do formato") → "sem id de usuário". O roteiro do A2 (§6) passa a valer também na demo: conferir no Diagnóstico que aparece "SQLite (macuxi-u-h…-t-demo.db)".
🟢 3. `src/state/plataforma.tsx:270`: se a sessão saiu ou trocou durante a abertura, a instância SQLite fica aberta no registro, porque `armazenamentoRef` ainda não foi gravado e o logout não a fecha. Não perde dado (o bloqueio fecha todas), mas sugiro `if (abertura.tipo === 'sqlite') void fecharArmazenamentoDoUsuario(abertura.arquivo)` antes do `return`, quando não há sessão ou ela é de outro usuário. O `fechar` esquece a instância de forma síncrona, então um login novo cria outra. Na mesma linha, comparar também `tenant?.id`.
🟢 4. Desvio do §5 aceito: `requestIdleCallback`, com `setTimeout` 0 de reserva, no lugar do `InteractionManager` obsoleto no RN 0.86. Registrado no adendo §10.
🟢 5. Logout sem esperar o sync no ar: aceito. O arquivo fecha, a escrita tardia falha, o item segue na `sync:fila` e o reenvio é idempotente pelo UUID do aparelho. As linhas e o cursor do pull entram juntos, então o estado não fica pela metade. Não precisa esperar N s.
🟢 6. `criarSistemaSqlite` (armazenamento-aparelho.ts:78) loga o nome do arquivo, que leva o UUID ou o hash do usuário. É um id pseudônimo, não um dado pessoal direto, então pode ficar. Se quiser, troque por "um dos bancos locais".

## O que preciso
Os 🟡 1 e 2 (os 🟢 ficam a seu critério), com o lint, o typecheck e o vitest do apps/mobile verdes.

## Pronto quando
Os testes do apps/mobile estão verdes com o SDK novo e o Diagnóstico da demo mostra SQLite. Depois disso, o A2 com o build liberado pelo gerente.
