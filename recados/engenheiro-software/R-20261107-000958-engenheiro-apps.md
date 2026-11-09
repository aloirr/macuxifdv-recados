---
id: R-20261107-000958-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0088
responde_a: R-20261106-231502-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-07T00:09:58-04:00
---
# T-0088 A1 pronto para revisão: shell do Campo e do Gestão sobre o SQLite (abrir, passagem, logout, bloqueio, medição)

## Contexto
A1 da T-0088 feito no working tree com a API da S1 (R-20261106-234003). Peço a revisão técnica (🔴/🟡/🟢). A2 (APKs de preview e roteiro do §6) fica para quando o gerente liberar o build.

## O que mudou (apps/mobile)
1. `src/lib/armazenamento-aparelho.ts` (puro): `criarSistemaSqlite(pasta, log)` (listar sem lançar; apagar registra e segue, para o bloqueio não parar num arquivo), `opcoesDoAdaptador(shell, log)` (as mesmas no motor e na medição: migrações, `entidadesAtivas(MODULOS)`, índices, `registrarErro`, `buscaSemEsperarIndexacao: true`), `forcarAsyncStorage`, `resumoDaAbertura`/`linhasDoArmazenamento` (Diagnóstico), `percentualDaPassagem`/`fraseDaPassagem` (tela de preparo) e `agendarSemPressa`.
2. `src/services/sqlite-expo.ts`: `listarBancosExpo()` (pasta `defaultDatabaseDirectory` do ExpoSQLite, que no Android é `<files>/SQLite` sem `file://`; sem ela, `Paths.document/SQLite`) e `apagarBancoExpoOuLancar` (`deleteDatabaseAsync`).
3. `src/services/armazenamento.ts`: `criarArmazenamentosDoAparelho` uma vez por processo (lazy); `abrirArmazenamentoDoUsuario({ usuarioId, tenantId, fuso, aoProgredir })` com o espelho `chaveEspelhoArmazenamento` no AsyncStorage; `fecharArmazenamentoDoUsuario(arquivo)`; `apagarBancosDoAparelho()`. `armazenamentoDoUsuario` (AsyncStorage) segue como origem e reserva.
4. `motor-do-usuario.ts`: `criarMotorDoUsuario` recebe `armazenamento` pronto.
5. `state/plataforma.tsx`: `abrirMotor` abre o armazenamento antes do motor (tenant = `sessao.tenant.id`, demo sem tenant), com a tela de preparo só se passar de 400 ms; `erro` → tela "Tentar de novo" (nunca AsyncStorage); sessão trocada no meio = não monta o motor; lease lido na mesma instância; logout fecha sem apagar depois de limpar a sessão; bloqueio: `apagarBancos` entre `motor.limparAparelho()` e a varredura das chaves (`lib/aparelho-bloqueado.ts`, fonte nova); `finalizar` agendado depois do `carregar`.
6. `services/segundo-plano.ts`: lease e motor da tarefa na mesma abertura (`abrirArmazenamentoDoUsuario`, com tenant e fuso da sessão guardada; memo por passada para a reserva não tentar a passagem duas vezes); bloqueio também apaga os bancos.
7. `app/_layout.tsx` + `components/preparo-aparelho.tsx`: "Atualizando os dados do aparelho…" e a tela de erro POR CIMA do Stack (o login que espera a abertura não desmonta); na abertura com sessão, no lugar da tela de abertura.
8. `app/profile.tsx`: Diagnóstico com o armazenamento (SQLite + arquivo + marcador, ou "AsyncStorage (reserva)" + motivo).
9. `app.config.ts`: plugin `expo-sqlite` (`enableFTS`) sem o `instalado()`; conferido no `expo config` das duas variantes.
10. Medição pelo caminho real: `app/diagnostico-carga.tsx` usa `opcoesDoAdaptador`; `lib/diagnostico-carga.ts` aceita `opcoesAdaptador` e mede a 1ª busca logo depois da reabertura do L-1 (com a opção: `indexando` sem esperar), que entra no relatório.

## Pontos para olhar
- **Desvio do §5**: no lugar do `InteractionManager.runAfterInteractions`, que está obsoleto no RN 0.86 (stub com aviso no console e remoção anunciada), usei o `requestIdleCallback`, que o próprio RN indica como substituto (`setTimeout` 0 sem ele). Se preferir o InteractionManager mesmo assim, troco.
- Logout com um sync no ar: o arquivo fecha depois de `fecharSessaoLocal`; uma escrita do motor que chegar depois falha, e o item segue na fila. No próximo login ele é reenviado, e a idempotência do servidor evita duplicar. Não esperei o sync terminar para o logout não ficar preso na rede. Se quiser, espero até N s.
- O resultado `asyncstorage` não fica guardado no SDK: na reserva, o app guarda a abertura no `armazenamentoRef` da sessão, e a tarefa guarda num memo por passada.

## Testes
`src/lib/armazenamento-aparelho.test.ts` (14 testes; regra do SDK + `criarSistemaSqlite` sobre uma pasta temporária + `node:sqlite`): escolha do §4 (sem SQLite, demo com id fora do formato, trava), passagem com 3 pedidos + 1 visita + rascunho + pull sem o lease, uma instância com 3 aberturas juntas e a passagem uma vez, logout que reabre sem recopiar, troca de usuário e tenant, bloqueio que apaga os bancos de 2 usuários (o `macuxi-diagnostico-carga.db` fica), remoção da origem só depois do sync, erro com espelho; mais as funções puras. `components/preparo-aparelho.test.tsx` (3), `aparelho-bloqueado.test.ts` (ordem com os bancos), `diagnostico-carga.test.ts` (1ª busca `indexando` com as opções do app). apps/mobile: eslint e tsc limpos, vitest 29 arquivos/257 testes, bundle Android campo e gestao verdes (2068 módulos), timers-sync ok.

## Pronto quando
Revisão sem 🔴. A2 depois do build autorizado pelo gerente.
