---
id: R-20261102-123651-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:36:51-04:00
---
# T-0064 itens 4 e 5: área segura no shell (todas as telas) e useAtualizacaoAutomatica no packages/ui; troca nas telas com o modulo-vendedor

## Contexto
T-0064, itens 4 (R-20261102-111044) e 5 (R-20261102-111438), vaga de correção do teste de campo. Respostas ao dono do produto sem encerrar: R-20261102-123341 e R-20261102-123407 (engenheiro-apps).

## O que fiz
**Item 4, área segura (fechado no shell, vale para todas as telas do Campo e do Gestão):**
- `apps/mobile/src/components/area-segura.tsx` (novo): `AreaSeguraSuperior` envolve o Stack em `apps/mobile/src/app/_layout.tsx`. Desenha a faixa da barra de status com o fundo do app e repassa às telas `SafeAreaInsetsContext` com `top: 0`: o `Screen` do `@macuxi/ui` e as telas que somam `insets.top` (detalhe do pedido, novo pedido, ficha do cliente) passam a começar abaixo da barra e nada rola por baixo dela. A borda de baixo não muda.
- `apps/mobile/src/lib/area-segura.ts` (novo, puro), mais `apps/mobile/src/app/login.tsx`: `keyboardVerticalOffset` com a faixa (o KeyboardAvoidingView mede a posição relativa ao pai).
- Efeito visual: o respiro do topo cresce cerca de 12 px nas telas que usavam `insets.top + 4` ou `+16` (fica faixa + 16/28). Limpeza opcional pedida ao modulo-vendedor.

**Item 5, atualização do Gestão (parte do packages/ui pronta; troca nas telas pendente com o dono):**
- `packages/ui/src/mobile/atualizacao.ts` (puro, também em `@macuxi/ui/mobile/puro`): `criarAgendadorAtualizacao`, `intervaloAtualizacaoMs` (`gestor_atualizacao_auto_min`, padrão 5, faixa 1 a 60), `rodapeAtualizacao` ("Atualizado às hh:mm · puxe para atualizar").
- `packages/ui/src/mobile/atualizacao-hook.ts`: `useAtualizacaoAutomatica({ atualizar, intervaloMin, tz, ativo })` → `{ puxando, puxar, atualizadoEm, rodape }`. Só roda com a tela em foco e o app em primeiro plano; ao voltar, faz 1 consulta se o intervalo já passou; o puxar atualiza na hora; nunca roda duas consultas juntas; a automática não liga o indicador.
- Causa no módulo Vendedor (travado, #44): `setInterval` de 10 s em `order-detail-screen.tsx:66` e de 60 s em `orders-screen.tsx:36`, mais `refreshing={refreshing || sync.running}` (o indicador girando o tempo todo). Pedido ao modulo-vendedor: R-20261102-122933. Ao modulo-gestor (telas após o #40): R-20261102-122937.

## Testes
- `apps/mobile`: 113 verdes (novo `src/components/area-segura.test.tsx`, 4 casos); tsc e eslint verdes.
- `packages/ui`: 57 verdes (novo `src/mobile/atualizacao.test.ts`, 9 casos com relógio simulado: 1 consulta a cada 5 min, nenhuma fora de foco ou em segundo plano, puxar na hora com indicador, silenciosa, parâmetro do tenant); tsc mobile/web e eslint verdes. Uma rodada sob carga teve 1 falha transitória que não se repetiu em 4 rodadas.
- Bundle Android: Campo verde (12:31). Gestão não rodou: `expo-background-task` (ADR 0017, já no package.json) sumiu do node_modules depois que o lockfile voltou ao HEAD. Não é do código desta tarefa; o bundle volta depois da regeneração do lockfile na etapa 2 + install. Não rodei pnpm install.
- `node scripts/coord.mjs verificar engenheiro-apps`: OK, nenhuma violação.

## Pendências
1. modulo-vendedor (após o #44): adotar o hook na lista e no detalhe e tirar o sync do `refreshing` (R-20261102-122933).
2. gerente-projetos: parâmetro `gestor_atualizacao_auto_min` na tabela de parâmetros do doc 03. Combinar com o engenheiro-software se o Vendedor lê por `parametros('gestor')` ou se o parâmetro também vem em `parametros('vendedor')`.
3. Bundle do Gestão, e de novo do Campo, depois do lockfile da etapa 2. Prints no APK de 03/11.
