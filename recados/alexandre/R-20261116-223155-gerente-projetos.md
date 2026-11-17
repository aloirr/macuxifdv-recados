---
id: R-20261116-223155-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261116-215000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-16T22:31:55-04:00
---
# Ordem de retomada da v1.0.14 confirmada; item 1 feito (#483 almoço e #484 pareceres); #478 a #482 seguram por achados do corretor

A sessão do Cline (notebook do dono do produto) confirma a ordem de retomada do R-20261116-215000-alexandre e já começou. Todos os horários são de Manaus.

## Item 1: feito (16/11, 22h31)
| PR | Dono | Branch | Head | O que é |
|---|---|---|---|---|
| #483 | modulo-core | `agente/v1014-almoco-modulo-core` | 7e9c43ddc16a4fa6ee4b6b15991ba9c1f66dfa63 | D-PAR-05, "Salvar almoço" (refeito a partir de 853c8af8) |
| #484 | corretor-redundancias | `agente/v1014-pareceres-corretor-redundancias` | 8b4a0a06df99ccf0f310ccda3ab97b2741f4c7c6 | pareceres das rodadas 50 a 61 (conteúdo idêntico ao de a99a9ade) |

- Os dois saíram num commit, num push, com o trailer do dono, a partir do main fa2de750. O `coord.mjs verificar --base origin/main` deu OK.
- No #483 rodaram na sessão: o lint e o typecheck do `@macuxi/core`, e os testes do `@macuxi/core` (2460 verdes, 0 falhos, 362 pulados por falta de banco), fronteiras e grafo do turbo.
- O CI dos dois estava em andamento às 22h31. A governança do #483 já estava verde.
- O #483 muda texto de tela e precisa do parecer do corretor sobre 7e9c43dd antes do merge. Esse parecer entra num PR seguinte do corretor.

## O que a auditoria mudou na ordem
- **Item 2 (merge dos prontos da lista A):** só o **#403** está liberado para merge no head de hoje: SEM ACHADO em b246ed19, CI verde e main verde.
  - **#478 a #482 (testes):** os pareceres do #484 são **COM ACHADO**, e os achados seguram (RD-2170/2171, RD-2172 a 2176, RD-2190 a 2196, RD-2197 a 2202 menos a 2201, RD-2210 a 2219). Antes do merge, o `testes` corrige em cada PR e o corretor reconfere sobre o head novo.
  - **#345 (backlog, gerente):** 72 commits atrás e sem parecer. Vou conferir antes de pedir a frase.
- Os itens 3 a 8 seguem a ordem do recado: #420, #396, #412 e #414 a #416 com o PR de testes dos Parâmetros, #453 com o de testes do catálogo, fechamento da v1.0.14 e os antigos.
- `nuvem/planos-0084-testes`: já está no main e será descartado. Nada a fazer.

## Como a sessão trabalha (até sexta ou até a nuvem voltar)
- Um item por vez, no papel do dono (`.claude/agents/<dono>.md`), num branch `agente/<item>-<dono>` a partir do main, com o trailer `Agente: <dono>`. O CI aceita esse branch pelo trailer.
- Lint, typecheck e testes afetados rodam na sessão. Os `*.db.test.ts` ficam pulados: o notebook não tem Postgres e o `pg-local.sh` é só para Linux. Cada PR diz isso.
- Um push por PR, sem force push. PR pela API do GitHub. Recados pelo clone `macuxifdv-recados`, sem o `coord.mjs`.
- **Merge** só com o CI verde no head e a frase literal do dono do produto: "autorizo o merge do PR #N no commit <sha>".

## O que preciso do dono do produto
- A frase do **#403**, se quiser o merge agora: "autorizo o merge do PR #403 no commit b246ed192f750abaa7213d181fd4ae1f029d332d".
- As frases do #483 e do #484 vêm depois do CI verde (e, no #483, depois do parecer).
