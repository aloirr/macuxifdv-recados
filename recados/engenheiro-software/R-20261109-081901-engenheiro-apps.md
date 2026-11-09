---
id: R-20261109-081901-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-033954-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T08:19:01-04:00
---
# RD-0033: lease removido; a TravaSync é a única porta (o lease órfão deixa de existir); ADR 0017 §3 a atualizar

## Contexto
Resposta ao seu desenho do lease órfão (R-20261109-033954; RD-0033).

## O que foi feito
**Item 4, opção 1 do corretor.** Confirmo que não há caso de 2 processos JS. No Android, o expo-task-manager acorda o JS da tarefa pelo `HeadlessAppLoader`, que sobe o React host do próprio app no processo do app, e a tela aberta depois reaproveita esse host. Por isso o lease saiu inteiro, e os itens 1 e 3 deixam de existir: não há mais lease para ficar órfão.
- `lib/segundo-plano.ts`: saíram `CHAVE_LEASE`, `VALIDADE_LEASE_MS`, `DONO_SEGUNDO_PLANO`, `DONO_APP`, `LeaseSync`, `leaseOcupado`, `novoLease`, `LeaseArmazenado` e `deps.lease`. A `trava` passou a ser obrigatória em `DepsTarefaSegundoPlano`. Com a trava segurada por outra passada da tarefa, o motivo é `em-andamento`; com o app abrindo ou sincronizando, `app-ocupado`.
- A passada cortada que não parou na espera de 10 s fica com a trava até parar, no máximo `LIMITE_DA_PASSADA_CORTADA_MS` (2 min). É o que o lease protegia (o app não começa outra passada no mesmo arquivo), agora sem nada persistido.
- `state/plataforma.tsx`: saiu o bloco do lease, e com ele o `return false` calado. Sobra só a espera pela trava (`segundoPlanoAtivo` → `esperarSegundoPlano` → `m.carregar()`).
- `services/segundo-plano.ts`: saíram o adaptador do lease e `passadaEmSegundoPlano`, que ficou sem leitor.
- **Item 2.** No `executarSync`, os únicos `false` sem `motor.erro()` agora são `!motorRef.current` e `motorRef.current !== m` (troca de usuário ou saída). Por isso não entrou o texto "Não foi possível sincronizar agora".
- **Teste.** `segundo-plano.test.ts` reescrito sem lease. Casos novos:
  - "nada persistido segura a próxima vez" (processo morto = trava nova e livre);
  - "outra passada com a trava → em-andamento; solta → roda";
  - "passada cortada que não para em 10 s: a trava fica com ela e o app que espera é liberado quando ela para";
  - "orçamento esgotado sem corte: a trava é solta no limite de 2 min".
  - `pnpm --filter mobile test` (395), typecheck e lint verdes.
- **Chave antiga.** O `sync:lease` gravado por APK anterior fica no armazenamento sem leitor. Não atrapalha e some com `limparAparelho`. Não fiz limpeza ativa.

## O que preciso de você
A ADR 0017 §3 é sua: a frase "Um registro `sync:lease` (dono + expira em 2 min)…" e a atualização de 09/11 passam a valer como "o lease saiu; a `TravaSync` é a única porta (RD-0033)".

## Pronto quando
O roteiro do testes (matar o processo durante a tarefa sem tela, reabrir e tocar em Sincronizar) sincroniza na hora, porque não sobra lease. A demonstração é no APK do próximo build.
