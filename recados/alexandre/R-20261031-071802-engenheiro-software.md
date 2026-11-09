---
id: R-20261031-071802-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0005
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T07:18:02-04:00
---
# Casos de teste esperados (entrada → saída) do scripts/coord.mjs verificar

## Contexto
T-0005, seção "Decisões do Alexandre (2026-10-31)": (a) `--base <ref>` com o merge-base do `main`; (b) exceções universais iguais às do guardião (recado novo, diário e lidos do agente); (c) sem `--base`, só os arquivos do agente, os demais listados como "outros donos"; (d) agente do PR inferido do branch ou do trailer `Agente:`. Abaixo os casos de teste esperados (entrada → saída) para o `scripts/coord.mjs verificar`, com o `.coord/donos.json` atual. Convenções: "OK" = sai com código 0; "VIOLAÇÃO" = código 3, uma linha `<arquivo> → dono: <dono>` (ou o motivo) por arquivo; "ERRO" = código 2 com mensagem de uso. Sugiro uma função pura `classificar({ agente, arquivos: [{ caminho, status: 'A'|'M'|'D'|'R', de? }], regras, comBase })` em `coord-lib.mjs`, testada com estes casos, e o comando só lendo o git.

## O que preciso
### A. Sem `--base` (working copy: `git diff --name-status HEAD` + não rastreados)
A1. `verificar engenheiro-software`, alterado só `packages/ui/src/mobile/puro.ts` (A) → OK "1 arquivo(s) do engenheiro-software, nenhuma violação".
A2. Mesmo agente; alterados `packages/platform-sdk/src/ambiente.ts` (A) e `modules/core/app/lib/cargas.ts` (M, de outro agente trabalhando em paralelo) → OK; seção à parte "Outros donos (não conferidos): modules/core/app/lib/cargas.ts → modulo-core". Código 0.
A3. Exceções universais: `.coord/recados/modulo-core/R-20261031-070000-engenheiro-software.md` (não rastreado, novo), `.coord/diario/engenheiro-software.md` (M), `.coord/lidos/engenheiro-software.txt` (A) → OK, contam como do agente.
A4. `.coord/diario/modulo-core.md` (M) e `.coord/lidos/modulo-core.txt` (M) com agente engenheiro-software → OK; listados em "Outros donos" (dono = modulo-core, não gerente-projetos).
A5. Recado novo com o nome de OUTRO remetente (`.coord/recados/todos/R-...-modulo-core.md`, A) → "Outros donos" (é do modulo-core).
A6. Recado já rastreado e MODIFICADO com o nome do próprio agente (`.coord/recados/gerente-projetos/R-20261031-004609-engenheiro-software.md`, M) → VIOLAÇÃO "recados são imutáveis". Idem status D (apagado).
A7. Recado novo do agente em destino inválido (`.coord/recados/fulano/R-...-engenheiro-software.md`, A) → VIOLAÇÃO "destino de recado inválido: fulano".
A8. Agente altera arquivo de dono `alexandre` (`.coord/donos.json` ou `scripts/coord.mjs`, M) → isto é do agente? Não: vai para "Outros donos" sem `--base` (não há como saber quem alterou); com `--base` vira VIOLAÇÃO (caso B4).
A9. `verificar` sem agente e sem `--base` → comportamento atual (lista agrupada por dono, recados/diários/lidos agrupados por remetente/agente, não "gerente-projetos"); código 0.
A10. Caminhos com parênteses, espaços e acentos (`apps/mobile/src/app/(tabs)/index.tsx`, `docs/decisões/x.md`) → casam com as regras como texto literal; o git deve ser lido com `-c core.quotePath=false` (sem aspas nem `\303\265`).
A11. Agente inexistente (`verificar fulano`) → ERRO "agente desconhecido: fulano" (código 2).

### B. Com `--base <ref>` (diff de `git merge-base <ref> HEAD` até a árvore de trabalho, + não rastreados)
B1. Branch `modulo-core/T-0003`, `verificar --base main`; diff = `modules/core/domain/carteira.ts` (A), `.coord/diario/modulo-core.md` (M), `.coord/recados/gerente-projetos/R-...-modulo-core.md` (A) → agente inferido do branch = modulo-core; OK.
B2. Mesmo branch, diff inclui também `packages/ui/src/web/ui.tsx` (M) → VIOLAÇÃO `packages/ui/src/web/ui.tsx → dono: engenheiro-software`. Com `--base` não existe "outros donos": todo arquivo do diff é do agente do PR.
B3. O `main` andou depois da criação do branch (ex.: `CLAUDE.md` mudou no `main`) e o PR não toca nele → `CLAUDE.md` não aparece (é o merge-base, não o `main` atual).
B4. Diff com `.coord/donos.json` (M) → VIOLAÇÃO `→ dono: alexandre`. Diário de outro agente (`.coord/diario/modulo-vendedor.md`, M) → VIOLAÇÃO "o diário/lidos de modulo-vendedor pertence a modulo-vendedor". Recado novo com nome de outro remetente → VIOLAÇÃO "o nome do recado precisa conter o remetente".
B5. Recado do próprio agente com status M ou D desde o merge-base → VIOLAÇÃO "recados são imutáveis" (status A é o único aceito em `.coord/recados/`).
B6. Arquivo fora dos caminhos APAGADO (D) → VIOLAÇÃO (apagar também é alterar). Renomeado (R `de → para`) → os DOIS caminhos são conferidos.
B7. Agente explícito vence a inferência: `verificar modulo-vendedor --base main` no branch `modulo-core/T-0003` → confere como modulo-vendedor.
B8. Branch sem padrão (`main`, HEAD destacado do CI) e commits desde o merge-base com trailer `Agente: modulo-vendedor` (todos iguais) → agente = modulo-vendedor.
B9. Trailers diferentes nos commits (`Agente: modulo-core` e `Agente: modulo-vendedor`) → confere cada arquivo contra o agente do commit que o alterou; arquivo alterado pelos dois é conferido para os dois. (Se preferir mais simples: ERRO "agente ambíguo: modulo-core, modulo-vendedor" — diga qual.)
B10. Sem agente explícito, sem padrão de branch e sem trailer → ERRO "informe o agente ou use branch <agente>/T-nnnn" (código 2).
B11. `--base` com ref inexistente → ERRO "ref não encontrada: xyz" (código 2). Diff vazio → OK "nenhum arquivo alterado".
B12. Branch do Alexandre (`alexandre/T-0005-verificar`) → agente = alexandre; `scripts/coord.mjs` e `.coord/donos.json` são dele → OK.

### Pergunta (uma)
A decisão diz "branch `agente/T-nnnn`". Assumi que `agente` é o NOME do agente (`modulo-core/T-0003`, como o seu `alexandre/T-0005-verificar`), com sufixo opcional após o número. Se a intenção é o prefixo literal `agente/`, a inferência só pode vir do trailer `Agente:` — confirme qual.

## Pronto quando
`verificar` passa nos casos A1–A11 e B1–B12 (B9 numa das duas variantes, à sua escolha) e o CI da T-0005 roda `node scripts/coord.mjs verificar --base origin/main` no PR. Eu ligo o passo em `.github/workflows` quando o script estiver no `main`.
