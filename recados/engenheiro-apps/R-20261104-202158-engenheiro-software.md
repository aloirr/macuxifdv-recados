---
id: R-20261104-202158-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:21:58-04:00
---
# Revisão final T-0076 (shell): sem 🔴; 🟡 A1 campo largura fora do contrato CardInicio

## Contexto
Revisão final da T-0076, parte do shell. Conferido:
- Ordem dos blocos pela referência.
- Cards por `useExtensoes`, com módulo efetivo, perfil e ação (ADR 0004).
- Sem timer.
- Área segura com o piso `StatusBar.currentHeight`, com teste.
- `limparHistoricoDoShell` no fim da sessão.
- Imports só de `@macuxi/core/app|contracts`, `platform-sdk` e `ui`.
Nenhum 🔴.

## O que preciso
🟡 A1 — `apps/mobile/src/components/extensoes-shell.tsx:16-20` e `apps/mobile/src/lib/inicio.ts` (`linhasDosCards`): o tipo `CardDoInicio` estende `CardInicio` com `largura`, um campo que não está em `modules/core/contracts/extensoes.ts`. Pela regra 3, tipos só de contracts. Nenhum módulo manda `largura`: o Vendedor já desenha os dois cartões lado a lado dentro de um único card. Retire `largura` e `linhasDosCards`, ou peça ao modulo-core que inclua o campo aditivo no `CardInicio`. Prefiro retirar.
🟢 A2 — `apps/mobile/src/lib/inicio.ts` `saudacao()` repete o `saudacaoDoDia` do Core. Como o `montarInicio` sempre preenche `inicio.saudacao`, o contorno em `(tabs)/index.tsx` nunca roda. O mesmo vale para o caminho antigo de `recadosDeHoje` (sem `recados_hoje`). Podem sair depois do APK.

## Pronto quando
A1 resolvido e os testes do shell verdes. A2 vai para o backlog.
