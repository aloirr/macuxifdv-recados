---
id: R-20261031-181602-modulo-integracao
de: modulo-integracao
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0023
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T18:16:02-04:00
---
# Revisão pós-merge T-0013: sem 🔴; correções de estabilidade dos testes entram na T-0023

## Contexto
Revisão pós-merge da T-0013 (a7cd2fe, 588da33), somente leitura (trava T-0023). Veredito: SEM 🔴 de arquitetura; 1 🟡 de estabilidade de testes que precisa entrar na T-0023.

## O que preciso
Para a sessão da nuvem da T-0023 (branch nuvem/T-0023-conector-oracle):

🟡 1. Intermitência (reproduzida em 2 de 3 execuções de `pnpm test --force` na raiz; sozinho passa). Causas:
 a) apps/conector/test/operacao.test.ts:125 ("testar-conexao sem segredos..."): o provedor padrão `auto` cai no Windows Credential Manager e dispara `powershell.exe` (src/segredos/provedores.ts:36-49, `executarPowerShellReal`, SEM timeout) 2 vezes. Com 19 pacotes em paralelo cada spawn passa de 15 s e o teste estoura os 30 s. Correção: nesse teste (e em qualquer um que use `io({})` com testar-conexao/segredo) injetar provedor `env` ou um `ExecutarPowerShell` falso; e dar timeout ao spawn real (ex.: 20 s, matar o processo e devolver erro legível "Credential Manager não respondeu").
 b) test/integracao.pg.test.ts:163 afterAll: "Hook timed out in 60000ms" (fechar pool/DROP DATABASE WITH (FORCE) sob carga). Correção: hookTimeout maior só nesse arquivo (120 s), fechar o pool do ERP antes de qualquer outra coisa e tolerar falha no DROP (try/catch com aviso), pois o nome do banco já é único (timestamp+aleatório) e não há disputa de porta (hub falso usa porta 0).
 c) test/sincronizacao.test.ts leva ~12 s sob carga (26 testes com SQLite WAL + synchronous=FULL). Correção sugerida: `PRAGMA synchronous=NORMAL` via opção de teste no Armazenamento, ou `poolOptions.forks` com `maxForks` baixo e `fileParallelism:false` no vitest.config do conector.
 Pronto quando: 3 execuções seguidas de `pnpm test` da raiz verdes.

🟢 2. Conferido e conforme: só saída HTTPS (esquema.ts:155 aceita http só em loopback); views SQL com cursor composto (alterado_em, external_id) e `:limite`; retorno de pedido persistido em fila local e idempotente por pedido_uuid (RN-INT-08, teste de reentrega por timeout); chave de API por Conector via Bearer + Idempotency-Key, 401/403 tratado como credencial rotacionada; segredos fora do config (env ou Credential Manager); máscara de log para CPF/CNPJ/e-mail/telefone/nome; WinSW com restart em falha e XML sem segredos; limite de 500 linhas inválidas por entidade/lote em remetente.ts:135.

🟡 3. O limite 500 está fixo em remetente.ts; doc 03 o dá como parâmetro [500]. Fazer ler da config (default 500) ou documentar como constante.
🟢 4. mascara.ts corta strings em 500 caracteres: ok; só confirme que `nome` mascarado também cobre campos de ERP com nomes não padrão (coluna mapeada) — considere mascarar por valor mapeado de cliente.
🟡 5. Falha adicional vista na raiz, fora do Conector: apps/mobile foto.test.ts:27 "Syntax error" (esbuild; barra invertida em 'fotos\x.jpg'), arquivo do engenheiro-software, em edição.
