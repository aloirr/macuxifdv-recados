---
id: R-20261111-085420-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T08:54:20-04:00
---
# T-0118 (D-T0107a) conferida na v1.0.4: sem 2ª conexão nova; pool com espera de 10 s e 503 BANCO_OCUPADO no lugar da fila sem prazo

## Contexto
T-0118 (D-T0107a), conferência da v1.0.4 (doc 05, quarta 11/11). A causa original (ctx.carteira()/usuariosVisiveis() pedindo 2ª conexão dentro de ctx.comTenant no push do pedido) já estava corrigida no lote 01 (transação corrente por AsyncLocalStorage + guarda MACUXI_GUARDA_CONEXAO). Refiz a varredura com o que entrou depois: ContextoConsulta.consultar aninhada (T-0149) roda no MESMO db da transação (outbox.ts, consultarComo); pg_advisory_xact_lock do push espera no banco, não no pool; receberPedidos abre uma transação por item, em série; instanteSync roda depois das gravações; ctx.email/pacotes/aposConfirmar não pedem conexão. Nenhum ponto novo pede 2ª conexão; nada a corrigir no Vendedor nem no Core.

Faltava a rede de segurança: o pool da API (servidor.ts) não tinha connectionTimeoutMillis. Pool cheio (carga acima do MACUXI_API_POOL, ou um defeito novo em produção, onde a guarda só avisa) deixava a requisição na fila do pg-pool SEM PRAZO: é o "trava".

## O que fiz (aditivo, só apps/api)
- apps/api/src/banco.ts: esperaDoPoolMs (MACUXI_API_POOL_ESPERA_MS, padrão 10 s, nunca 0) e esperaDoPoolEsgotada (erro do pg-pool, direto ou como causa).
- apps/api/src/servidor.ts: pools app e portal com connectionTimeoutMillis: esperaDoPoolMs().
- apps/api/src/app.ts (tratador de erro): espera vencida = 503 BANCO_OCUPADO, Retry-After: 2, log warn. A transação de fora é desfeita pelo comTenant; o motor do aparelho reenvia o lote (5xx no push), idempotente.
- docs/desenho/T-0118.md: seção "Conferência da v1.0.4".

## Testes
- apps/api/test/espera-pool.test.ts (sem banco, 4 casos): variável; mensagem do pg-pool INSTALADO (pool real com cliente falso); rota com 2ª conexão dentro da transação e guarda em aviso (como produção) = 503 na espera e pool usável depois; pool ocupado por carga = 503.
- apps/api/test/conexao-na-transacao.banco.test.ts (CI): +2 casos — 6 pushes NOVOS simultâneos com pool 2 e a guarda em modo ERRO (critério 1: nenhum ponto do push pede 2ª conexão) e pool cheio de verdade (1 conexão presa, espera 300 ms) = 503 BANCO_OCUPADO, nada gravado, reenvio aceito.
- tsc e eslint do apps/api: 0. vitest espera-pool + transacao-corrente: 11/11 (o .banco.test só no CI).

## Pendências / para o ensaio
- Prova com Postgres só no CI: conexao-na-transacao.banco.test.ts e o caso 6 da carga T-0107 (tests/carga/t0107, já usa connectionTimeoutMillis 10 s no pool de teste). Critério 2 (p95 do push de 100 pedidos) segue medido pela carga T-0107 no ensaio.
- MACUXI_API_POOL_ESPERA_MS é opcional (padrão 10 s); compose de produção/demo não precisa mudar.
- verificar engenheiro-software: a única violação é .vscode/settings.json (sem dono; não é meu, já estava na árvore).
- Sem commit (regra da rodada).
