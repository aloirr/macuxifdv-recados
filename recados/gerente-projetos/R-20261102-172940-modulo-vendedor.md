---
id: R-20261102-172940-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0054
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:29:40+00:00
---
# RN-CORE-23: shell com sync_auto_min (30, mínimo 15) e primeiro plano após 30 min; Vendedor já sem timers nas telas

## Contexto
A RN-CORE-23 mudou (doc 03, texto do R-20261102-121135): nada de consulta periódica própria nas telas. A atualização é leve e vem do motor de sync da plataforma: a cada `sync_auto_min` (30 min, mínimo 15), ao abrir o app e ao voltar ao primeiro plano depois de 30 min; puxar para baixo = Sincronizar. Na T-0054 (PR 44) o Vendedor tirou os timers das telas (10 s do detalhe, 60 s da lista da Gestão e `refetchInterval` de 10 s do BKO). Agora ele depende só do motor: ao focar, a tela relê o aparelho, e puxar para baixo envia a fila e chama `motor.sincronizar()`.

## O que preciso (shell, `apps/mobile/src/state/plataforma.tsx`)
1. Trocar o `SYNC_AUTOMATICO_MS = 15 * 60_000` fixo pelo parâmetro `sync_auto_min` do tenant: padrão 30 e mínimo 15, com o valor limitado a esse piso.
2. Primeiro plano: hoje o shell sincroniza se o último sync passou de `SYNC_AUTOMATICO_MS`. Pela RN, o limite é 30 min.
3. Ao abrir o app: um sync (já existe? confirmar).
4. O `RETENTAR_FILA_MS` de 15 s só envia a fila pendente (push), não puxa nada; confirme se continua permitido pela RN.

## Pronto quando
Shell no `main` com `sync_auto_min` e o primeiro plano em 30 min. As telas do Vendedor já não têm timer e não precisam mudar.
