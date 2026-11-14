---
id: R-20261113-211318-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T21:13:18-04:00
---
# CI main vermelho: demo-abas (Metas→Performance), pedidos-busca (card_orc) e t0140 (destinoDaNotificacao removido)

## Contexto
CI do main vermelho no run 43536088047 (a5d8f9ae), job "testes de integração (tests/)": 3 arquivos e 39 testes. O `//#typecheck:tests` também falha, no t0140. A causa vem toda do lote da v1.0.6 do PC (66b54013 Início novo, 8b790451 barra com Performance, c88c72f3 Pedidos com 3 cards). Nada veio da nuvem.

## O que preciso
1. `tests/modulos/demo-abas.test.ts:94-98` (D-C00). Erro: `vendedor: Metas: expected [ 'Rota', 'Clientes', 'Pedidos', …(2) ] to include 'Metas'`. A aba Metas saiu e a Performance entrou (modules/core/manifest.ts:12; página `performance`, modules/core/app/index.ts:47). Troque 'Metas' por 'Performance' no título e nas duas listas: vendedor `['Rota','Clientes','Performance','Pedidos']`, promotor `['Rota','Clientes','Performance']`. Atualize também `tests/plano/demo-matriz.md` (D-C00), se citar Metas.
2. `tests/modulos/pedidos-busca-t0077.test.ts:674`. O chip `orc_abertos` virou o card `card_orc` (RN-VEN-43; orders-screen.tsx:352). Troque por:
   `expect(TELA).toMatch(/\{atual === 'card_orc' \? <Chip testID="chip-card-orc"/);`
   Atenção à regra: `situacaoAoEscolherPeriodo` (modules/vendedor/app/lib/consulta-periodo.ts:77) ainda solta só `a_faturar` e `orc_abertos`. Com `card_orc` ou `card_env` ativos, escolher período mantém o card. Se o comportamento esperado é sair do card, o pedido vai ao modulo-vendedor; não deixe o teste esconder isso.
3. `tests/modulos/t0140-abertura-links.test.ts`: o import da linha 29 (`destinoDaNotificacao`, `recadosDoInicio` de apps/mobile/src/lib/inicio) não existe mais. O Início novo tirou os recados do Início e o shell não decide mais link. Daí vêm os TS2305 e TS7006 do typecheck:tests (linhas 29, 190-192, 207, 209) e o "is not a function" em B1 a B4. Hoje quem abre link é só o Core, e sempre pela regra única do SDK: notificacoes.tsx:22, recados-e-tarefas/balao-recados-e-tarefas.tsx:29 e recados-e-tarefas/tela-recados-e-tarefas.tsx:34, todos com `linkInternoNavegavel(..., (c) => visao.pagina(c) !== null)`. Correção:
   - tire `destinoDaNotificacao` e `recadosDoInicio` do import da linha 29;
   - B1: `const destino = linkNavegavel(link, telaExiste) ?? '/m/notificacoes';` no lugar de `shell`, mantendo as asserções do `if (core)`;
   - B2: fica só a linha do `caminhoDoLink(l) === null` ⇔ `linkNavegavel(l) === null`;
   - B3: troque `destinoDaNotificacao(x, f)` por `linkNavegavel(x, f) ?? '/m/notificacoes'`;
   - B4: substitua por um teste de fonte que confirme as três telas do Core acima com `linkInternoNavegavel(` e `visao.pagina(c) !== null`, e que nenhum arquivo de `apps/mobile/src` tenha cópia própria da regra;
   - atualize o título do describe ("Core e balão = regra do SDK") e o cabeçalho do arquivo.

## Pronto quando
`pnpm test` dos tests/ (sem os .db) e `pnpm typecheck:tests` estão verdes no PC. A correção é feita no PC (árvore trabalho/v1.0.6), e não cabe à nuvem porque os arquivos de origem estão no lote local.
