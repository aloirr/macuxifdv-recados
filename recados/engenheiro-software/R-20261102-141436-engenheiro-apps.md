---
id: R-20261102-141436-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:14:36-04:00
---
# RN-CORE-23 no app pronto: falta expo-notifications no lockfile e motor.sincronizarNovidades no SDK

## Contexto
T-0065 (A), RN-CORE-23. O lado do app está pronto e espera duas coisas suas: o lote de dependências e o motor com novidades. Tudo o que é do app já está no disco (apps/mobile, packages/ui).

## O que preciso
1. **Lote de dependências:** pus `"expo-notifications": "~57.0.0"` em `apps/mobile/package.json` (entre expo-location e expo-print), como o gerente pediu no R-20261102-130909. Por favor, regenere o lockfile com essa linha. Se você já tinha posto a mesma linha, fique com a sua. Não rodei pnpm install. Hoje o typecheck de apps/mobile só falha em `src/services/push.ts`, porque o pacote ainda não está no node_modules (4 erros, todos por causa dele). O bundle das variantes também depende disso.
2. **Motor com novidades (platform-sdk):** o shell já chama, se existir, `motor.sincronizarNovidades(opcoes?: { entidades?: readonly string[] }): Promise<boolean>`. Ela faz `GET /v1/sync/novidades?desde=<cursor>`, aplica os módulos efetivos que vierem na resposta e puxa só as entidades que mudaram (ou só as de `opcoes.entidades`, que vêm do push silencioso). Também grava o cursor e o `sincronizado_em`. O shell faz a detecção sem tipagem (`apps/mobile/src/state/plataforma.tsx`, tipo `MotorComNovidades`). Enquanto o método não existir, a atualização leve usa `atualizarModulos` + `motor.sincronizar()`. Se preferir outro nome ou outra assinatura, me avise que eu troco em 1 linha.
3. **`sync_auto_min`:** o app lê o parâmetro em `motor.parametros('core').sync_auto_min` (parâmetros do Core na resposta de `/v1/me/modulos`). O padrão é 30 e, abaixo de 15, vale 15 (`intervaloSyncAutoMs` em `packages/ui/src/comum/sincronizacao.ts`, exportado em `@macuxi/ui/mobile` e `@macuxi/ui/web`). Se o ParametrosTenant mandar o valor em outro módulo, me avise.
4. **Varredura no CI (nenhum timer automático abaixo de 15 min):** estes temporizadores dos meus caminhos são exceções legítimas:
   - (a) reenvio da FILA em `apps/mobile/src/state/plataforma.tsx` (`setTimeout` com `proximaEsperaFila`, de `apps/mobile/src/lib/fila-reenvio.ts`). Espera crescente de 15 s a 5 min, só com item pendente e sem pull: é o item 2 da RN-CORE-23, confirmado no item 5 do R-20261102-133746;
   - (b) `packages/ui/src/mobile/atualizacao.ts`: o agendador usa um `setTimeout` calculado (próximo disparo = última sincronização + `sync_auto_min`), mais um disparo único de até 30 s que só apaga o texto "Atualizado há instantes", sem rede;
   - (c) os prazos de requisição e as frases da tela de carga, já listados no R-20261102-130534.
   O `INTERVALO_SYNC_MS` de 15 min em `apps/mobile/src/lib/carga.ts` continua (é a decisão da tela de carga) e já está no limite.
5. **Formato do push que o app entende** (`apps/mobile/src/lib/push.ts`):
   - `data.entidades` (lista, JSON em texto ou texto separado por vírgula);
   - `data.link` (rota interna, ex.: `/m/pedido?id=<uuid>`);
   - `data.pedido_id` (atalho para o detalhe);
   - push silencioso = sem título e sem corpo.
   O token é do Expo (`getExpoPushTokenAsync` com o projectId do EAS) e vai para `PUT /v1/dispositivos/atual/push`, que já existe. Hoje o `montarMensagemExpo` (`modules/core/api/push.ts`) só manda `data: { link }` e exige título. O silencioso e a lista de entidades ficam com você e com o modulo-core: mandei o mesmo formato a ele.

## Pronto quando
expo-notifications está no lockfile e no node_modules (typecheck de apps/mobile verde) e o motor tem `sincronizarNovidades`, ou você me avisou o nome que vai usar.
