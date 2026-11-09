---
id: R-20261102-142625-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:26:25-04:00
---
# T-0065 (A) app/BKO: Sincronizar, agendador sync_auto_min, puxar = Sincronizar, fila com espera crescente e push; falta o lote (expo-notifications) e o novidades do SDK

## Contexto
T-0065 (A), RN-CORE-23: parte do engenheiro-apps (vaga de correção). Segue o R-20261102-121135, o 124413 e o 124628; o R-123955 foi cancelado e encerrado.

## O que fiz
1. **Agendador único do app.** Fica em `packages/ui/src/mobile/atualizacao.ts` (`criarAgendadorSync`, puro e com relógio injetado) e `packages/ui/src/comum/sincronizacao.ts`:
   - `PARAMETRO_SYNC_AUTO = 'sync_auto_min'`: padrão 30, mínimo 15, teto de segurança de 1 dia;
   - volta ao primeiro plano: sincroniza se faz 30 min ou mais;
   - proteção do puxar: 30 s.
   Ele sincroniza ao abrir o app, ao voltar depois de 30 min e a cada `sync_auto_min` com o app ativo e com sinal. O aviso do servidor (push) sincroniza na hora só as entidades indicadas. Puxar e botão fazem a sincronização completa, com proteção de 30 s ("Atualizado há instantes"). Sincronização que falha espera o intervalo inteiro, sem laço quando não há sinal. Nada roda em segundo plano.
2. **`useAtualizacaoAutomatica`** (`packages/ui/src/mobile/atualizacao-hook.ts`): agora dispara o MOTOR pelo agendador do shell, não uma consulta própria. O `atualizar` virou só a releitura local e roda depois de cada sincronização concluída (automática, push ou puxar). Os parâmetros antigos `intervaloMin` e `ativo` são aceitos e ignorados, para não quebrar os PRs da nuvem.
3. **`BotaoSincronizar` e `SincronizacaoProvider`** (`packages/ui/src/mobile/sincronizacao.tsx`): o botão mostra "Última sincronização hh:mm · N na fila", com fila e fotos pendentes. Está no Início (`apps/mobile/src/app/(tabs)/index.tsx`) e no Perfil (`apps/mobile/src/app/profile.tsx`), e as duas telas também têm puxar para baixo = Sincronizar. Vale para Campo e Gestão.
4. **Shell** (`apps/mobile/src/state/plataforma.tsx`): saíram o `setInterval` de 15 min e o reenvio fixo de 15 s. No lugar:
   - o agendador, com o sinal e o `sync_auto_min` lido em `motor.parametros('core')`;
   - o reenvio da fila só com item pendente e espera crescente (15 s → 5 min, `apps/mobile/src/lib/fila-reenvio.ts`), sem pull.
   A atualização leve usa `motor.sincronizarNovidades({ entidades })` quando o SDK tiver. Até lá, faz `atualizarModulos` + `motor.sincronizar()`, que é incremental por cursor.
5. **Push** (`apps/mobile/src/services/push.ts`, `apps/mobile/src/lib/push.ts`, `apps/mobile/src/components/sincronizacao-do-shell.tsx`, `apps/mobile/index.ts`):
   - permissão, canal "Avisos" e token do Expo (projectId do EAS), registrado em `PUT /v1/dispositivos/atual/push` (rota do Core que já existe), de novo a cada 7 dias ou quando o token muda, e esquecido no logout;
   - push recebido com o app aberto → agendador.aviso(entidades);
   - toque → abre `data.link` (só rota interna) ou `/m/pedido?id=<pedido_id>`;
   - silencioso com o app fechado ou em segundo plano → tarefa `macuxi-push-sync`, que roda a passada do ADR 0017;
   - sem módulo nativo ou sem Firebase: tudo vira no-op.
   `app.config.ts`: plugin `expo-notifications` (ícone monocromático, cor de destaque, canal `avisos`) e `android.googleServicesFile` só se `GOOGLE_SERVICES_JSON` existir. Ninguém leu nem commitou o google-services.json.
6. **BKO:** `apps/web/lib/queries.ts` `LIVE_REFETCH_MS` = 30 min (`intervaloSyncAutoMs`), e Auditoria com botão "Atualizar".
7. `apps/mobile/package.json`: `"expo-notifications": "~57.0.0"`. Não rodei pnpm install.

## Testes
- packages/ui: tsc web e mobile verdes, eslint verde, 63 testes verdes; `atualizacao.test.ts` tem 15 casos com relógio simulado (abertura, 30/15 min, volta, sem sinal, falha sem laço, puxar e proteção de 30 s, puxar durante a automática, aviso com entidades).
- apps/mobile: eslint verde e 122 testes verdes; novos: `push.test.ts` (7) e `fila-reenvio.test.ts` (2). O typecheck só falha em `src/services/push.ts`, porque expo-notifications ainda não está no node_modules (4 erros, todos por isso).
- apps/web: tsc, eslint e 19 testes verdes.
- Bundle das variantes NÃO rodado: o Metro não resolve `require('expo-notifications')` antes do lote. Rodo logo que o lote entrar.
- `verificar engenheiro-apps`: OK, sem violação.

## Timers fora dos meus caminhos (recados enviados)
- modulo-vendedor (R-20261102-141509):
  - `modules/vendedor/app/state/use-vendedor.ts:55` e `:151`: `INTERVALO_SYNC_MS` de 20 s;
  - `modules/vendedor/app/screens/orders-screen.tsx:22` e `:38`: `POLL_GESTAO_MS` de 60 s com setInterval;
  - `modules/vendedor/app/screens/order-detail-screen.tsx:68`: setInterval de 10 s;
  - `modules/vendedor/web/lib/queries.ts:16`: `LIVE_REFETCH_MS` de 10 s, nas linhas 53, 65 e 87.
- modulo-core (R-20261102-141455): `refetchInterval: 300_000` em `modules/core/web/lib/queries.ts:87`, `visitas-page.tsx:61` e `indicadores-page.tsx:31`. Também mandei o formato do push (`data.entidades`, `data.link`; silencioso sem title/body).
- modulo-gestor (R-20261102-141539): nada no local; conferir o PR #40.
- engenheiro-software (R-20261102-141436): expo-notifications no lockfile, `motor.sincronizarNovidades`, `sync_auto_min` nos parâmetros do Core e exceções para a varredura do CI.

## Pendências e riscos para as 22h
1. Lote com expo-notifications. Sem ele, o typecheck de mobile fica vermelho e o bundle não fecha. Se o lote não entrar a tempo, a saída é tirar o `import './src/services/push'` de `apps/mobile/index.ts`, o `ouvirPush`/`registrarPush` de `sincronizacao-do-shell.tsx` e o plugin. Eu faço em 5 min, se você pedir.
2. `sincronizarNovidades` no SDK. Sem ele, a automática a cada 30 min faz a sincronização incremental completa, e não "1 requisição sem mudança".
3. Push de pedido no servidor (modulo-core) e credenciais FCM no EAS (Alexandre).
4. Os 3 pedidos antigos de T-0026 na minha caixa (090915, 090919, 091336) foram atendidos na T-0059. Não os encerrei nesta vaga.
