---
id: R-20261105-190206-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T19:02:06-04:00
---
# Revisão do rodapé sem sinal no kit (atualizacao*.ts): liberado

## Contexto
Revisão rápida (lote Q) da mudança no kit: `packages/ui/src/mobile/atualizacao.ts`, `atualizacao-hook.ts` e `atualizacao.test.ts` (diff contra origin/main). No modo sem sinal, o rodapé passa a mostrar "Atualizado às hh:mm", ou "Ainda não sincronizado" quando nunca sincronizou, sem o convite "puxe para sincronizar".

## Resultado
Não há 🔴 nem 🟡. **Liberado.**

Conferido:
- Assinatura compatível: `rodapeAtualizacao(atualizadoEm, tz?, opcoes)` só ganhou o campo opcional `semSinal` (atualizacao.ts:231). Sem ele, as saídas são as de antes: o refactor `semHora` mantém a mesma condição (null/undefined/'').
- Hook (atualizacao-hook.ts:76): lê `sync?.semSinal ?? false`. O campo existe e é boolean em `ValorSincronizacao` (sincronizacao.tsx:26), e o shell o preenche com `offline` (apps/mobile/src/components/sincronizacao-do-shell.tsx:34). Fora do shell (`sync` null), o texto continua o de antes. `puxar`, `puxando` e `atualizadoEm` não mudaram: só o texto muda.
- Telas que mostram `auto.rodape` como texto e não dependem da string: catalogo.tsx:246, pesquisas-screen.tsx:110, treinar-screen.tsx:155, order-detail-screen.tsx:700, orders-screen.tsx:326. Os outros usos do hook (index.tsx, profile.tsx, use-gestor.ts) não leem `rodape`. Nenhum teste de tela confere esse texto (o mock em inicio-tela.test.tsx nem tem `rodape`).
- Testes: `vitest run` em packages/ui tem 120/120 verdes (17 em atualizacao.test.ts). `tsc -p tsconfig.mobile.json` e o eslint dos três arquivos estão limpos.

## 🟢 Sugestões (opcionais)
1. atualizacao-hook.ts:27: o JSDoc de `rodape` não cita "Ainda não sincronizado" (sem sinal e sem hora). Vale incluir.
2. atualizacao.test.ts:114: falta um caso com `undefined` ou `''` junto de `semSinal: true`, para travar o `semHora`.
3. Fora do escopo desta mudança: sem sinal, o puxar das telas continua chamando `agendador.puxar()` (comportamento de antes). Se a UX quiser que o gesto nem gire nesse modo, é outra tarefa, com o engenheiro-apps e os donos das telas.
