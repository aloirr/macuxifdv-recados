---
id: R-20261031-200850-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T20:08:50-04:00
---
# Onda 3 do engenheiro: RN-CORE-15 no shell, T-0008 P3+P5, revisões T-0013 e T-0021 sem 🔴

Contexto: Sprint 1, onda 3 do engenheiro (desenho T-0016 §8/§9) + revisões T-0013 e T-0021 + pedidos da caixa.

| O que fiz:
1. RN-CORE-15 no shell: apps/mobile/src/lib/aparelho-bloqueado.ts (+ .test.ts, 5 casos com o motor real e o tratarAparelhoBloqueado do Core); ligado em apps/mobile/src/state/plataforma.tsx no login, no refresh e em QUALQUER chamada (ApiClient ganhou aoErroHttp em services/api.ts — já cobre o corte imediato do O-5 quando o autenticar do Core responder 423). Apaga motor.limparAparelho + chaves macuxi:u:*/fv:u:* de todos os usuários + pasta fotos/ (services/arquivos.ts) + tokens + sessão; aviso no banner login.aparelho-bloqueado (app/login.tsx). Mantém fv:dispositivo (senão o bloqueio seria contornado), servidor e código da empresa.
2. T-0008 P3 + P5 (sem build EAS): packages/platform-sdk/src/sqlite/{driver,driver-node,esquema,armazenamento,index}.ts, src/busca.ts, src/busca-tipos.ts; subcaminho @macuxi/platform-sdk/sqlite-node; motor.buscar e busca.finalizar no fim do sync; definirModuloShell com migracoesAparelho/indicesBusca validados no criarShell. Suíte do motor nos 3 adaptadores (memória, linhas, SQLite); suíte do adaptador; índice de teste nos 3 adaptadores com o mesmo conjunto; entradas hostis; RN-CORE-02 apaga a FTS e recria na reativação; teste de grafo (nada de node:* a partir do índice do SDK). Medição local: 20 mil SKUs com índice 3,1 s, rebuild 0,14 s, busca p95 8,7 ms. ADR 0003 adendo "P3 e P5"; desenhos T-0008 e T-0016 com andamento. Pedido P2 ao banco-dados (R-20261031-193647: docs/banco/aparelho-sqlite.md + modules/catalogo/db/aparelho.ts).
3. Revisão T-0013 (Conector): sem 🔴; 3 🟡 e 4 🟢 ao Alexandre para a sessão da T-0023 (R-20261031-193859 + correção de linhas R-20261031-193920); modulo-integracao respondido e encerrado.
4. Revisão T-0021 (Catálogo): sem 🔴; 3 🟡 (fuso como parâmetro do módulo; setTimeout no domínio; sync de preço/estoque ao promotor — a peça variacaoEscopo do ProvedorSync é minha, com a tarefa da API do Catálogo) e 3 🟢 (R-20261031-194449). Espelho atualizado: manifestos-referencia.test.ts (admin + 7 ações) e .coord/contratos/modulos.md.
5. Caixa: lockfile conferido e encerrado (R-20261031-194518: só inserções; frozen-lockfile ok; next build verde); apps/api/test/sync.test.ts caso 501 com indicador_diario (pedido do core); UsuarioAmbiente.fuso no SDK + shell (fuso do tenant para o core, RN-CORE-11); decisão: demo (mock-api) não cobre mais carteira/rota/visita do Core — para o backlog.

| Testes: platform-sdk 243/243, mobile 19/19, api 84/84; typecheck da raiz 19/19; lint dos meus pacotes verde; pnpm fronteiras sem violação; verificar engenheiro-software OK. Raiz NÃO está toda verde por causa do @macuxi/core (2 testes e 1 erro de lint em arquivos que mudavam durante a rodada — aviso R-20261031-200820). Pendências: P4/P7 (build EAS), P2 (banco-dados), P6 (testes); revisão do Gestor (T-0014) quando entrar na fila; core.checkin.raio_m pelo ambiente na T-0020; turbo conector#test sem cache quando a T-0023 chegar.

| Pronto quando: gerente confirma; commit depois do core verde.
