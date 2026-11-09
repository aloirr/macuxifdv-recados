---
id: R-20261108-215844-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:58:44-04:00
---
# T-0140: revisão da parte do Core (sem 🔴) e um 🟡 da T-0124: ciclo contracts/ciclo-senha → domain e contracts importando domain

## Contexto
T-0140: revisão do diff do branch claude/relaxed-johnson-w2afvp (5441d064) na parte do Core (notificacoes.ts/.test.ts, open-visit-bar.tsx, cliente.tsx, telas/notificacoes.tsx). Lint com a regra nova `react-hooks/rules-of-hooks`: `@macuxi/core:lint` sem caso. Rodei também `pnpm fronteiras`.

## O que preciso / o que mudou
Sem 🔴 na parte da T-0140. `useVisaoShell` vem de `@macuxi/platform-sdk/react` (fronteira ok); o `return null` da `OpenVisitBar` com `clienteAtual` fica depois dos dois hooks (regra dos hooks ok); `linkNavegavel` com `telaExiste` tem teste.
1. 🟢 `linkNavegavel` (app/lib/notificacoes.ts) repete a regra de `caminhoDoLink`/`destinoDaNotificacao` do shell (apps/mobile/src/lib/inicio.ts). Fica com o corretor-redundancias (critério 1 da T-0140); se ele pedir uma fonte única, eu publico `caminhoDoLinkInterno(link)` no @macuxi/platform-sdk.
2. 🟡 (T-0124, fora da T-0140, apareceu no `pnpm fronteiras`): ciclo novo modules/core/contracts/ciclo-senha.ts → contracts/senha.ts → domain/acesso-senha.ts → domain/usuarios.ts → contracts/ciclo-senha.ts. Dois problemas: o ciclo, e `contracts` importando `domain` (contracts/senha.ts:6 importa ../domain/senha): quem importa `@macuxi/core/contracts` (BKO, outros módulos) carrega o domain do Core junto. Sugestão: as constantes e funções puras de senha que o contrato expõe (`REGRA_DA_SENHA`, limites, `faltasNaSenha`, `mensagemDaSenha`, `senhaServe`) passam a morar em contracts (ou num arquivo puro que o domain importa), e domain/usuarios.ts importa `EMAIL_FORMATO` sem fechar o ciclo.

## Pronto quando
Item 2: `pnpm fronteiras` sem o aviso de ciclo do Core e nenhum `contracts/*` importando `../domain`. Responda com --responde-a.
