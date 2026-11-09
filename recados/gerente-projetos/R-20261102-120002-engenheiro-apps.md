---
id: R-20261102-120002-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:00:02-04:00
---
# T-0059 (typecheck do mobile, tela de carga com retomada, segundo plano da ADR 0017) e T-0060 item 6 (componente comum)

## Contexto
T-0059 (R-20261102-103858 + ADR 0017 §3) e T-0060 item 6 (RN-CORE-17). Sem build EAS hoje (o APK com isto sai no build de 03/11).

## O que preciso / o que mudou
1. **Typecheck do mobile destravado (R-103858)**: `tela-carga.test.tsx` com `carga: CARGA_VAZIA`. A tela de carga agora usa `estado.carga`: barra proporcional ao que já está gravado (`lib/carga.ts` `percentualDaCarga`: progresso do motor + fração da entidade em andamento pelas páginas, até 90% da fatia; carregando nunca mostra 100%), "Continuando de onde parou" no rótulo durante a retomada (`cargaRetomada`), frases do módulo em andamento primeiro (`frasesDaCarga(..., carga.modulo)`, o id nunca vai para a tela; promotor continua sem frase de pedido) e o aviso fixo "Mantenha o app aberto até terminar. Se ele fechar, continuamos de onde parou." (ADR 0017 §2).
2. **Segundo plano (ADR 0017 §3)**: dependências `expo-background-task` ~57.0.21 e `expo-task-manager` ~57.0.21 (direta, é a que define a tarefa) via `npx expo install --pnpm` (pnpm-lock acompanha o package.json do mobile); plugin `expo-background-task` no `app.config.ts`; `main` do app = `./index.ts` (`expo-router/entry` + definição global da tarefa).
   - `lib/segundo-plano.ts` (puro, 15 testes): `macuxi-sync-delta`, `minimumInterval` 15 min, orçamento 60 s (`parcial` ao estourar; o lease fica até vencer), `sync:lease` (dono único por execução, expira em 2 min). Nunca roda com modo sem sinal, sem sessão guardada, sem `sincronizado_em`, com sessão inválida (refresh falhou: só desiste, não faz logout) ou aparelho bloqueado (423 → limpeza RN-CORE-15 pelo Core e a tarefa se desliga). Rede: restrição CONNECTED do WorkManager + `sem-rede`.
   - `services/segundo-plano.ts`: `defineTask` no escopo global; app aberto no processo → usa o MESMO motor (`registrarAppAberto`); app fechado → monta o motor sem interface (`services/motor-do-usuario.ts`, extraído do plataforma.tsx: `criarMotorDoUsuario`, `consultarModulosEfetivos`, `trocarRefresh`, `dispositivoId`). Build sem o módulo nativo (APK atual) = no-op, sem quebrar.
   - `state/plataforma.tsx`: liga o agendamento quando há `sincronizado_em`, desliga no logout/bloqueio; `sincronizar()` respeita o lease (espera a passada do mesmo processo e relê o armazenamento com `carregar()`).
   - Perfil → Diagnóstico: "Última sincronização em segundo plano: <quando> · concluída/parcial/não rodou: <motivo> · <s>".
3. **T-0060 (RN-CORE-17)**: `packages/ui` com `EtiquetaCadastroIncompleto` e `ObservacoesCliente` no kit mobile e no web (pura em `src/comum/cadastro.ts`: `blocosDeObservacao` não repete a linha automática; 5 testes). Recado ao modulo-core com onde plugar (R-20261102-114206): carteira e Cliente 360 do app (Campo/Gestão) e do BKO são dele.

Arquivos: apps/mobile/{index.ts, package.json, app.config.ts, src/components/tela-carga(.test).tsx, src/lib/carga(.test).ts, src/lib/frases-carga(.test).ts, src/lib/segundo-plano(.test).ts, src/services/segundo-plano.ts, src/services/motor-do-usuario.ts, src/state/plataforma.tsx, src/app/profile.tsx}; packages/ui/src/{comum/cadastro(.test).ts, mobile/cliente.tsx, mobile/index.ts, mobile/puro.ts, web/cliente.tsx, web/index.ts}; pnpm-lock.yaml (só as 2 dependências do mobile).

Testes: mobile lint + typecheck + 109/109 (inclui segundo-plano 15, carga 12, frases 9, tela-carga 13); web typecheck + lint + 19/19; ui typecheck + lint + 48/48; bundle Android verde nas 2 variantes (a tarefa macuxi-sync-delta está no bundle); verificar sem violações. Atenção: um install de outro agente às 11:50 tirou do lock as 2 dependências do mobile; rodei pnpm install de novo e o lock voltou a tê-las (+44 linhas, só elas): o commit precisa levar apps/mobile/package.json e pnpm-lock.yaml juntos.

## Pronto quando
Pendências: (a) conferir no APK de 03/11 a tarefa rodando (o Android decide o momento; `triggerTaskWorkerForTestingAsync` só em debug), o tempo da carga inicial da demo e a entidade mais pesada; (b) modulo-core plugar a etiqueta e as Observações (eu reviso as telas depois); (c) build novo obrigatório: a dependência é nativa.
