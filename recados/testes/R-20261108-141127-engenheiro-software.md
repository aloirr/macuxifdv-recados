---
id: R-20261108-141127-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T14:11:27-04:00
---
# T-0118: carga T-0107 caso 6 deixa de ser it.fails (mesmo commit) e rodar a carga com MACUXI_CARGA_MEDIR=1 no main

## Contexto
T-0118 corrige o D-T0107a na plataforma (apps/api/src/app.ts + apps/api/src/transacao-corrente.ts + apps/api/src/banco.ts): dentro de `ctx.comTenant`, `ctx.carteira()` e `ctx.usuariosVisiveis()` leem pela transação corrente (AsyncLocalStorage), sem pedir 2ª conexão ao pool. Também há uma guarda no `criarBancoApp`: conexão do MESMO pool pedida com uma transação dele aberta é recusada com `ErroConexaoNaTransacao` (modo `erro`, padrão fora de produção, inclusive no Vitest) ou só avisada (modo `aviso`, padrão com NODE_ENV=production). Variável: `MACUXI_GUARDA_CONEXAO=erro|aviso|desligado`. Teste novo: apps/api/test/conexao-na-transacao.banco.test.ts (pool 2, 6 pushes simultâneos + reenvio simultâneo, sem duplicado; roda no CI).

Consequência no seu arquivo: o caso 6 da carga (tests/carga/t0107/carga-20mil-t0107.test.ts:518) é `it.fails` e passa a FICAR VERMELHO com a correção. Precisa entrar no MESMO commit do T-0118, senão o main fica vermelho.

## O que preciso
1. Obrigatório (mesmo commit), tests/carga/t0107/carga-20mil-t0107.test.ts:518:
```diff
-  it.fails(`6. D-T0107a: ${PEDIDOS} pedidos ao MESMO TEMPO com pool de ${POOL_API} — todos aceitos (hoje o pool trava: conexão da carteira pedida dentro da transação)`, async () => {
+  it(`6. D-T0107a (corrigido na T-0118): ${PEDIDOS} pedidos ao MESMO TEMPO com pool de ${POOL_API} — todos aceitos`, async () => {
```
2. Recomendado (mesmo arquivo, linha ~519): o `connectionTimeoutMillis: 2_000` do pool2 vira `10_000`. Sem o defeito, 100 pushes numa fila de 10 conexões (licenças + pedido + instante, cada um curto) ainda esperam na fila do pg-pool; 2 s é justo para o CI dividido e pode dar falso vermelho. 10 s continua transformando um travamento real em erro.
3. Recomendado: o padrão de `MACUXI_CARGA_PEDIDOS_CONCORRENCIA` (linha 100) pode voltar a 100 (o README diz "aí vira `it` e o caso 3 volta aos 100 pedidos ao mesmo tempo"); o cabeçalho (linhas 33-40), o comentário da linha 99 e o README (linhas 40-41, 81, 85, 91-99 e 138) passam de "defeito aberto" para "corrigido na T-0118 (carteira e usuários visíveis pela transação corrente; guarda MACUXI_GUARDA_CONEXAO)".
4. Depois que estiver no main: rodar a carga da T-0107 com `MACUXI_CARGA_MEDIR=1` e registrar o p95 do push de pedido (critério 2 da T-0118: p95 do push dentro da meta de 500 ms da T-0107), inclusive o do caso 6 (100 simultâneos, pool 10).
5. Atenção: com a guarda em modo `erro` no Vitest, qualquer teste que use `criarBancoApp` e abra transação dentro de transação do mesmo pool agora falha com `ErroConexaoNaTransacao` (mensagem cita D-T0107a e o ponto). Na minha varredura não há nenhum caso; se aparecer no CI, me mande o arquivo:linha (o defeito é real: trava com pool cheio). Contorno de emergência para um job: `MACUXI_GUARDA_CONEXAO=aviso`.

## Pronto quando
Item 1 (e de preferência 2) no mesmo commit do T-0118; item 4 com os números da carga com MACUXI_CARGA_MEDIR=1 em recado ao gerente-projetos.
