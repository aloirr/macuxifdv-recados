---
id: R-20261102-130534-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:05:34-04:00
---
# T-0065 (A) / T-0064 item 5: hook com atualizacao_auto_min (3 a 60, padrão 5), BKO a 5 min e lista de timers

## Contexto
T-0064 item 5 / T-0065 (A), pedido R-20261102-123955 (RN-CORE-23, doc 03 seção 3). Vaga de correção.

## O que fiz
1. `packages/ui/src/mobile/atualizacao.ts`: `PARAMETRO_ATUALIZACAO_AUTO` = `'atualizacao_auto_min'` (era `gestor_atualizacao_auto_min`); faixa 3 a 60 (`ATUALIZACAO_AUTO_MIN_MIN` = 3), padrão 5. Abaixo de 3 vale 3 (1, 2, 0,1, 2,99 → 3 min); inválido, ausente, 0 ou negativo → padrão 5; acima de 60 → 60.
2. `packages/ui/src/mobile/atualizacao-hook.ts`: só os comentários (exemplo de uso com `parametros.atualizacao_auto_min`). O resto do hook não mudou: silencioso, puxar na hora, nada em segundo plano nem fora de foco, rodapé com a hora.
3. `packages/ui/src/mobile/atualizacao.test.ts`: faixa 3 a 60 nos casos do intervalo e 1 teste novo com relógio simulado ("parâmetro de 1 min vale 3 min: no máximo 1 consulta a cada 3 min").
4. `apps/web/lib/queries.ts`: `LIVE_REFETCH_MS` passou de 10 s para 5 min (RN-CORE-23). É o único `refetchInterval` do shell BKO e é usado só por `useAuditoria` (página Auditoria). O React Query não refaz a consulta com a aba fora de foco.

## Timers que conheço (shell mobile, BKO e packages/ui)
- `apps/mobile/src/state/plataforma.tsx` `SYNC_AUTOMATICO_MS` = `INTERVALO_SYNC_MS` (`apps/mobile/src/lib/carga.ts`) = 15 min: sync completo periódico, só com o app em primeiro plano. Fica como está (≥ 3).
- `apps/mobile/src/state/plataforma.tsx` `RETENTAR_FILA_MS` = 15 s: reenvia a fila de saída só quando há item pendente e o app não está em modo sem sinal. Não consulta o servidor por novidades; é o envio do que o vendedor fez. Mantive. Se o gerente ou o Alexandre entenderem que entra na RN-CORE-23, o R-20261102-124628 ("fila com envio automático e retentativa") trata isso no motor do engenheiro-software.
- `apps/mobile/src/lib/segundo-plano.ts` `INTERVALO_MINIMO_MIN` = 15 min (expo-background-task, ADR 0017). Fica como está.
- `packages/ui/src/mobile/atualizacao.ts`: agendador do hook, 3 a 60 min, padrão 5.
- `apps/web/lib/queries.ts` `LIVE_REFETCH_MS`: 10 s → 5 min (corrigido).
- Fora da regra (não consultam o servidor periodicamente): frases da tela de carga a cada 3,5 s (`apps/mobile/src/lib/frases-carga.ts`); fechamento dos toasts do BKO em 6 e 10 s (`packages/ui/src/web/overlay.tsx`); prazos de requisição de 8 s e 12 s (`apps/mobile/src/lib/servidor.ts`, `services/device.ts`, `services/api.ts`); prazo de 60 s e lease de 2 min da tarefa de segundo plano (`apps/mobile/src/lib/segundo-plano.ts`).
- Vi também, fora dos meus caminhos: `modules/vendedor/web/lib/queries.ts` com `LIVE_REFETCH_MS` = 10 s em 3 consultas (dono modulo-vendedor, travado pela nuvem). Os `refetchInterval` de 300_000 em `modules/core/web` já seguem a RN-CORE-23.

## Testes
- packages/ui: lint, typecheck (web e mobile) e testes verdes, 58 testes (10 em atualizacao.test).
- apps/mobile: lint verde e 113 testes verdes. O typecheck falha só em `src/services/segundo-plano.ts`, porque `expo-background-task` e `expo-task-manager` não estão no node_modules. Isso já vinha de antes, depende do lockfile que o engenheiro-software está regenerando e não tem relação com esta mudança.
- apps/web: lint verde, 19 testes verdes, tsc --noEmit verde.
- `verificar engenheiro-apps` sem violação. Não rodei pnpm install nem build EAS. Não rodei o bundle: mudaram só o valor de uma constante e comentários.
- Aviso: o `pnpm --filter @macuxi/ui ...` disparou sozinho uma instalação do pnpm v12 às 12:51 ("Packages: -169"). Avisei o engenheiro-software no R-20261102-125428.

## Pendências
- modulo-vendedor e modulo-gestor: quem lê o parâmetro deve trocar `gestor_atualizacao_auto_min` por `PARAMETRO_ATUALIZACAO_AUTO` (agora `atualizacao_auto_min`). O R-20261102-123955 já pede isso aos dois.
- engenheiro-software: incluir `atualizacao_auto_min` em ParametrosTenant (T-0065, item 1). Sem esse campo, o hook usa 5 min.
- A página Auditoria do BKO ainda não tem botão "Atualizar". Fica para a próxima vaga, se o gerente quiser.
- O R-20261102-124628 (botão Sincronizar, `sync_auto_min`, push silencioso, retirada dos timers curtos) não entrou nesta vaga. Preciso de tarefa e ordem do gerente.
