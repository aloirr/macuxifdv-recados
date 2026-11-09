---
id: R-20261104-194741-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T19:47:41-04:00
---
# T-0076 (shell): Início pela referência no Campo e no Gestão, área segura e testes com e sem Vendedor

## Contexto
T-0076, passo 3 (engenheiro-apps): Início do shell pela referência aprovada, Campo e Gestão, e área segura. Retomada depois do desligamento do notebook; nada commitado (git é seu).

## O que fiz
- `apps/mobile/src/app/(tabs)/index.tsx`: Início na ordem da referência: boas-vindas (data, saudação do Core `saudacao` no fuso + primeiro nome, "N visitas hoje · M feitas") → Recados de hoje (`recados_hoje`, selo "N novos", tocar marca lida via `useNotificacoes().marcarLida` e navega; "Ver todos" → /m/notificacoes) → Meta de hoje (`meta_hoje`, `sem_realizado` → "Sincronize para ver as vendas") → slot `inicio.cards` → Gestão: Equipe agora (`cliente_nome`, `equipe_nome`) → no fim só o `BotaoSincronizar` ("Última sincronização hh:mm · N na fila"). Sai "Seus módulos", o SyncStamp do topo (hora duplicada) e o "Começar a rota". Puxar para baixo = Sincronizar; nenhum timer.
- `apps/mobile/src/components/inicio.tsx` (novo) e `apps/mobile/src/lib/inicio.ts` (novo, textos/tons puros): blocos BoasVindas, RecadosDeHoje, MetaDeHoje, EquipeAgora.
- `apps/mobile/src/components/extensoes-shell.tsx`: `CardsDoInicio` ordena por `ordem` (Gestor 10, Vendedor `pedidos-resumo` 20) e dá linha inteira a cada card (campo opcional local `largura: 'metade'` para pares, não usado hoje).
- Área segura: `apps/mobile/src/lib/area-segura.ts` + `components/area-segura.tsx`: no Android, `StatusBar.currentHeight` é o piso da faixa superior (o inset vinha 0 no APK e o "Olá"/Cliente 360 encostavam na barra).
- 🟢 3 do R-20261104-042956: `limparHistoricoDoShell()` no logout (`state/plataforma.tsx`), comentário ajustado em `lib/transicao-modulo.ts`.

## Testes (um comando por vez)
- vitest `src/components/inicio-tela.test.tsx`: 8 verdes (ordem da referência; sem "Seus módulos"/hora duplicada/"Começar a rota"; COM Vendedor os dois cards abaixo da Meta; SEM Vendedor somem sem erro; promotor sem card de pedido mesmo com Vendedor ativo, RN-PRO-01; Gestão com Pedidos para aprovar só com o Gestor, Equipe agora antes do Sincronizar). Os cards saem do `criarShell` real com os manifestos instalados.
- vitest `src/lib/inicio.test.ts` + `src/components/area-segura.test.tsx`: 26 verdes; `src/lib/transicao-modulo.test.ts`: 8 verdes.
- eslint dos 11 arquivos tocados: limpo. `tsc -p apps/mobile/tsconfig.json --noEmit`: limpo.
- `verificar engenheiro-apps`: só as 4 violações conhecidas de `.coord/recados/anexos/`.

## Pendências
- Bundle das duas variantes não rodado (regra desta retomada: sem comando pesado extra); rodar antes do build de 05/11.
- Revisão visual pedida ao designer-ux (linha "Última sincronização" centralizada como na referência depende do kit).
- Ainda em aberto na minha caixa (fora da T-0076): 🟢 1 e 2 do Dockerfile do BKO (R-20261104-042956) e R-20261103-235330 (vibração espera expo-haptics).

## Pronto quando
Revisão de UX sem 🔴 e CI verde no commit da rodada.
